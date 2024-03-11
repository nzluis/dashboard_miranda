import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import Root from "./pages/RootPage"
import Login from "./pages/LoginPage"
import Rooms from "./pages/RoomsPage"
import Dashboard from "./pages/DashboardPage"
import Bookings from "./pages/BookingsPage"
import Users from "./pages/UsersPage"
import Contact from "./pages/ContactPage"
import ProtectedRoute from "./components/ProtectedRoute"
import RoomDetail from "./pages/RoomDetailPage"
import BookingDetail from "./pages/BookingDetailPage"
import UserDetail from "./pages/UserDetailPage"
import NewBookingPage from "./pages/NewBookingPage"
import NewRoomPage from "./pages/NewRoomPage"
import NewUserPage from "./pages/NewUserPage"
import { AuthProvider } from "./context/AuthContext"


const appRouter = createBrowserRouter(createRoutesFromElements(
  <Route element={<Root />}>
    <Route path='/login' element={<Login />} />
    <Route element={<ProtectedRoute />}>
      <Route path='/' element={<Dashboard />} />
      <Route path="rooms" element={<Rooms />} />
      <Route path="rooms/:id" element={<RoomDetail />} />
      <Route path="rooms/new-room" element={<NewRoomPage />} />
      <Route path="bookings" element={<Bookings />} />
      <Route path="bookings/:id" element={<BookingDetail />} />
      <Route path="bookings/new-booking" element={<NewBookingPage />} />
      <Route path="users" element={<Users />} />
      <Route path="users/:id" element={<UserDetail />} />
      <Route path="users/new-user" element={<NewUserPage />} />
      <Route path="contact" element={<Contact />} />
    </Route>
    <Route path="/*" element={<Navigate to='/' />}></Route>
  </Route>
))

export default function App() {


  return (
    <>
      <AuthProvider>
        <RouterProvider router={appRouter} />
      </AuthProvider>
    </>
  )
}