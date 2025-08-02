import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { dark } from "@clerk/themes";
import Link from "next/link";
import { Github, Linkedin, Mail, Heart, Sparkles } from "lucide-react";
import ScrollToTopButton from "@/components/scroll-to-top-button";
import CurrentYear from "@/components/current-year";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NexoAI",
  description: "AI-powered career development platform",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/logo.png" sizes="any" />
        </head>
        <body className={`${inter.className}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main className="min-h-screen">{children}</main>
            <Toaster richColors />

            <footer className="bg-background border-t border-border">
              <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                  {/* Brand Section */}
                  <div className="text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start mb-4">
                      <h3 className="text-xl font-bold text-foreground">
                        NexoAI
                      </h3>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      AI-powered career development platform that helps you build resumes, prepare for interviews, and advance your professional journey with intelligent insights.
                    </p>
                  </div>

                  {/* Quick Links */}
                  <div className="text-center">
                    <h4 className="text-lg font-semibold text-foreground mb-4">
                      Quick Links
                    </h4>
                    <div className="space-y-2">
                      <Link href="/dashboard" className="block text-muted-foreground hover:text-blue-400 transition-colors duration-300 text-sm">
                        Dashboard
                      </Link>
                      <Link href="/resume" className="block text-muted-foreground hover:text-blue-400 transition-colors duration-300 text-sm">
                        Build Resume
                      </Link>
                      <Link href="/interview" className="block text-muted-foreground hover:text-blue-400 transition-colors duration-300 text-sm">
                        Interview Prep
                      </Link>
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="text-center md:text-right">
                    <h4 className="text-lg font-semibold text-foreground mb-4">
                      Connect
                    </h4>
                    <div className="flex justify-center md:justify-end space-x-4">
                      <Link 
                        href="https://github.com/theshibaprasad"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-blue-400 transition-colors duration-300"
                      >
                        <Github className="h-5 w-5" />
                      </Link>
                      <Link 
                        href="https://www.linkedin.com/in/theshibaprasad/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-blue-400 transition-colors duration-300"
                      >
                        <Linkedin className="h-5 w-5" />
                      </Link>
                      <Link 
                        href="mailto:theshibaprasad@gmail.com"
                        className="text-muted-foreground hover:text-blue-400 transition-colors duration-300"
                      >
                        <Mail className="h-5 w-5" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-border pt-8">
                  <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="text-center md:text-left mb-4 md:mb-0">
                      <p className="text-sm text-muted-foreground">
                        © <CurrentYear /> NexoAI. All rights reserved.
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">
                        Made with
                      </span>
                      <Heart className="h-4 w-4 text-red-500 animate-pulse" />
                      <span className="text-sm text-muted-foreground">
                        by{" "}
                        <Link 
                          href="https://www.linkedin.com/in/theshibaprasad/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 hover:underline transition-colors duration-300 font-medium"
                        >
                          Shiba Prasad
                        </Link>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </footer>
            <ScrollToTopButton />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
