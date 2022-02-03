import * as React from 'react'
import { Table, Button, Card, Input, Select } from 'antd'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

import {
  SearchOutlined,
} from '@ant-design/icons';

import './index.css'

const { Option } = Select;

const url = `https://api.coinpaprika.com/v1/coins/`

const PaprikaPage = () => {
  const [dataPaprika, setDatapaprika] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  const [searchText, setSearchText] = React.useState('')
  const [filterPaprika, setFilterPaprika] = React.useState('')

  React.useEffect(() => {
    fetchPaprika()
  }, [])

  const fetchPaprika = async () => {
    setLoading(true)
    try {
      const request = await axios.get(url)
      const response = await request.data
      setDatapaprika(response)
      // console.log(response)
      return response
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  const handleSearchChange = (e) => {
    const { value } = e.target
    setSearchText(value)
  }

  const handleSearch = () => {
    if (searchText && filterPaprika) {
      const filteredData = dataPaprika.filter((item) => {
        if (filterPaprika === 'id') {
          const id = item.id?.toLowerCase()
          return id.includes(searchText)
        }

        const name = item.name?.toLowerCase()
        return name.includes(searchText)
      });
      setDatapaprika(filteredData)
    } else {
      fetchPaprika()
    }
  };

  const onChangeFilterPaprika = (value) => {
    setFilterPaprika(value)
  }

  const onDeletePaprika = (id) => {
    setDatapaprika((state) => state.filter((item) => item.id !== id))
  }

  const columns = [
    {
      title: 'ID',
      //   dataIndex: 'id',
      render: (props) => {
        return <NavLink to={`/${props.id}`}>{props.id}</NavLink>
      },
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Symbol',
      dataIndex: 'symbol',
      key: 'symbol',
    },

    {
      title: 'Rank',
      dataIndex: 'rank',
      key: 'rank',
    },

    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },

    {
      title: 'Active',
      render: (props) => {
        return <p>{props.is_active ? 'True' : 'False'}</p>
      },
      key: 'is_active',
    },
    {
      title: 'Action',
      align: 'center',
      render: (props) => {
        return (
          <Button type="primary" danger style={{ width: '100%' }} onClick={() => onDeletePaprika(props.id)}>
            Delete
          </Button>
        )
      },
    },
  ]

  return (
    <div style={{ width: '100%', height: '100vh', backgroundColor: '#F3F7FB' }} >
      <div style={{ width: '75%', height: 'fit-content', minHeight: '100vh', margin: 'auto' }}>
        <Card title="Coin List" style={{ borderWidth: '2px', margin: '10px' }} >
          <div style={{ display: 'flex', width: '50%', margin: '0.5rem' }} >
            <Select
              showSearch
              style={{ width: '40%' }}
              placeholder="Select"
              onChange={onChangeFilterPaprika}
            >
              <Option value="id">ID</Option>
              <Option value="name">Name</Option>
            </Select>
            <Input addonBefore={<SearchOutlined />} style={{ marginLeft: '1em' }} placeholder='Search by Name' value={searchText} onChange={handleSearchChange} />
            <Button type="primary" style={{ marginLeft: '1em' }} onClick={handleSearch} >Search</Button>
          </div>
          <Table className='ant-card-body' columns={columns} loading={loading} dataSource={dataPaprika} style={{ width: '100%' }} />
        </Card>
      </div>
      <footer style={{ width: '100%' }}>
        <div style={{ textAlign: 'center', padding: '10px', color: 'white', backgroundColor: '#1D4279' }} >
          Kandidat: Muhamad Ivan Mulya
        </div>
      </footer>
    </div>
  )
}

export default PaprikaPage
