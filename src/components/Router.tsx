import { Routes, Route } from "react-router-dom"

import { Home } from "../pages/Home/Home"

import { DefaultLayout } from "../layouts/DefaultLayout"
import { History } from "../pages/History/History"




export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout/>}>
        <Route  path="/" element={<Home/>} />
        <Route  path="/history" element={<History/>} />
      </Route>
    </Routes>
  )
}
