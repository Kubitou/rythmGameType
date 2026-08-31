# 🎵 Rhythm Game Engine

Uma engine de **rhythm game** desenvolvida em TypeScript, com foco em sincronização temporal, arquitetura modular e separação de responsabilidades.

O projeto está sendo desenvolvido do zero como um estudo prático de **game engine architecture**, explorando conceitos como gerenciamento de tempo, sincronização com áudio, sistemas de notas, julgamento de input, combo, pontuação e estados de jogo.

> 🚧 **Projeto em desenvolvimento**

---

## 🎮 Sobre o projeto

A proposta é desenvolver a base de um rhythm game semelhante a jogos como *Taiko no Tatsujin*, começando pela construção da engine e seus sistemas fundamentais.

Em vez de concentrar toda a lógica em um único arquivo, o projeto busca separar cada responsabilidade em componentes independentes.

Atualmente, o fluxo principal pode ser representado por:

```text
Áudio
  ↓
AudioBeatSource
  ↓
Game
  ├── NoteManager
  ├── Judge
  ├── ComboManager
  └── ScoreManager
        ↓
     Renderer
        ↓
      Canvas
```

---

## ⚙️ Funcionalidades

### Sistema de tempo

* BPM configurável
* sincronização baseada no áudio
* sistema de `offset`
* conversão de tempo do áudio para beats
* suporte a uma fonte de tempo interna através do `TimeEngine`

### Sistema de notas

* Tap Notes
* Roll Notes
* ações `DON` e `KATSU`
* chart baseado em beats
* spawn e remoção automática de notas

Exemplo de chart:

```ts
{
  bpm: 120,
  offset: 6.56,

  notes: [
    { beat: 0, action: "DON", size: "small" },
    { beat: 0.70, action: "DON", size: "small" },

    {
      type: "roll",
      startBeat: 4,
      endBeat: 10,
      action: "DON",
      size: "small",
    },

    { beat: 11, action: "KATSU", size: "small" }
  ]
}
```

### Sistema de julgamento

O jogo possui diferentes resultados para os inputs:

```text
Perfect
Good
Bad
Miss
Roll Hit
```

O julgamento é baseado na distância entre o beat atual e o beat da nota.

### Combo

O `ComboManager` controla o combo do jogador.

Acertos aumentam o combo:

```text
Perfect → +1
Good    → +1
Bad     → +1
```

Enquanto um `Miss` quebra o combo.

### Pontuação

O `ScoreManager` é responsável pelo cálculo e armazenamento da pontuação.

Isso mantém a lógica de score separada do sistema de julgamento e do gerenciamento de combo.

### Máquina de estados

A engine utiliza uma máquina de estados para controlar o fluxo do jogo:

```text
idle
  ↓
countdown
  ↓
playing
  ↓
paused
  ↓
results
```

A implementação está sendo desenvolvida gradualmente, incluindo:

* Countdown
* Pause/Resume
* Finalização da música
* Tela de resultados
* Estatísticas da partida

---

## 🏗️ Arquitetura

A estrutura do projeto busca separar responsabilidades em diferentes camadas:

```text
src/
│
├── core/
│   ├── ChartTypes.ts
│   ├── GameplayConfig.ts
│   ├── HitEvent.ts
│   ├── Note.ts
│   └── PlayerInput.ts
│
├── engine/
│   ├── AudioBeatSource.ts
│   ├── AudioManager.ts
│   ├── BeatSource.ts
│   ├── Clock.ts
│   ├── ComboManager.ts
│   ├── Game.ts
│   ├── Judge.ts
│   ├── NoteManager.ts
│   ├── ScoreManager.ts
│   └── TimeEngine.ts
│
└── render/
    ├── RenderConfig.ts
    └── Renderer.ts
```

A ideia principal é evitar que sistemas diferentes conheçam detalhes que não são de sua responsabilidade.

Por exemplo:

```text
Judge
  ↓
decide se o jogador acertou

ComboManager
  ↓
controla combo

ScoreManager
  ↓
calcula pontuação

Renderer
  ↓
apenas apresenta o estado do jogo
```

---

## ⏱️ Sincronização por Beats

Um dos principais objetivos técnicos do projeto é trabalhar com **beats em vez de depender diretamente de segundos**.

A conversão utilizada pelo `AudioBeatSource` é:

```text
beat = (currentTime - offset) × BPM / 60
```

Isso permite que o restante da engine trabalhe em uma unidade musical independente do tempo real do áudio.

Por exemplo, com:

```text
BPM = 120
```

temos:

```text
1 beat = 0,5 segundo
```

O `offset` permite compensar diferenças entre o início do áudio e o momento considerado como beat `0`.

---

## 🎨 Renderer

A renderização utiliza HTML Canvas.

O `Renderer` recebe o estado da `Game` e transforma os dados da engine em elementos visuais.

Atualmente são renderizados:

* linha de acerto
* Tap Notes
* Roll Notes
* combo
* score
* último julgamento

A renderização está sendo organizada por estado:

```text
GameState
   │
   ├── countdown → Countdown
   ├── playing   → Gameplay
   ├── paused    → Gameplay + Pause
   └── results   → Results
```

---

## 🛠️ Tecnologias

* **TypeScript**
* **JavaScript**
* **HTML5 Canvas**
* **Web Audio / HTML Audio**
* **Vite**
* **Git / GitHub**
* **Docker** *(ambiente de desenvolvimento)*

---

## 🚀 Executando o projeto

Clone o repositório:

```bash
git clone <URL_DO_REPOSITORIO>
cd <NOME_DO_PROJETO>
```

Instale as dependências:

```bash
npm install
```

Execute em desenvolvimento:

```bash
npm run dev
```

Depois acesse o endereço fornecido pelo Vite.

### Docker

O projeto também possui configuração Docker para facilitar a reprodução do ambiente de desenvolvimento.

```bash
docker compose up --build
```

---

## 🧪 Status do desenvolvimento

### Engine

* [x] Sistema de Clock
* [x] TimeEngine
* [x] BeatSource
* [x] AudioBeatSource
* [x] Offset
* [x] Chart
* [x] Tap Notes
* [x] Roll Notes
* [x] NoteManager
* [x] Judge
* [x] ComboManager
* [x] ScoreManager
* [x] PlayerInput
* [x] GameState inicial
* [x] Countdown lógico
* [ ] Pause completo
* [ ] Results
* [ ] Retry
* [ ] Finalização automática da música
* [ ] Sistema de ranking/grade

### Renderização

* [x] Canvas
* [x] Renderização de Tap Notes
* [x] Renderização de Roll Notes
* [x] Linha de acerto
* [x] HUD básico
* [ ] Countdown visual
* [ ] Pause Menu
* [ ] Results Screen
* [ ] Animações
* [ ] Background
* [ ] Efeitos visuais

### Gameplay

* [x] Input
* [x] Julgamento
* [x] Combo
* [x] Score
* [x] Roll
* [ ] Sons de hit
* [ ] Feedback visual avançado
* [ ] Sistema de dificuldade
* [ ] Seleção de músicas
* [ ] Mais charts

---

## 📚 Objetivos de aprendizado

Este projeto está sendo desenvolvido principalmente para aprofundar conhecimentos em:

* Arquitetura de software
* Programação orientada a objetos
* TypeScript
* Game loops
* Sistemas baseados em eventos
* Sincronização temporal
* Processamento de input
* Separação de responsabilidades
* State Machines
* Renderização com Canvas
* Estruturação de engines
* Containerização com Docker

---

## 🔮 Próximos passos

O desenvolvimento seguirá aproximadamente esta ordem:

```text
GameState
    ↓
Countdown
    ↓
Pause / Resume
    ↓
Finalização da música
    ↓
Results
    ↓
Retry
    ↓
Mais sistemas de gameplay
    ↓
Polimento visual
```

A intenção não é apenas criar um jogo funcional, mas construir uma **pequena engine modular de rhythm game**, permitindo que novos sistemas sejam adicionados sem concentrar toda a lógica em um único componente.

---

## 👨‍💻 Autor

**Leonardo Kubo**

Desenvolvedor em formação, interessado em desenvolvimento de software, backend e arquitetura de sistemas.

Este projeto faz parte do meu processo de aprendizado e desenvolvimento de portfólio.
