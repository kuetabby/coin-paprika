import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import HomePage from './Home'

const PaprikaPage = lazy(() => import('./Paprika'))
const SelectPaprikaPage = lazy(() => import('./Paprika/SelectPaprika'))

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route element={<Layout />}> */}
        <Route
          path="/"
          element={
            <Suspense fallback={<>...</>}>
              <PaprikaPage />
            </Suspense>
          }
        />
        <Route
          path="/:id"
          element={
            <Suspense fallback={<>...</>}>
              <SelectPaprikaPage />
            </Suspense>
          }
        />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
  )
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  )
}

export default App

