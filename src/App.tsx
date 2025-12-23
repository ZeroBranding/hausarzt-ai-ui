import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { TenantProvider } from "./contexts/TenantContext";
import { apiUtils } from "@/lib/api";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Leistungen from "./pages/Leistungen";
import Termin from "./pages/Termin";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PasswortVergessen from "./pages/PasswortVergessen";
import Patientenbereich from "./pages/Patientenbereich";
import Dashboard from "./pages/Dashboard";
import Kontakt from "./pages/Kontakt";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const BackendConnectivityCheck = ({ children }: { children: React.ReactNode }) => {
  const [backendAvailable, setBackendAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const base = apiUtils.getApiBaseUrl();
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 Sekunden Timeout
        
        const response = await fetch(`${base}/health`, { 
          cache: "no-store",
          signal: controller.signal,
        });
        clearTimeout(timeoutId);
        setBackendAvailable(response.ok);
      } catch {
        // Backend nicht verfügbar - nicht blockieren, nur Warnung anzeigen
        setBackendAvailable(false);
      }
    };

    checkBackend();
  }, []);

  // Nicht blockieren - immer rendern, Warnung nur als Banner
  return (
    <>
      {backendAvailable === false && (
        <div className="bg-yellow-500/10 border-b border-yellow-500/50 px-4 py-2 text-sm text-yellow-700 dark:text-yellow-400">
          <div className="container mx-auto flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            <span>Backend nicht verfügbar - einige Funktionen sind möglicherweise eingeschränkt.</span>
          </div>
        </div>
      )}
      {children}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TenantProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BackendConnectivityCheck>
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/leistungen" element={<Leistungen />} />
                <Route path="/termin" element={<Termin />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/passwort-vergessen" element={<PasswortVergessen />} />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/patientenbereich" element={
                  <ProtectedRoute>
                    <Patientenbereich />
                  </ProtectedRoute>
                } />
                <Route path="/kontakt" element={<Kontakt />} />
                <Route path="/impressum" element={<Impressum />} />
                <Route path="/datenschutz" element={<Datenschutz />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </BackendConnectivityCheck>
      </TooltipProvider>
    </TenantProvider>
  </QueryClientProvider>
);

export default App;
