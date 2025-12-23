import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { tenantAPI } from '@/lib_api';

interface TenantData {
  practice_name: string;
  address: string;
  phone: string;
  email: string;
  domain: string;
}

interface BrandingData {
  title: string;
  description: string;
  footer_text: string;
  logo_alt: string;
  primary_color: string;
  hero_title: string;
  hero_subtitle: string;
  schema_title: string;
}

interface SchedulingData {
  working_days: number[];
  opening_hours: Record<string, { start: string; end: string }>;
  slot_duration_minutes: number;
  holidays: any[];
  timezone: string;
}

interface TenantContextType {
  tenant: TenantData | null;
  branding: BrandingData | null;
  scheduling: SchedulingData | null;
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export const useTenant = () => {
  const context = useContext(TenantContext);
  if (context === undefined) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return context;
};

interface TenantProviderProps {
  children: ReactNode;
}

export const TenantProvider: React.FC<TenantProviderProps> = ({ children }) => {
  const [tenant, setTenant] = useState<TenantData | null>(null);
  const [branding, setBranding] = useState<BrandingData | null>(null);
  const [scheduling, setScheduling] = useState<SchedulingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTenantData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [tenantResponse, brandingResponse, schedulingResponse] = await Promise.all([
        tenantAPI.getTenantInfo(),
        tenantAPI.getBrandingInfo(),
        tenantAPI.getSchedulingInfo(),
      ]);

      setTenant(tenantResponse);
      setBranding(brandingResponse);
      setScheduling(schedulingResponse);
    } catch (err) {
      console.error('Failed to load tenant data:', err);
      setError('Fehler beim Laden der Praxis-Daten');
      // Fallback: Leere Daten setzen, damit UI nicht blockiert wird
      // Komponenten können dann mit Fallback-Daten arbeiten
      setTenant(null);
      setBranding(null);
      setScheduling(null);
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    await loadTenantData();
  };

  useEffect(() => {
    loadTenantData();
  }, []);

  const value: TenantContextType = {
    tenant,
    branding,
    scheduling,
    loading,
    error,
    refreshData,
  };

  return (
    <TenantContext.Provider value={value}>
      {children}
    </TenantContext.Provider>
  );
};
