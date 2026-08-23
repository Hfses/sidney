# 🔁 Calculadora de Bobinas

Aplicativo mobile para cálculo de bobinas — Cobre, Alumínio e CCAW 15%.

Replica fielmente as fórmulas da planilha original, com interface moderna e responsiva.

---

## 📱 Funcionalidades

- Cálculo automático em tempo real conforme o usuário digita
- Suporte a 3 materiais: **Fio Cobre**, **Fio Alumínio** e **Fio CCAW 15%**
- Cálculo de **resistência (Ω)** e **peso (g)** para cada material
- Valores intermediários: diâmetro do fio (AWG), espiras por camada, total de espiras, comprimento
- Tela de informações com fórmulas, tabela de materiais e referência AWG
- Tema escuro com design orientado à eletrônica

---

## 🔢 Fórmulas Implementadas

| Variável | Fórmula |
|---|---|
| Ø Fio (mm) | `0.127 × 92^((36 − AWG) / 39)` |
| Espiras/Camada | `Altura / Ø Fio` |
| Total Espiras | `Esp./Camada × Nº Camadas` |
| C. Espira (cm) | `π × Ø Bobina / 10` |
| C. Total (m) | `Total Espiras × C. Espira / 100` |
| Resistência (Ω) | `ρ × L / A` |
| Peso (g) | `L(cm) × A(cm²) × d` |

### Propriedades dos materiais

| Material | ρ (Ω·mm²/m) | d (g/cm³) |
|---|---|---|
| Cobre | 0.017241 | 8.89 |
| Alumínio | 0.0282 | 2.70 |
| CCAW 15% | 0.0267 | 3.63 |

---

## 🚀 Como Rodar

### Pré-requisitos

- [Node.js](https://nodejs.org/) 18+
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

```bash
npm install -g expo-cli
```

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/calculadora-bobinas.git
cd calculadora-bobinas

# Instale as dependências
npm install

# Inicie o projeto
npx expo start
```

### Rodando no dispositivo

- **Android físico ou emulador**: pressione `a` no terminal, ou use o app [Expo Go](https://expo.dev/client)
- **iOS (Mac necessário)**: pressione `i` no terminal
- **Navegador (web)**: pressione `w` no terminal

---

## 📁 Estrutura do Projeto

```
calculadora-bobinas/
├── App.js                        # Entrada do app + navegação
├── app.json                      # Configuração Expo
├── package.json
├── babel.config.js
├── assets/                       # Ícones e splash screen
└── src/
    ├── screens/
    │   ├── CalculadoraScreen.js  # Tela principal de cálculo
    │   └── InfoScreen.js         # Tela de informações/fórmulas
    ├── components/
    │   ├── InputField.js         # Campo de entrada com unidade
    │   ├── ResultRow.js          # Linha de resultado
    │   └── MaterialCard.js       # Card por tipo de material
    └── utils/
        ├── calculations.js       # Motor de cálculo (fórmulas)
        └── theme.js              # Cores, tipografia, espaçamento
```

---

## 🎨 Design

- **Tema escuro** com paleta orientada à eletrônica
- **Accent teal** (#00D4FF) para destaque de valores calculados
- **Cores semânticas** por material: cobre (laranja), alumínio (cinza azulado), CCAW (roxo)
- Cálculo ao vivo: os resultados atualizam a cada tecla pressionada

---

## 📄 Licença

MIT — use à vontade.
