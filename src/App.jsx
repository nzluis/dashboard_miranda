import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import Root from "./pages/Root"
import Login from "./pages/Login"
import Rooms from "./pages/Rooms"
import Dashboard from "./pages/Dashboard"
import Bookings from "./pages/Bookings"
import Users from "./pages/Users"
import Contact from "./pages/Contact"
import ProtectedRoute from "./components/ProtectedRoute"
import { createContext } from "react"
import RoomDetail from "./pages/RoomDetail"
import BookingDetail from "./pages/BookingDetail"
import UserDetail from "./pages/UserDetail"
import { useLocalStorage } from "../hooks/useLocalStorage"

export const AuthContext = createContext()

const appRouter = createBrowserRouter(createRoutesFromElements(
  <Route element={<Root />}>
    <Route path='/login' element={<Login />} />
    <Route path='/' element={<ProtectedRoute />}>
      <Route path='/' element={<Dashboard />} />
      <Route path="rooms" element={<Rooms />} />
      <Route path="rooms/:id" element={<RoomDetail />} />
      <Route path="bookings" element={<Bookings />} />
      <Route path="bookings/:id" element={<BookingDetail />} />
      <Route path="users" element={<Users />} />
      <Route path="users/:id" element={<UserDetail />} />
      <Route path="contact" element={<Contact />} />
    </Route>
    <Route path="/*" element={<Navigate to='/' />}></Route>
  </Route>
))

export default function App() {
  const [auth, setAuth] = useLocalStorage('AUTH_KEY', '0')
  const value = { auth, setAuth }

  return (
    <>
      <AuthContext.Provider value={value}>
        <RouterProvider router={appRouter} />
      </AuthContext.Provider>
    </>
  )
}