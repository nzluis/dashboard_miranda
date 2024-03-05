import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import Root from "./pages/Root"
import Login from "./pages/Login"
import Rooms from "./pages/Rooms"
import Dashboard from "./pages/Dashboard"
import Bookings from "./pages/Bookings"
import Users from "./pages/Users"
import Contact from "./pages/Contact"
import ProtectedRoute from "./components/ProtectedRoute"
import { createContext, useState } from "react"

export const AuthContext = createContext()

const appRouter = createBrowserRouter(createRoutesFromElements(
  <Route element={<Root />}>
    <Route path='/login' element={<Login />} />
    <Route path='/' element={<ProtectedRoute />}>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="rooms" element={<Rooms />} />
      <Route path="rooms/:id" />
      <Route path="bookings" element={<Bookings />} />
      <Route path="bookings/id" />
      <Route path="users" element={<Users />} />
      <Route path="users/id" />
      <Route path="contact" element={<Contact />} />
    </Route>
    <Route path="/*" element={<Navigate to='/' />}></Route>
  </Route>
))

export default function App() {
  const [auth, setAuth] = useState()
  const value = { auth, setAuth }


  return (
    <>
      <AuthContext.Provider value={value}>
        <RouterProvider router={appRouter} />
      </AuthContext.Provider>
    </>
  )
}