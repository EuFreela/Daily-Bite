# Daily Bite

**Daily Bite** é um app desenvolvido com **React + TypeScript + TailwindCSS + Capacitor**, com uma estrutura moderna e diversos componentes de interface baseados na biblioteca **Radix UI**.

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
