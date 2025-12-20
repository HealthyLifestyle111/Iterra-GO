import './App.css'
import Pages from "@/pages/index.jsx"
import { Toaster } from "@/components/ui/toaster"
import FirstRunSetup from "@/components/FirstRunSetup"

function App() {
  return (
    <>
      <FirstRunSetup />
      <Pages />
      <Toaster />
    </>
  )
}

export default App 