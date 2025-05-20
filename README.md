# Daily Bite

**Daily Bite** é um app desenvolvido com **React + TypeScript + TailwindCSS + Capacitor**, com uma estrutura moderna e diversos componentes de interface baseados na biblioteca **Radix UI**.

O aplicativo tem como finalidade ajudar o usuário a registrar e acompanhar suas refeições diárias, calculando calorias, proteínas, carboidratos e gorduras consumidas, além de exibir progresso visual em relação às metas diárias.

O sistema desenvolvido foi implementado como um Progressive Web App (PWA), garantindo acessibilidade multiplataforma com performance otimizada.

**Obs: Estarei fazendo alguns aplicativos para amigos ajudando em seus empreendimentos e poderei disponibilizar aqui para atualização do meu portifólio - percebo que faltou alguns Apps. Não tenho uma iOS para o build dos instaladores e não há necessidade de pagar para isso. Por este motivo disponibilizarei apenas para android. Não estarei, pelo menos por enquanto, disponibilizando os apps na Google Play devido a burocracia, mas, estarei disponibilizando em outras plataformas. Contudo o apk tb esta no repositório.**

## Build de instalação

```bash
android\app\build\outputs\apk\release\dailybite.apk
```

## 🚀 Setup Rápido

```bash
git clone <repo-url>
cd dailybite
npm install
npx cap sync
```

## 📦 Principais Dependências

- **@capacitor/core, @capacitor/android, @capacitor/preferences**
- **@radix-ui/react-** (Accordion, Avatar, AlertDialog, etc.)
- **lucide-react** (ícones)
- **recharts** (gráficos)
- **embla-carousel-react** (carrossel)
- **cmdk, vaul, sonner** (componentes extras)
- **tailwindcss-animate, tw-animate-css, tailwind-merge**

## 🛠️ Scripts Disponíveis

- `npm run dev` – Inicia o ambiente de desenvolvimento
- `npm run build` – Cria a build para produção
- `npm run lint` – Executa o linter
- `npm run preview` – Visualiza a build localmente

## ⚙️ Estrutura do Projeto

```
src/
  components/
    Layout.tsx
    Navbar.tsx
    ui/ (accordion, alert, badge, avatar, etc.)
  assets/
  styles/
  main.tsx
  App.tsx
```

## 📲 Executar no Android

```bash
npx cap open android
```

Abra o projeto no Android Studio para executar no emulador ou dispositivo para usar o _apk_

![android](https://i.postimg.cc/RhMwQxmZ/Captura-de-tela-2025-05-08-215756.png)

## 📲 Executar na Web

```bash
npm run dev
```

![web](https://i.postimg.cc/xjRvj8GJ/Captura-de-tela-2025-05-08-215842.png)
