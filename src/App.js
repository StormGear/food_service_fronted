import { RouterProvider } from "react-router-dom"
import { AuthProvider } from "./contextproviders/AuthContext"
import { router } from "./index"

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  )
}