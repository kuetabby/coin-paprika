import * as React from 'react'
import { Card, Row, Col } from 'antd'
import axios from 'axios'
import { useParams } from 'react-router-dom';

import './SelectPaprika.css'

const url = `https://api.coinpaprika.com/v1/coins`

const SelectPaprikaPage = () => {
    const { id } = useParams()

    const [loading, setLoading] = React.useState(false)
    const [dataPaprika, setDataPaprika] = React.useState({})

    React.useEffect(() => {
        getPaprika(id)
    }, [id])

    const getPaprika = async (idCoin) => {
        setLoading(true)
        try {
            const request = await axios.get(`${url}/${idCoin}`)
            const response = await request.data
            // console.log(response)
            setDataPaprika(response)
            return response
        } catch (error) {
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{ width: '100%', height: '100%', backgroundColor: '#F3F7FB' }} >
            <header style={{ width: '75%', margin: 'auto', padding: '1rem', color: '#a6a6a6', fontWeight: 500 }} >
                <div>Coin Detail</div>
            </header>
            <div style={{ width: '100%', height: '100vh', padding: '5px' }}>
                <Card title="Coin Detail" loading={loading} className='card-wrapper'>
                    <Row gutter={16}>
                        <ListItem title="ID" value={dataPaprika?.id} defaultValue="ID" />
                        <ListItem title="Name" value={dataPaprika?.name} defaultValue="Name" />
                        <ListItem title="Symbol" value={dataPaprika?.symbol} defaultValue="Symbol" />
                        <ListItem title="Type" value={dataPaprika?.type} defaultValue="Type" />
                        <ListItem title="Active" value={dataPaprika?.is_active ? "True" : "False"} defaultValue="Active" />
                        <ListItem title="Is New ?" value={dataPaprika?.is_new ? "True" : "False"} defaultValue="Is New ?" />
                    </Row>
                </Card>
            </div>
            <footer style={{ width: '100%', height: '100%', }}>
                <div style={{ textAlign: 'center', padding: '10px', color: 'white', backgroundColor: '#1D4279' }} >
                    Kandidat: Muhamad Ivan Mulya
                </div>
            </footer>
        </div>
    );
}

const ListItem = ({ title, value, defaultValue }) => {
    return (
        <Col span={24} style={{ marginTop: '1rem' }} >
            <div className='list-wrapper'>
                <div style={{ fontWeight: 500, color: '#a6a6a6' }} >
                    {title}
                </div>
                <div style={{ width: '50%', textAlign: 'left', fontWeight: 700 }} >
                    {value || defaultValue}
                </div>
            </div>
        </Col>
    )
}

export default SelectPaprikaPage;
