# Praxis-WebSystem Frontend

## Übersicht

Das Frontend des Praxis-Websystems ist eine moderne React-Anwendung für die Verwaltung von Arztterminen, Patientendaten und Kommunikation.

## Technologien

- **Vite** - Build-Tool und Entwicklungs-Server
- **TypeScript** - Typensichere JavaScript-Entwicklung
- **React** - UI-Framework
- **shadcn-ui** - Komponenten-Bibliothek
- **Tailwind CSS** - Utility-First CSS Framework
- **React Router** - Client-side Routing
- **React Hook Form** - Formular-Verwaltung
- **Zod** - Schema-Validierung

## Lokale Entwicklung

### Voraussetzungen

- Node.js (Version 18 oder höher)
- npm oder yarn

### Installation

```bash
# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev
```

Der Server läuft standardmäßig auf `http://localhost:8080`

### Verfügbare Scripts

- `npm run dev` - Startet den Entwicklungsserver
- `npm run build` - Erstellt ein Produktions-Build
- `npm run build:dev` - Erstellt ein Entwicklungs-Build
- `npm run lint` - Führt ESLint aus
- `npm run preview` - Zeigt das Produktions-Build lokal an

## Projektstruktur

```
src/
├── components/     # Wiederverwendbare UI-Komponenten
├── pages/         # Seitenkomponenten
├── hooks/         # Custom React Hooks
├── lib/           # Hilfsfunktionen und Konfigurationen
└── assets/        # Statische Assets
```

## Features

- **Patientenverwaltung** - Registrierung, Login, Profil-Verwaltung
- **Terminplanung** - Online-Terminbuchung und -Verwaltung
- **Nachrichtensystem** - Sichere Kommunikation zwischen Arzt und Patienten
- **Responsive Design** - Optimiert für Desktop und Mobile
- **Barrierefreiheit** - WCAG-konforme Implementierung
