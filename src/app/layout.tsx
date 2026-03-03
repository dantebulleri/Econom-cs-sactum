import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { Navbar } from "@/components/navigation/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Economist Sanctum",
  description:
    "Un entorno digital de alto rendimiento para investigación y pensamiento económico.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
