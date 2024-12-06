import { RouterProvider } from "react-router-dom"
import { AuthProvider } from "./contextproviders/AuthContext"
import { CartProvider } from "./contextproviders/CartContext"
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