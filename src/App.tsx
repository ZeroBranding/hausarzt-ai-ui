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
        const response = await fetch(`${base}/health`, { cache: "no-store" });
        setBackendAvailable(response.ok);
      } catch {
        setBackendAvailable(false);
      }
    };

    checkBackend();
  }, []);

  if (backendAvailable === false) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center p-8 max-w-md">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Backend nicht verfügbar
          </h1>
          <p className="text-muted-foreground mb-4">
            Das Backend-System ist derzeit nicht erreichbar. Bitte prüfen Sie die Backend-URL und starten Sie das Backend.
          </p>
          <code className="block bg-muted p-3 rounded text-sm mb-4">
            VITE_API_URL (Lovable Build-ENV) muss auf &lt;backend&gt;/api zeigen
          </code>
        </div>
      </div>
    );
  }

  if (backendAvailable === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Prüfe Backend-Verfügbarkeit...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
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
