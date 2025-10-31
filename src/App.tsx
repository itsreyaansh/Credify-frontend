import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Box } from '@chakra-ui/react'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import LandingPage from './pages/public/LandingPage'

export default function App() {
  return (
    <Router>
      <Box minH="100vh" display="flex" flexDirection="column">
        <Header />
        <Box flex={1}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            {/* Add more routes here */}
          </Routes>
        </Box>
        <Footer />
      </Box>
    </Router>
  )
}
