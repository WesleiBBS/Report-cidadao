# 🚧 Report Cidadão - PWA para Reportar Problemas nas Estradas

Uma aplicação Progressive Web App (PWA) moderna e responsiva para que cidadãos possam reportar problemas nas estradas e vias públicas diretamente para a prefeitura.

## ✨ Características

- **Interface Glassmorphism**: Design moderno com efeitos de vidro e transparência
- **PWA Completo**: Funciona offline e pode ser instalado como app nativo
- **Responsivo**: Otimizado para dispositivos móveis e desktop
- **Captura de Fotos**: Integração com câmera do dispositivo
- **Geolocalização**: Captura automática da localização GPS
- **Histórico**: Acompanhamento de reportes enviados
- **Animações Suaves**: Efeitos visuais modernos e interativos

## 🛠️ Tecnologias Utilizadas

- **React 18** - Framework JavaScript
- **Vite** - Build tool rápido
- **CSS Puro** - Estilos customizados com glassmorphism
- **Lucide React** - Ícones modernos
- **Service Worker** - Funcionalidade offline
- **Web APIs**: Camera, Geolocation, Notifications

## 🚀 Funcionalidades

### 📝 Reporte de Problemas
- Seleção do tipo de problema (buraco, rachadura, sinalização, etc.)
- Descrição detalhada do problema
- Classificação de urgência (baixa, média, alta)
- Captura de múltiplas fotos
- Localização GPS automática

### 📱 Interface do Usuário
- Design glassmorphism com transparências
- Gradientes coloridos
- Animações fluidas (float, pulse, hover)
- Botões interativos com feedback visual
- Cards com efeito de elevação

### 📊 Histórico e Acompanhamento
- Lista de todos os reportes enviados
- Status de cada reporte (enviado, em andamento, concluído)
- Detalhes completos de cada ocorrência
- Timestamps e localização

## 🔧 Como Executar

### Pré-requisitos
- Node.js 16+ 
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone https://github.com/WesleiBBS/Report-cidadao.git

# Entre no diretório
cd Report-cidadao

# Instale as dependências
npm install

# Execute o projeto em modo desenvolvimento
npm run dev
```

### Build para Produção
```bash
# Gerar build otimizado
npm run build

# Preview da build
npm run preview
```

## 📱 PWA Features

### Service Worker
- Cache de recursos estáticos
- Funcionalidade offline básica
- Estratégia cache-first para assets

### Manifest.json
- Ícones para diferentes tamanhos de tela
- Configuração de tema e cores
- Modo standalone para experiência nativa

### Instalação
O app pode ser instalado diretamente do navegador como um aplicativo nativo em:
- Android (Chrome, Firefox)
- iOS (Safari)
- Desktop (Chrome, Edge)

## 🎨 Design System

### Cores Principais
- **Gradiente Primário**: Laranja para Vermelho (#f97316 → #ef4444)
- **Background**: Gradiente escuro (#0f172a → #7c3aed → #0f172a)
- **Glassmorphism**: rgba(255, 255, 255, 0.1) com blur(16px)

### Componentes UI
- **Botões**: Variantes glass e gradient
- **Cards**: Efeito glassmorphism com hover
- **Inputs**: Transparentes com bordas luminosas
- **Badges**: Indicadores coloridos por status/urgência

## 🔮 Funcionalidades Futuras

- [ ] Integração com API da prefeitura
- [ ] Sistema de notificações push
- [ ] Chat para acompanhamento
- [ ] Mapa interativo dos reportes
- [ ] Análise de dados e dashboards
- [ ] Sistema de gamificação
- [ ] Votação comunitária

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abrir um Pull Request

## 📞 Contato

Feito com ❤️ por [WesleiBBS](https://github.com/WesleiBBS)

---

⭐ Se este projeto te ajudou, deixe uma estrela no repositório!
