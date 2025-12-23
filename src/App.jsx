import './App.css'
import Pages from "@/pages/index.jsx"
import { Toaster } from "@/components/ui/toaster"
import FirstRunSetup from "@/components/FirstRunSetup"
import ErrorBoundary from "@/components/ErrorBoundary"




function App() {
  return (
    <ErrorBoundary>
      <FirstRunSetup />
      <Pages />
      <Toaster />
    </ErrorBoundary>
  )
}

export default App 