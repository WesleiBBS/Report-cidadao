import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Registrar Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registrado com sucesso:', registration)
      })
      .catch((registrationError) => {
        console.log('SW falhou ao registrar:', registrationError)
      })
  })
}

function AppWithLoading() {
  useEffect(() => {
    // Remover tela de loading quando o React carregar
    const timer = setTimeout(() => {
      document.body.classList.add('app-loaded')
    }, 500)
    
    // Detectar se é PWA instalado
    if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
      console.log('PWA instalado e executando em modo standalone')
      document.documentElement.classList.add('pwa-standalone')
    }
    
    // Detectar instalação via beforeinstallprompt
    let deferredPrompt = null
    
    window.addEventListener('beforeinstallprompt', (e) => {
      console.log('PWA pode ser instalado')
      e.preventDefault()
      deferredPrompt = e
      
      // Mostrar botão de instalação customizado se necessário
      // showInstallButton()
    })
    
    window.addEventListener('appinstalled', (evt) => {
      console.log('PWA foi instalado')
      deferredPrompt = null
    })
    
    return () => clearTimeout(timer)
  }, [])
  
  return <App />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWithLoading />
  </StrictMode>,
)

