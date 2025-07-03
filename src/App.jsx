import { useState, useRef, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Camera, 
  MapPin, 
  Send, 
  History, 
  Home, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  X,
  Plus,
  Star,
  Zap
} from 'lucide-react'

// Componente principal de navegação
function Navigation() {
  const location = useLocation()
  
  return (
    <nav style={{
      background: 'rgba(0, 0, 0, 0.2)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      padding: '1rem',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
    }}>
      <div style={{
        maxWidth: '28rem',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            padding: '0.5rem',
            background: 'linear-gradient(45deg, #f97316, #ef4444)',
            borderRadius: '0.5rem'
          }}>
            <Zap style={{ height: '1.25rem', width: '1.25rem', color: 'white' }} />
          </div>
          <h1 style={{
            fontSize: '1.25rem',
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #f97316, #ef4444)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: 'transparent'
          }}>
            Reporte Estradas
          </h1>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Link 
            to="/" 
            style={{
              padding: '0.75rem',
              borderRadius: '0.75rem',
              transition: 'all 0.3s',
              textDecoration: 'none',
              ...(location.pathname === '/' 
                ? {
                    background: 'linear-gradient(45deg, #f97316, #ef4444)',
                    color: 'white',
                    boxShadow: '0 4px 14px rgba(249, 115, 22, 0.4)'
                  }
                : {
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: 'rgba(255, 255, 255, 0.8)'
                  })
            }}
            onMouseEnter={(e) => {
              if (location.pathname !== '/') {
                e.target.style.background = 'rgba(255, 255, 255, 0.2)'
                e.target.style.color = 'white'
              }
            }}
            onMouseLeave={(e) => {
              if (location.pathname !== '/') {
                e.target.style.background = 'rgba(255, 255, 255, 0.1)'
                e.target.style.color = 'rgba(255, 255, 255, 0.8)'
              }
            }}
          >
            <Home size={20} />
          </Link>
          <Link 
            to="/historico" 
            style={{
              padding: '0.75rem',
              borderRadius: '0.75rem',
              transition: 'all 0.3s',
              textDecoration: 'none',
              ...(location.pathname === '/historico' 
                ? {
                    background: 'linear-gradient(45deg, #f97316, #ef4444)',
                    color: 'white',
                    boxShadow: '0 4px 14px rgba(249, 115, 22, 0.4)'
                  }
                : {
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: 'rgba(255, 255, 255, 0.8)'
                  })
            }}
            onMouseEnter={(e) => {
              if (location.pathname !== '/historico') {
                e.target.style.background = 'rgba(255, 255, 255, 0.2)'
                e.target.style.color = 'white'
              }
            }}
            onMouseLeave={(e) => {
              if (location.pathname !== '/historico') {
                e.target.style.background = 'rgba(255, 255, 255, 0.1)'
                e.target.style.color = 'rgba(255, 255, 255, 0.8)'
              }
            }}
          >
            <History size={20} />
          </Link>
        </div>
      </div>
    </nav>
  )
}

// Componente para captura de fotos
function CameraCapture({ onPhotoCapture, photos, onRemovePhoto }) {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [isStreaming, setIsStreaming] = useState(false)
  const [error, setError] = useState('')

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } // Câmera traseira preferencial
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setIsStreaming(true)
        setError('')
      }
    } catch (err) {
      setError('Erro ao acessar a câmera. Verifique as permissões.')
      console.error('Erro ao acessar câmera:', err)
    }
  }

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks()
      tracks.forEach(track => track.stop())
      setIsStreaming(false)
    }
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current
      const video = videoRef.current
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      
      const ctx = canvas.getContext('2d')
      ctx.drawImage(video, 0, 0)
      
      canvas.toBlob((blob) => {
        const photoUrl = URL.createObjectURL(blob)
        onPhotoCapture({
          id: Date.now(),
          url: photoUrl,
          blob: blob,
          timestamp: new Date().toLocaleString()
        })
      }, 'image/jpeg', 0.8)
    }
  }

  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">Fotos do Problema</h3>
        <Badge variant="glass" className="status-indicator">{photos.length} foto(s)</Badge>
      </div>

      {error && (
        <Alert variant="glass" className="floating-animation">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {!isStreaming ? (
        <Button onClick={startCamera} variant="glass" className="w-full hover-lift">
          <Camera className="mr-2 h-4 w-4" />
          Abrir Câmera
        </Button>
      ) : (
        <div className="space-y-4">
          <div className="relative glass-card p-2">
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline
              className="w-full rounded-lg"
            />
            <canvas ref={canvasRef} className="hidden" />
          </div>
          <div className="flex space-x-2">
            <Button onClick={capturePhoto} variant="gradient" className="flex-1 pulse-glow">
              <Camera className="mr-2 h-4 w-4" />
              Capturar Foto
            </Button>
            <Button onClick={stopCamera} variant="glass">
              Fechar
            </Button>
          </div>
        </div>
      )}

      {photos.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          {photos.map((photo) => (
            <div key={photo.id} className="relative glass-card p-2 hover-lift">
              <img 
                src={photo.url} 
                alt="Foto do problema" 
                className="w-full h-32 object-cover rounded-lg"
              />
              <Button
                size="sm"
                variant="destructive"
                className="absolute top-3 right-3 h-6 w-6 p-0 rounded-full"
                onClick={() => onRemovePhoto(photo.id)}
              >
                <X className="h-3 w-3" />
              </Button>
              <div className="absolute bottom-3 left-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                {photo.timestamp}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Componente para geolocalização
function LocationCapture({ location, onLocationCapture }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const getCurrentLocation = () => {
    setLoading(true)
    setError('')

    if (!navigator.geolocation) {
      setError('Geolocalização não é suportada neste navegador.')
      setLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        onLocationCapture({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: new Date().toLocaleString()
        })
        setLoading(false)
      },
      (err) => {
        setError('Erro ao obter localização. Verifique as permissões.')
        setLoading(false)
        console.error('Erro de geolocalização:', err)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">Localização</h3>
        {location && <Badge variant="glass" className="status-indicator">Capturada</Badge>}
      </div>

      {error && (
        <Alert variant="glass" className="floating-animation">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {!location ? (
        <Button 
          onClick={getCurrentLocation} 
          disabled={loading}
          variant="glass"
          className="w-full hover-lift"
        >
          <MapPin className="mr-2 h-4 w-4" />
          {loading ? 'Obtendo localização...' : 'Capturar Localização'}
        </Button>
      ) : (
        <Card className="glass-card border-0">
          <CardContent className="pt-4 text-white">
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-white/70">Latitude:</span>
                <span className="font-mono">{location.latitude.toFixed(6)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/70">Longitude:</span>
                <span className="font-mono">{location.longitude.toFixed(6)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/70">Precisão:</span>
                <span>±{Math.round(location.accuracy)}m</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/70">Capturada em:</span>
                <span className="text-xs">{location.timestamp}</span>
              </div>
            </div>
            <Button 
              onClick={getCurrentLocation} 
              variant="glass" 
              size="sm" 
              className="mt-4 w-full hover-lift"
              disabled={loading}
            >
              {loading ? 'Atualizando...' : 'Atualizar Localização'}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

// Tela principal de reporte
function ReportScreen() {
  const [photos, setPhotos] = useState([])
  const [location, setLocation] = useState(null)
  const [formData, setFormData] = useState({
    tipo: '',
    descricao: '',
    urgencia: 'media'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handlePhotoCapture = (photo) => {
    setPhotos(prev => [...prev, photo])
  }

  const handleRemovePhoto = (photoId) => {
    setPhotos(prev => prev.filter(photo => photo.id !== photoId))
  }

  const handleLocationCapture = (loc) => {
    setLocation(loc)
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simular envio do reporte
    try {
      // Aqui seria feita a integração com a API da prefeitura
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Salvar no localStorage para histórico
      const reporte = {
        id: Date.now(),
        ...formData,
        photos: photos.length,
        location: location ? `${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)}` : 'Não informada',
        status: 'enviado',
        timestamp: new Date().toLocaleString()
      }
      
      const historico = JSON.parse(localStorage.getItem('reportes') || '[]')
      historico.unshift(reporte)
      localStorage.setItem('reportes', JSON.stringify(historico))
      
      setSubmitSuccess(true)
      
      // Limpar formulário
      setTimeout(() => {
        setPhotos([])
        setLocation(null)
        setFormData({ tipo: '', descricao: '', urgencia: 'media' })
        setSubmitSuccess(false)
      }, 3000)
      
    } catch (error) {
      console.error('Erro ao enviar reporte:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitSuccess) {
    return (
      <div className="max-w-md mx-auto p-4">
        <Card className="glass-card border-0 text-center floating-animation">
          <CardContent className="pt-8 pb-8">
            <div className="relative">
              <CheckCircle className="mx-auto h-20 w-20 text-green-400 mb-6 pulse-glow" />
              <Star className="absolute top-2 right-8 h-4 w-4 text-yellow-400 animate-bounce" />
            </div>
            <h2 className="text-2xl font-bold gradient-text mb-4">Reporte Enviado!</h2>
            <p className="text-white/80 mb-6 leading-relaxed">
              Seu reporte foi enviado com sucesso para a prefeitura. 
              Você receberá atualizações sobre o andamento do reparo.
            </p>
            <Badge variant="glass" className="px-4 py-2">
              Protocolo: #{Date.now()}
            </Badge>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto p-4 space-y-8">
      <Card className="glass-card border-0 hover-lift">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl w-fit">
            <AlertTriangle className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="gradient-text text-2xl">Reportar Problema na Estrada</CardTitle>
          <CardDescription className="text-white/70 text-base">
            Documente problemas nas vias públicas para que a prefeitura possa tomar as devidas providências.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Tipo do problema */}
            <div className="space-y-3">
              <Label htmlFor="tipo" className="text-white text-base">Tipo do Problema</Label>
              <select 
                id="tipo"
                value={formData.tipo}
                onChange={(e) => handleInputChange('tipo', e.target.value)}
                className="w-full p-3 rounded-xl border-2 border-white/20 bg-white/10 backdrop-blur-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                required
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'white'
                }}
              >
                <option value="" className="bg-slate-800">Selecione o tipo</option>
                <option value="buraco" className="bg-slate-800">🕳️ Buraco na pista</option>
                <option value="rachadura" className="bg-slate-800">🔀 Rachadura no asfalto</option>
                <option value="sinalizacao" className="bg-slate-800">🚧 Problema de sinalização</option>
                <option value="drenagem" className="bg-slate-800">💧 Problema de drenagem</option>
                <option value="iluminacao" className="bg-slate-800">💡 Iluminação pública</option>
                <option value="outros" className="bg-slate-800">⚠️ Outros</option>
              </select>
            </div>

            {/* Descrição */}
            <div className="space-y-3">
              <Label htmlFor="descricao" className="text-white text-base">Descrição do Problema</Label>
              <Textarea
                id="descricao"
                placeholder="Descreva detalhadamente o problema encontrado..."
                value={formData.descricao}
                onChange={(e) => handleInputChange('descricao', e.target.value)}
                required
                rows={4}
                className="w-full p-3 rounded-xl border-2 border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 resize-none"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'white'
                }}
              />
            </div>

            {/* Urgência */}
            <div className="space-y-3">
              <Label className="text-white text-base">Nível de Urgência</Label>
              <div className="flex space-x-3">
                {[
                  { value: 'baixa', label: 'Baixa', color: 'bg-green-500/20 text-green-400 border-green-500/30', emoji: '🟢' },
                  { value: 'media', label: 'Média', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', emoji: '🟡' },
                  { value: 'alta', label: 'Alta', color: 'bg-red-500/20 text-red-400 border-red-500/30', emoji: '🔴' }
                ].map((urgencia) => (
                  <button
                    key={urgencia.value}
                    type="button"
                    onClick={() => handleInputChange('urgencia', urgencia.value)}
                    className={`px-4 py-3 rounded-xl text-sm font-medium border transition-all duration-300 hover-lift ${
                      formData.urgencia === urgencia.value 
                        ? `${urgencia.color} shadow-lg` 
                        : 'text-white/60 border-white/20 hover:text-white'
                    }`}
                    style={{
                      background: formData.urgencia === urgencia.value 
                        ? urgencia.value === 'baixa' ? 'rgba(34, 197, 94, 0.2)'
                          : urgencia.value === 'media' ? 'rgba(234, 179, 8, 0.2)'
                          : 'rgba(239, 68, 68, 0.2)'
                        : 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(8px)',
                      border: formData.urgencia === urgencia.value 
                        ? urgencia.value === 'baixa' ? '1px solid rgba(34, 197, 94, 0.4)'
                          : urgencia.value === 'media' ? '1px solid rgba(234, 179, 8, 0.4)'
                          : '1px solid rgba(239, 68, 68, 0.4)'
                        : '1px solid rgba(255, 255, 255, 0.2)',
                      boxShadow: formData.urgencia === urgencia.value 
                        ? '0 4px 20px rgba(0, 0, 0, 0.3)' 
                        : '0 2px 10px rgba(0, 0, 0, 0.2)'
                    }}
                    onMouseEnter={(e) => {
                      if (formData.urgencia !== urgencia.value) {
                        e.target.style.background = 'rgba(255, 255, 255, 0.15)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (formData.urgencia !== urgencia.value) {
                        e.target.style.background = 'rgba(255, 255, 255, 0.1)'
                      }
                    }}
                  >
                    <span className="mr-2">{urgencia.emoji}</span>
                    {urgencia.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Captura de fotos */}
            <CameraCapture 
              onPhotoCapture={handlePhotoCapture}
              photos={photos}
              onRemovePhoto={handleRemovePhoto}
            />

            {/* Captura de localização */}
            <LocationCapture 
              location={location}
              onLocationCapture={handleLocationCapture}
            />

            {/* Botão de envio */}
            <Button 
              type="submit" 
              variant="gradient"
              className="w-full py-4 text-lg font-semibold pulse-glow hover-lift" 
              disabled={isSubmitting || !formData.tipo || !formData.descricao}
            >
              <Send className="mr-3 h-5 w-5" />
              {isSubmitting ? 'Enviando...' : 'Enviar Reporte'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

// Tela de histórico
function HistoryScreen() {
  const [reportes, setReportes] = useState([])

  useEffect(() => {
    const historico = JSON.parse(localStorage.getItem('reportes') || '[]')
    setReportes(historico)
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case 'enviado': return 'bg-blue-100 text-blue-800'
      case 'em_andamento': return 'bg-yellow-100 text-yellow-800'
      case 'concluido': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getUrgenciaColor = (urgencia) => {
    switch (urgencia) {
      case 'baixa': return 'bg-green-100 text-green-800'
      case 'media': return 'bg-yellow-100 text-yellow-800'
      case 'alta': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="max-w-md mx-auto p-4 space-y-6">
      <Card className="glass-card border-0">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl w-fit">
            <History className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="gradient-text text-2xl">Histórico de Reportes</CardTitle>
          <CardDescription className="text-white/70 text-base">
            Acompanhe o status dos seus reportes enviados
          </CardDescription>
        </CardHeader>
      </Card>

      {reportes.length === 0 ? (
        <Card className="glass-card border-0 floating-animation">
          <CardContent className="pt-8 pb-8 text-center">
            <History className="mx-auto h-16 w-16 text-white/40 mb-6" />
            <p className="text-white/70 text-lg mb-6">Nenhum reporte enviado ainda.</p>
            <Link to="/">
              <Button variant="gradient" className="pulse-glow">
                <Plus className="mr-2 h-4 w-4" />
                Fazer Primeiro Reporte
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {reportes.map((reporte) => (
            <Card key={reporte.id} className="glass-card border-0 hover-lift">
              <CardContent className="pt-6 pb-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-semibold capitalize text-white text-lg">
                    {reporte.tipo.replace('_', ' ')}
                  </h3>
                  <Badge variant="glass" className={getStatusColor(reporte.status)}>
                    {reporte.status === 'enviado' ? '📤 Enviado' : 
                     reporte.status === 'em_andamento' ? '⚙️ Em Andamento' : '✅ Concluído'}
                  </Badge>
                </div>
                
                <p className="text-white/80 mb-4 leading-relaxed">{reporte.descricao}</p>
                
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center space-x-3">
                    <Badge variant="glass" className={getUrgenciaColor(reporte.urgencia)}>
                      {reporte.urgencia === 'baixa' ? '🟢' : reporte.urgencia === 'media' ? '🟡' : '🔴'} {reporte.urgencia}
                    </Badge>
                    {reporte.photos > 0 && (
                      <span className="flex items-center text-white/60">
                        <Camera className="h-4 w-4 mr-1" />
                        {reporte.photos}
                      </span>
                    )}
                    {reporte.location !== 'Não informada' && (
                      <span className="flex items-center text-white/60">
                        <MapPin className="h-4 w-4 mr-1" />
                        GPS
                      </span>
                    )}
                  </div>
                  <span className="text-white/50 text-xs">{reporte.timestamp}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

// Componente principal da aplicação
function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navigation />
        <main className="pb-8">
          <Routes>
            <Route path="/" element={<ReportScreen />} />
            <Route path="/historico" element={<HistoryScreen />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App

