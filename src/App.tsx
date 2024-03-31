import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import Root from "./pages/RootPage"
import Login from "./pages/LoginPage"
import Rooms from "./pages/RoomsPage"
import Dashboard from "./pages/DashboardPage"
import Bookings from "./pages/BookingsPage"
import Users from "./pages/UsersPage"
import Contact from "./pages/ContactPage"
import ProtectedRoute from "./components/ProtectedRoute"
// import RoomDetail from "./pages/RoomDetailPage"
import BookingDetail from "./pages/BookingDetailPage"
// import UserDetail from "./pages/UserDetailPage"
import FormBookingPage from "./pages/FormBookingPage"
import FormRoomPage from "./pages/FormRoomPage"
import FormUserPage from "./pages/FormUserPage"
import { AuthProvider } from "./context/AuthContext"
import { store } from "./app/store"
import { Provider } from 'react-redux'

const appRouter = createBrowserRouter(createRoutesFromElements(
  <Route element={<Root />}>
    <Route path='/login' element={<Login />} />
    <Route element={<ProtectedRoute />}>
      <Route path='/' element={<Dashboard />} />
      <Route path="rooms" element={<Rooms />} />
      {/* <Route path="rooms/:id" element={<RoomDetail />} /> */}
      <Route path="rooms/new-room" element={<FormRoomPage />} />
      <Route path="rooms/edit/:id" element={<FormRoomPage />} />
      <Route path="bookings" element={<Bookings />} />
      <Route path="bookings/:id" element={<BookingDetail />} />
      <Route path="bookings/new-booking" element={<FormBookingPage />} />
      <Route path="bookings/edit/:id" element={<FormBookingPage />} />
      <Route path="users" element={<Users />} />
      {/* <Route path="users/:id" element={<UserDetail />} /> */}
      <Route path="users/new-user" element={<FormUserPage />} />
      <Route path="users/edit/:id" element={<FormUserPage />} />
      <Route path="contact" element={<Contact />} />
      <Route path="contact/edit/:id" element={<Contact />} />
    </Route>
    <Route path="/*" element={<Navigate to='/' />}></Route>
  </Route>
))

export default function App() {
  return (
    <>
      <AuthProvider>
        <Provider store={store}>
          <RouterProvider router={appRouter} />
        </Provider>
      </AuthProvider>
    </>
  )
}