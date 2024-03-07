import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import Root from "./pages/RootPage"
import Login from "./pages/LoginPage"
import Rooms from "./pages/RoomsPage"
import Dashboard from "./pages/DashboardPage"
import Bookings from "./pages/BookingsPage"
import Users from "./pages/UsersPage"
import Contact from "./pages/ContactPage"
import ProtectedRoute from "./components/ProtectedRoute"
import { createContext } from "react"
import RoomDetail from "./pages/RoomDetailPage"
import BookingDetail from "./pages/BookingDetailPage"
import UserDetail from "./pages/UserDetailPage"
import { useLocalStorage } from "../hooks/useLocalStorage"
import NewBookingPage from "./pages/NewBookingPage"
import NewRoomPage from "./pages/NewRoomPage"
import NewUserPage from "./pages/NewUserPage"

export const AuthContext = createContext()

const appRouter = createBrowserRouter(createRoutesFromElements(
  <Route element={<Root />}>
    <Route path='/login' element={<Login />} />
    <Route element={<ProtectedRoute />}>
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path="rooms" element={<Rooms />} />
      <Route path="rooms/:id" element={<RoomDetail />} />
      <Route path="rooms/newroom" element={<NewRoomPage />} />
      <Route path="bookings" element={<Bookings />} />
      <Route path="bookings/:id" element={<BookingDetail />} />
      <Route path="bookings/newbooking" element={<NewBookingPage />} />
      <Route path="users" element={<Users />} />
      <Route path="users/:id" element={<UserDetail />} />
      <Route path="users/newuser" element={<NewUserPage />} />
      <Route path="contact" element={<Contact />} />
    </Route>
    <Route path="/*" element={<Navigate to='/dashboard' />}></Route>
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