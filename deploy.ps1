# Script de deploy para GitHub Pages
Write-Host "Iniciando deploy para GitHub Pages..." -ForegroundColor Green

# Build do projeto
Write-Host "Executando build..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "Erro no build!" -ForegroundColor Red
    exit 1
}

# Salvar branch atual
$currentBranch = git branch --show-current

# Ir para branch gh-pages
Write-Host "Mudando para branch gh-pages..." -ForegroundColor Yellow
git checkout gh-pages

# Copiar arquivos da pasta dist
Write-Host "Copiando arquivos..." -ForegroundColor Yellow
Copy-Item -Path "dist\*" -Destination "." -Recurse -Force

# Remover pasta dist
Remove-Item -Path "dist" -Recurse -Force -ErrorAction SilentlyContinue

# Adicionar e commitar
Write-Host "Fazendo commit..." -ForegroundColor Yellow
git add -A
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
git commit -m "Deploy: $timestamp"

# Push para GitHub
Write-Host "Fazendo push..." -ForegroundColor Yellow
git push origin gh-pages

# Voltar para branch original
Write-Host "Voltando para branch $currentBranch..." -ForegroundColor Yellow
git checkout $currentBranch

Write-Host "Deploy concluído! Acesse: https://wesleibbs.github.io/Report-cidadao/" -ForegroundColor Green
