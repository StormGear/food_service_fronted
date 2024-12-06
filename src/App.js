import { RouterProvider } from "react-router-dom"
import { AuthProvider } from "./contextproviders/Authcontext"
import { CartProvider } from "./contextproviders/Cartcontext"
import { router } from "./index"

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router}/>
      </CartProvider>
    </AuthProvider>
  )
}