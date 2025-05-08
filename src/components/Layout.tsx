import Navbar from "./Navbar";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

const Layout = ({ children, title }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container max-w-3xl mx-auto pt-6 pb-24 md:pt-24 md:pb-6 px-4">
        {title && (
          <h1 className="text-2xl md:text-3xl font-bold mb-6">{title}</h1>
        )}
        {children}
      </main>
    </div>
  );
};

export default Layout;