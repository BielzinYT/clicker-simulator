<div align="center">

# 🐾 Clicker Simulator

**Um clicker idle completo com 150+ pets, 4 mundos, ranking online e muito mais!**

[![Versão](https://img.shields.io/badge/versão-1.1.0-blue?style=for-the-badge)](https://github.com/BielzinYT/clicker-simulator/releases)
[![Plataforma](https://img.shields.io/badge/plataforma-Windows-0078D6?style=for-the-badge&logo=windows)](https://github.com/BielzinYT/clicker-simulator/releases)
[![Licença](https://img.shields.io/badge/licença-MIT-green?style=for-the-badge)](LICENSE)
[![Downloads](https://img.shields.io/github/downloads/BielzinYT/clicker-simulator/total?style=for-the-badge&color=gold)](https://github.com/BielzinYT/clicker-simulator/releases)

[📥 Descarregar](https://github.com/BielzinYT/clicker-simulator/releases/latest) · [🐛 Reportar Bug](https://github.com/BielzinYT/clicker-simulator/issues) · [💡 Sugerir Feature](https://github.com/BielzinYT/clicker-simulator/issues)

</div>

---

## 📸 Screenshots

### 🗺️ Os 4 Mundos

| 🌱 Mundo Iniciante | 🌴 Mundo Selva |
|:---:|:---:|
| ![Mundo Iniciante](screenshots/screenshot-iniciante.png) | ![Mundo Selva](screenshots/screenshot-selva.png) |
| O ponto de partida. Ovos baratos para começar. | Desbloqueado com **1 rebirth**. Pets selvagens! |

| 🌊 Mundo Oceano | 🌌 Mundo Cósmico |
|:---:|:---:|
| ![Mundo Oceano](screenshots/screenshot-oceano.png) | ![Mundo Cósmico](screenshots/screenshot-cosmico.png) |
| Desbloqueado com **3 rebirths**. Criaturas marinhas. | Desbloqueado com **6 rebirths**. Seres divinos. |

### 🏆 Coleção, Ranking e Progresso

| 📖 Coleção (Iniciante + Selva) | 📖 Coleção (Oceano + Cósmico) |
|:---:|:---:|
| ![Coleção 1](screenshots/screenshot-colecao-1.png) | ![Coleção 2](screenshots/screenshot-colecao-2.png) |
| Acompanha os pets que descobriste. | Pets não descobertos aparecem como "???" |

| 🌍 Ranking Global | 📅 Ranking Semanal |
|:---:|:---:|
| ![Ranking Total](screenshots/screenshot-ranking-total.png) | ![Ranking Semanal](screenshots/screenshot-ranking-semanal.png) |
| Top 50 jogadores de sempre. | Reinicia todas as segundas-feiras. |

| 💬 Chat Global | 📊 Estatísticas |
|:---:|:---:|
| ![Chat](screenshots/screenshot-chat.png) | ![Stats](screenshots/screenshot-stats.png) |
| Conversa em tempo real com outros jogadores. | Acompanha o teu progresso completo. |

---

## ✨ Funcionalidades

### 🎮 Jogabilidade
- 👆 **Sistema de cliques** com multiplicador exponencial
- 🥚 **12 ovos** distribuídos por **4 mundos**
- 🐾 **150+ pets únicos** em **6 raridades** (Comum → Mítico)
- 🔄 **Sistema de Rebirth** — cada rebirth dá **+0.5× permanente**
- 🧬 **Fusão de pets** — 3 iguais viram 1 pet ×4 mais forte (com ⭐ infinitas)
- ⚔️ **4 slots** de pets equipados
- 💰 **Venda individual** e **venda em massa** de duplicados

### 🌐 Social (online)
- 💬 **Chat global** em tempo real
- 🎁 **Enviar e receber pets** entre jogadores
- 🏅 **Ranking global** (top 50 de sempre)
- 📅 **Ranking semanal** (reinicia às segundas-feiras)

### 🤖 Automação
- 🎯 **Auto Equip Best** — equipa sempre os 4 melhores pets
- ⚡ **Auto Fusão** — funde automaticamente todos os trios
- 🔢 **Multiplicador de ovos** — abre 1×, 2× ou 3× de uma vez
- ▶️ **Auto Open** — abre ovos sozinho até acabar os cliques

### 🎨 Experiência
- 👶 **Tutorial interativo** de 6 passos para novos jogadores
- 🌙 **Ganhos offline** — 10% do CPC/segundo enquanto estiveres fora (máx 8h)
- 🎵 **Música de fundo** calma + efeitos sonoros
- 🎊 **Animações** ao abrir ovos e fogos de artifício em drops raros
- 💾 **Save automático** — progresso preservado entre sessões e atualizações
- 🔄 **Auto-atualização** integrada via GitHub Releases

---

## 📥 Como Jogar

### Opção 1 — Descarregar o `.exe` (recomendado)

1. Vai à página de [**Releases**](https://github.com/BielzinYT/clicker-simulator/releases/latest)
2. Descarrega o `Clicker-Simulator-Setup-X.X.X.exe`
3. Corre o instalador
4. Se o Windows SmartScreen avisar → **"Mais informações"** → **"Executar mesmo assim"**
5. Abre o jogo e diverte-te! 🎉

> **Requisitos:** Windows 10 ou superior (64-bit) · ~250 MB de espaço livre

### Opção 2 — Correr a partir do código-fonte

```bash
git clone https://github.com/BielzinYT/clicker-simulator.git
cd clicker-simulator
npm install
npm start
```

---

## 🛠️ Tecnologias

| Tecnologia | Uso |
|---|---|
| **HTML5 + CSS3** | Estrutura, estilo e animações |
| **JavaScript** | Toda a lógica do jogo |
| **Electron** | Empacotamento como app desktop |
| **Supabase** | Backend (ranking, chat, presentes) |
| **electron-builder** | Build e publicação de releases |
| **electron-updater** | Sistema de auto-atualização |

---

## 📁 Estrutura do Projeto

```
clicker-simulator/
├── index.html              # Jogo completo (UI + lógica)
├── main.js                 # Processo principal do Electron
├── preload.js              # Ponte segura (contextBridge)
├── package.json            # Configuração do projeto e build
├── supabase.js             # SDK do Supabase (local)
├── icon.ico                # Ícone da aplicação
├── musica.mp3              # Música de fundo
├── som_clique.mp3          # Efeito sonoro do clique
├── som_ovo.mp3             # Efeito sonoro ao abrir ovos
├── screenshots/            # Imagens para o README
└── .gitignore
```

---

## 🗄️ Base de Dados

O jogo usa **4 tabelas** no Supabase:

| Tabela | Descrição |
|---|---|
| `leaderboard` | Ranking global (total de pontos) |
| `weekly_scores` | Ranking semanal (reinicia às segundas) |
| `chat_messages` | Mensagens do chat global |
| `pet_gifts` | Pets oferecidos entre jogadores |

Todas as tabelas precisam de **Row Level Security (RLS)** ativo com políticas para `select`, `insert` e `update`.

---

## 🚀 Como Lançar uma Nova Versão

```bash
# 1. Altera a versão no package.json (ex: 1.1.0 → 1.2.0)
# 2. Compila o .exe
Remove-Item -Recurse -Force dist
npm run build

# 3. Renomeia o .exe gerado (substitui espaços por hífens):
#    "Clicker Simulator Setup 1.2.0.exe" → "Clicker-Simulator-Setup-1.2.0.exe"

# 4. Cria o release manualmente no GitHub:
#    - Tag: v1.2.0
#    - Anexar: .exe + latest.yml
#    - Marcar "Set as the latest release"

# 5. Os jogadores recebem o aviso automaticamente! 🎉
```

---

## 🗺️ Roadmap

- [x] Sistema de cliques com multiplicador
- [x] 4 mundos com 12 ovos
- [x] 150+ pets em 6 raridades
- [x] Sistema de Rebirth
- [x] Fusão de pets
- [x] Coleção e Estatísticas
- [x] Ranking online (global + semanal)
- [x] Chat global em tempo real
- [x] Envio de pets entre jogadores
- [x] Tutorial para novos jogadores
- [x] Ganhos offline
- [x] Música e efeitos sonoros
- [x] Auto Equip / Auto Fusão / Auto Open
- [x] Auto-atualização via GitHub
- [ ] 🎁 Baú diário com recompensas progressivas
- [ ] 🏆 Sistema de conquistas
- [ ] 💾 Export/Import de save
- [ ] ⚡ Melhorias compradas (auto-clicker, slots extra, boosts)
- [ ] 🌈 Temas desbloqueáveis
- [ ] 📱 Versão mobile (Android/iOS)

---

## 🤝 Contribuir

Contribuições são bem-vindas!

1. Faz **fork** do projeto
2. Cria uma branch: `git checkout -b feature/MinhaFeature`
3. Commit: `git commit -m "Adiciona MinhaFeature"`
4. Push: `git push origin feature/MinhaFeature`
5. Abre um **Pull Request**

---

## 📄 Licença

Este projeto está sob a licença **MIT** — vê o ficheiro [LICENSE](LICENSE) para mais detalhes.

---

## 👤 Autor

**BielzinYT**

- GitHub: [@BielzinYT](https://github.com/BielzinYT)
- Repositório: [clicker-simulator](https://github.com/BielzinYT/clicker-simulator)

---

<div align="center">

**⭐ Se gostaste do projeto, deixa uma estrela no repositório! ⭐**

Feito com 💙 por BielzinYT

</div>
