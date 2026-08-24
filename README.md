# Calculadora de Bobinas

Aplicativo mobile (React Native + Expo + TypeScript) para dimensionamento de
bobinas, fiel à planilha Excel original `Calculadora_de_Bobinas.xlsx`.

## Estrutura

```
src/
  calculations/   → calculateCoil() e validação (única fonte da matemática)
  components/      → Header, InputField, AwgSelector, SummaryCard,
                      DetailsSection, MaterialCard
  constants/       → tema (cores/spacing), lista de AWG, materiais
  screens/          → CalculatorScreen (tela única do app)
  types/            → tipos TypeScript
  utils/            → formatação pt-BR (vírgula decimal, mm/m/Ω/g)
__tests__/           → testes unitários de calculateCoil()
```

Toda a matemática vive em `src/calculations/calculateCoil.ts`. Nenhum
componente de interface contém fórmulas.

## Fórmulas (idênticas à planilha)

```
dFio                  = 0.127 * 92 ^ ((36 - AWG) / 39)
espirasPorCamada      = alturaEnrolamento / dFio
totalEspiras          = espirasPorCamada * numeroCamadas
comprimentoCadaEspira = PI * diametroBobina / 10
comprimentoTotal      = totalEspiras * comprimentoCadaEspira / 100
area                  = PI * (dFio / 2)^2

resistencia(material) = resistividade * comprimentoTotal / area
peso(material)         = comprimentoTotal * area * densidade
```

Resistividade/densidade: Cobre (0,017241 | 8,89), Alumínio (0,0282 | 2,70),
CCAW 15% (0,0267 | 3,63) — extraídos das células B16/D16/F16 e B17/D17/F17
da planilha original.

Nenhum valor intermediário é arredondado durante o cálculo; o
arredondamento acontece apenas na apresentação (`src/utils/format.ts`).

## Como rodar

```bash
npm install
npx expo start
```

Abra o app **Expo Go** no seu celular Android e escaneie o QR code exibido
no terminal, ou pressione `a` no terminal para abrir no emulador Android.

## Rodar os testes unitários

```bash
npm test
```

Os testes comparam `calculateCoil()` com os valores de referência calculados
manualmente a partir das mesmas fórmulas da planilha, usando os parâmetros
padrão (Diâmetro = 31, Altura = 13, AWG = 31, Camadas = 2).

## Gerar APK Android

Existem três formas. A mais simples é pelo GitHub, sem instalar nada no
computador.

### Opção 0 — GitHub Actions (mais fácil, sem instalar nada localmente)

O projeto já vem com o workflow `.github/workflows/build-apk.yml`, que
compila o APK automaticamente no GitHub.

**Passo a passo:**

1. Crie um repositório novo no GitHub (pode ser privado).
2. Suba este projeto para o repositório:
   ```bash
   git init
   git add .
   git commit -m "Calculadora de Bobinas"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
   git push -u origin main
   ```
   (Ou, sem usar `git` no terminal: crie o repositório vazio no site do
   GitHub, clique em **"uploading an existing file"** e arraste todos os
   arquivos e pastas deste projeto — incluindo a pasta oculta `.github`.)
3. No GitHub, abra a aba **Actions** do repositório. O workflow **"Build
   Android APK"** roda automaticamente após o push (ou clique em **"Run
   workflow"** para disparar manualmente).
4. Aguarde a execução terminar (ícone verde ✅, leva alguns minutos).
5. Clique na execução concluída → role até **Artifacts** → baixe
   **`calculadora-de-bobinas-apk`**. Dentro do `.zip` baixado está o
   `app-debug.apk`, pronto para instalar no celular (ative "Fontes
   desconhecidas" nas configurações do Android para instalar).

> Esse workflow gera um **APK de debug**, que já é totalmente funcional
> e instalável — ideal para testar no celular. Se quiser um APK de
> **release assinado** (para publicar na Play Store, por exemplo), o
> arquivo do workflow tem um job `build-release` comentado no final,
> com instruções de quais *secrets* (keystore) configurar no
> repositório em Settings → Secrets and variables → Actions.

### Opção 1 — EAS Build (build na nuvem, via CLI)

```bash
npm install -g eas-cli
eas login
eas build:configure
eas build -p android --profile preview
```

Ao final, o EAS fornece um link para baixar o `.apk` (perfil `preview`) ou
`.aab` (perfil `production`, para a Play Store).

### Opção 2 — Build local com Expo prebuild

```bash
npx expo prebuild -p android
cd android
./gradlew assembleRelease
```

O APK gerado ficará em:
`android/app/build/outputs/apk/release/app-release.apk`

> Para assinar o APK de release é necessário configurar um keystore em
> `android/app/build.gradle` (ou usar `eas build`, que assina
> automaticamente).

## Observações

- Interface 100% em português, com vírgula como separador decimal.
- Dark mode como padrão, com a paleta de cores definida em
  `src/constants/theme.ts`.
- Os resultados são recalculados automaticamente a cada alteração de campo
  — não há botão "Calcular".
- "Restaurar padrão" retorna aos valores: Diâmetro 31 mm, Altura 13 mm,
  AWG 31, 2 camadas.
