"use client";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { usePathname } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import { AppSidebar } from "~/components/app-sidebar";
import { ModeToggle } from "~/components/mode-toggle";
import { Button } from "~/components/ui/button";
import { NavUser } from "~/components/nav-user";
import { auth } from "~/lib/firebase";

export function AppLayoutClient({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";
  const [user, setUser] = useState<any>(null);

  // Sidebar open state persisted in localStorage
  const [sidebarOpen, setSidebarOpen] = useState<boolean | undefined>(undefined);

  // Load sidebar state from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("sidebar-open");
      setSidebarOpen(stored === null ? true : stored === "true");
    }
  }, []);

  // Persist sidebar state to localStorage
  useEffect(() => {
    if (sidebarOpen !== undefined) {
      localStorage.setItem("sidebar-open", sidebarOpen.toString());
    }
  }, [sidebarOpen]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          name: firebaseUser.displayName || firebaseUser.email,
          email: firebaseUser.email,
          avatar: firebaseUser.photoURL || "/avatar.png",
        });
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/login";
  };

  // Wait for sidebarOpen to be loaded before rendering
  if (sidebarOpen === undefined) return null;

  return isLoginPage ? (
    <main className="min-h-screen flex items-center justify-center bg-background">
      {children}
    </main>
  ) : (
    <SidebarProvider open={sidebarOpen} onOpenChange={setSidebarOpen}>
      <AppSidebar />
      <div className="flex flex-col min-h-screen w-full">
        {/* Top right controls */}
        <header className="flex justify-between items-center gap-2 p-4 border-b">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <h1 className="text-2xl font-bold text-foreground truncate">Intello AI</h1>
          </div>
          <div className="flex items-center gap-2">
            <ModeToggle />
            {user ? (
              <NavUser user={user} onLogout={handleLogout} />
            ) : (
              <Button variant="outline" onClick={() => (window.location.href = "/login")}>
                Login
              </Button>
            )}
          </div>
        </header>
        <main className="flex-1 w-full">{children}</main>
      </div>
    </SidebarProvider>
  );
}
