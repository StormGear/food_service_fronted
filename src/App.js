import AuthScreens from "./Components/AuthScreens"
import { AuthProvider } from "./ContextProviders/AuthContext"

export default function App() {
  return (
    <AuthProvider>
      <AuthScreens/>
    </AuthProvider>
  )
}