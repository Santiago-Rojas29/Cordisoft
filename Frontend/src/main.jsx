import { Buffer } from 'buffer';
window.Buffer = window.Buffer || Buffer;

import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './auth/authContext.jsx'
import { Toaster } from 'sonner'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './styles/global.css'

createRoot(document.getElementById('root')).render(
  <>
    <Toaster richColors position='top-right'/>
    <AuthProvider>
      <App />
    </AuthProvider>
  </>
)
