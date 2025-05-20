# Daily Bite

**Daily Bite** é um app desenvolvido com **React + TypeScript + TailwindCSS + Capacitor**, com uma estrutura moderna e diversos componentes de interface baseados na biblioteca **Radix UI**.

O aplicativo tem como finalidade ajudar o usuário a registrar e acompanhar suas refeições diárias, calculando calorias, proteínas, carboidratos e gorduras consumidas, além de exibir progresso visual em relação às metas diárias.

O sistema desenvolvido foi implementado como um Progressive Web App (PWA), garantindo acessibilidade multiplataforma com performance otimizada.

**Obs: Tenho desenvolvido alguns aplicativos para amigos que estão empreendendo, e aproveitarei para compartilhá-los aqui como parte da atualização do meu portfólio.
Notei que ainda faltam alguns apps por aqui — estou organizando isso aos poucos. No momento, os builds estão disponíveis apenas para Android, pois não possuo um dispositivo Apple para gerar versões iOS e também não há necessidade de arcar com os custos da App Store neste estágio. Além disso, a publicação na Google Play está suspensa temporariamente devido à burocracia envolvida. Mas fique tranquilo(a), os arquivos APK estarão disponíveis em outras plataformas e também aqui no repositório, para quem quiser baixar e testar. Caso tenha interesse posso desenvolver como freelancer alguma solução em software para você - teria que entrar em contato. Obrigado**

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
