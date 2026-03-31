import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Index from './pages/Index'
import Show from './pages/Show'
import New from './pages/New'
import Edit from './pages/Edit'
import Login from './pages/Login'
import Signup from './pages/Signup'
import NotFound from './pages/NotFound'
import AdminDashboard from './pages/AdminDashboard'

import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <div className="app-container">
      <Toaster position="top-right" toastOptions={{ style: { background: '#111827', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' } }} />
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/listings/:id" element={<Show />} />
          <Route path="/listings/new" element={<New />} />
          <Route path="/listings/:id/edit" element={<Edit />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
