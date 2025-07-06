import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

// Declare mermaid on window
declare global {
  interface Window {
    mermaid: any;
  }
}

interface DocSection {
  title: string;
  content: React.ReactNode;
}

// Simplified Mermaid component for reliable rendering
const MermaidDiagram: React.FC<{ chart: string; id: string }> = ({ chart, id }) => {
  const { currentTheme: theme } = useTheme();
  const [key, setKey] = useState(0);
  
  // Force re-render when theme changes
  useEffect(() => {
    setKey(prev => prev + 1);
  }, [theme.name]);
  
  return (
    <div 
      style={{ 
        textAlign: 'center', 
        margin: '20px 0',
        backgroundColor: theme.surfaceAlt,
        border: `1px solid ${theme.border}`,
        borderRadius: '4px',
        padding: '20px',
        overflow: 'auto'
      }}
    >
      <div 
        key={key}
        className="mermaid" 
        style={{ 
          background: 'transparent', 
          margin: 0,
          minHeight: '200px'
        }}
      >
        {chart}
      </div>
    </div>
  );
};

export const Documentation: React.FC = () => {
  const { currentTheme: theme } = useTheme();
  const [activeSection, setActiveSection] = useState(0);
  const [mermaidLoaded, setMermaidLoaded] = useState(false);

  const sections: DocSection[] = [
    {
      title: 'Current Architecture',
      content: (
        <div>
          <p style={{ marginBottom: '20px', color: theme.textSecondary }}>
            GZC Intel App is a modern financial intelligence dashboard built with React, TypeScript, and Vite. 
            It features a comprehensive theme system, drag-and-drop widgets, and professional trading interface.
          </p>
          <MermaidDiagram 
            id="current-architecture"
            chart={`graph TB
    subgraph Frontend ["Frontend - Port 3500"]
        UI["React + TypeScript"]
        Theme["Theme System - 11 Themes"]
        Tabs["Tab Management"]
        DnD["React Grid Layout"]
    end
    
    subgraph Features ["Core Features"]
        Header["Professional Header"]
        Intel["Market Intel Panel"]
        Docs["Documentation"]
        Analytics["Analytics Tab"]
    end
    
    subgraph State ["State Management"]
        Context["React Context"]
        Local["LocalStorage"]
        Memory["View Memory"]
        Inspector["Memory Inspector"]
    end
    
    Frontend --> Features
    Features --> State
    
    UI --> Theme
    UI --> Tabs
    Theme --> Context
    Context --> Local
    Context --> Memory
    Memory --> Inspector`}
          />
        </div>
      )
    },
    {
      title: 'Theme System',
      content: (
        <div>
          <p style={{ marginBottom: '20px', color: theme.textSecondary }}>
            The application features 11 professionally designed themes, each optimized for different use cases and preferences.
          </p>
          <MermaidDiagram 
            id="theme-system"
            chart={`graph TB
    subgraph DarkThemes ["Dark Themes"]
        GD["GZC Dark - Institutional"]
        AD["Analytics Dark - Data Viz"]
        TG["Terminal Green - Bloomberg Style"]
        TO["Trading Operations - High Contrast"]
        MT["Midnight Trading - Ultra Dark"]
        QA["Quantum Analytics - Gradient"]
        PR["Professional - Sea Blue"]
    end
    
    subgraph LightThemes ["Light Themes"]
        GL["GZC Light - Clean Professional"]
        AR["Arctic - Cool Blue-Grey"]
        PA["Parchment - Warm Silver"]
        PE["Pearl - Steel Blue"]
    end
    
    subgraph ThemeSystem ["Theme System"]
        TP["Theme Provider"]
        LS["LocalStorage Persistence"]
        CV["CSS Variables"]
        VM["View Memory System"]
    end
    
    TP --> DarkThemes
    TP --> LightThemes
    TP --> LS
    TP --> CV
    TP --> VM`}
          />
          <div style={{
            backgroundColor: theme.surface,
            border: `1px solid ${theme.border}`,
            borderRadius: '4px',
            padding: '16px',
            marginTop: '20px'
          }}>
            <h4 style={{ marginBottom: '8px', color: theme.primary }}>Current Theme: {theme.name}</h4>
            <p style={{ margin: 0, fontSize: '12px' }}>
              Each theme includes carefully selected colors for text, backgrounds, borders, and status indicators.
              All themes maintain the GZC institutional green for success states and branding consistency.
            </p>
          </div>
        </div>
      )
    },
    {
      title: 'Component Architecture',
      content: (
        <div>
          <p style={{ marginBottom: '20px', color: theme.textSecondary }}>
            The application uses a modular component architecture with lazy loading and dynamic imports.
          </p>
          <MermaidDiagram 
            id="component-architecture"
            chart={`graph TD
    App["App.tsx - Entry Point"]
    
    subgraph Providers ["Provider Layer"]
        TP["ThemeProvider"]
        TLP["TabLayoutProvider"]
        EB["ErrorBoundary"]
        VM["ViewMemory Hook"]
    end
    
    subgraph Core ["Core Components"]
        PH["ProfessionalHeader"]
        MIP["MarketIntelPanel"]
        TC["TabContainer"]
    end
    
    subgraph Tabs ["Tab Components"]
        AT["Analytics Tab"]
        DT["Documentation Tab"]
    end
    
    App --> Providers
    Providers --> Core
    Core --> Tabs
    
    TP --> TLP
    TLP --> EB
    VM --> TP
    TC --> AT
    TC --> DT`}
          />
        </div>
      )
    },
    {
      title: 'Recent Updates',
      content: (
        <div>
          <h4 style={{ marginBottom: '16px' }}>Latest Changes</h4>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '12px',
            marginBottom: '20px'
          }}>
            <div style={{
              backgroundColor: theme.surface,
              border: `1px solid ${theme.border}`,
              borderRadius: '4px',
              padding: '16px'
            }}>
              <h5 style={{ color: theme.success, marginBottom: '8px' }}>✓ Completed Features</h5>
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '12px' }}>
                <li>11 professional themes with instant switching</li>
                <li>Theme persistence in localStorage</li>
                <li>Professional header with GZC logo</li>
                <li>Market Intel panel with AI agents</li>
                <li>Drag & drop tab reordering</li>
                <li>P&L display with real-time updates</li>
                <li>Documentation with mermaid diagrams</li>
                <li>Responsive layout system</li>
              </ul>
            </div>
            <div style={{
              backgroundColor: theme.surface,
              border: `1px solid ${theme.border}`,
              borderRadius: '4px',
              padding: '16px'
            }}>
              <h5 style={{ color: theme.warning, marginBottom: '8px' }}>🔄 In Progress</h5>
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '12px' }}>
                <li>Analytics widgets implementation</li>
                <li>Real-time market data integration</li>
                <li>Portfolio management features</li>
                <li>Advanced charting components</li>
              </ul>
            </div>
            <div style={{
              backgroundColor: theme.surface,
              border: `1px solid ${theme.border}`,
              borderRadius: '4px',
              padding: '16px'
            }}>
              <h5 style={{ color: theme.info, marginBottom: '8px' }}>📋 Planned Features</h5>
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '12px' }}>
                <li>WebSocket for real-time updates</li>
                <li>Advanced risk analytics</li>
                <li>Multi-asset portfolio tracking</li>
                <li>AI-powered market insights</li>
                <li>Customizable dashboards</li>
                <li>Export/Import configurations</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Technical Stack',
      content: (
        <div>
          <h4 style={{ marginBottom: '16px' }}>Frontend Technologies</h4>
          <div style={{
            backgroundColor: theme.surface,
            border: `1px solid ${theme.border}`,
            borderRadius: '4px',
            padding: '16px',
            marginBottom: '16px'
          }}>
            <pre style={{
              backgroundColor: theme.background,
              padding: '12px',
              borderRadius: '4px',
              fontSize: '12px',
              overflow: 'auto',
              color: theme.text,
              margin: 0
            }}>
{`{
  "core": {
    "react": "^18.3.1",
    "typescript": "~5.6.2",
    "vite": "^6.0.5",
    "react-router-dom": "^7.1.1"
  },
  "ui": {
    "react-grid-layout": "^1.5.0",
    "framer-motion": "^11.15.0",
    "recharts": "^2.15.0",
    "react-hot-toast": "^2.4.1"
  },
  "development": {
    "vitest": "^2.1.8",
    "@testing-library/react": "^16.1.0",
    "storybook": "^8.5.0-alpha.26",
    "eslint": "^9.17.0"
  },
  "features": {
    "themes": 11,
    "tabs": "dynamic",
    "state": "context + localStorage",
    "styling": "CSS-in-JS"
  }
}`}
            </pre>
          </div>
          <div style={{
            backgroundColor: theme.surface,
            border: `1px solid ${theme.border}`,
            borderRadius: '4px',
            padding: '16px'
          }}>
            <h5 style={{ color: theme.primary, marginBottom: '12px' }}>Key Features</h5>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '12px' }}>
              <div>
                <strong style={{ color: theme.text }}>Performance</strong>
                <ul style={{ margin: '4px 0', paddingLeft: '20px' }}>
                  <li>Lazy loading with code splitting</li>
                  <li>Memoized components</li>
                  <li>Virtual scrolling ready</li>
                  <li>Optimized re-renders</li>
                </ul>
              </div>
              <div>
                <strong style={{ color: theme.text }}>Developer Experience</strong>
                <ul style={{ margin: '4px 0', paddingLeft: '20px' }}>
                  <li>Hot Module Replacement</li>
                  <li>TypeScript strict mode</li>
                  <li>ESLint + Prettier</li>
                  <li>Comprehensive testing</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Development Guide',
      content: (
        <div>
          <h4 style={{ marginBottom: '16px' }}>Getting Started</h4>
          <div style={{
            backgroundColor: theme.surface,
            border: `1px solid ${theme.border}`,
            borderRadius: '4px',
            padding: '16px',
            marginBottom: '16px'
          }}>
            <h5 style={{ color: theme.primary, marginBottom: '12px' }}>Development Commands</h5>
            <pre style={{
              backgroundColor: theme.background,
              padding: '12px',
              borderRadius: '4px',
              fontSize: '12px',
              overflow: 'auto',
              color: theme.text,
              margin: 0
            }}>
{`# Install dependencies
npm install

# Start development server
npm run dev              # http://localhost:3500

# Run with debugging
npm run dev:debug        # Chrome DevTools enabled

# Testing
npm test                 # Run tests
npm run test:ui          # Vitest UI
npm run test:coverage    # Coverage report

# Build
npm run build            # Production build
npm run build:analyze    # Bundle analysis

# Code quality
npm run lint             # ESLint
npm run type-check       # TypeScript`}
            </pre>
          </div>
          <div style={{
            backgroundColor: theme.surface,
            border: `1px solid ${theme.border}`,
            borderRadius: '4px',
            padding: '16px'
          }}>
            <h5 style={{ color: theme.primary, marginBottom: '12px' }}>Adding a New Theme</h5>
            <pre style={{
              backgroundColor: theme.background,
              padding: '12px',
              borderRadius: '4px',
              fontSize: '12px',
              overflow: 'auto',
              color: theme.text,
              margin: 0
            }}>
{`// src/theme/themes.ts
export const themes: Record<string, Theme> = {
  // ... existing themes
  'my-theme': {
    name: 'My Theme',
    primary: '#color',
    secondary: '#color',
    accent: '#color',
    background: '#color',
    surface: '#color',
    surfaceAlt: '#color',
    text: '#color',
    textSecondary: '#color',
    textTertiary: '#color',
    border: '#color',
    borderLight: '#color',
    success: GZC_GREEN.base,
    danger: '#color',
    warning: '#color',
    info: '#color',
    muted: '#color',
    gradient: 'linear-gradient(...)',
    headerColor: '#color',
    shadows: { /* shadow config */ },
    ...sharedConfig
  }
}`}
            </pre>
          </div>
        </div>
      )
    }
  ];

  useEffect(() => {
    // Load Mermaid library
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js';
    script.async = true;
    script.onload = () => {
      // Simple theme detection
      const isDarkTheme = !theme.name.includes('Light') && 
                         theme.name !== 'Arctic' && 
                         theme.name !== 'Parchment' && 
                         theme.name !== 'Pearl';
      
      // Use mermaid's built-in themes
      window.mermaid.initialize({ 
        startOnLoad: true,
        theme: isDarkTheme ? 'dark' : 'default',
        securityLevel: 'loose'
      });
      setMermaidLoaded(true);
    };
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [theme]);

  // Simple re-render when theme changes
  useEffect(() => {
    if (mermaidLoaded && window.mermaid) {
      // Simple theme detection
      const isDarkTheme = !theme.name.includes('Light') && 
                         theme.name !== 'Arctic' && 
                         theme.name !== 'Parchment' && 
                         theme.name !== 'Pearl';
      
      // Re-initialize with correct theme
      window.mermaid.initialize({ 
        startOnLoad: true,
        theme: isDarkTheme ? 'dark' : 'default',
        securityLevel: 'loose'
      });
      
      // Trigger re-render
      setTimeout(() => {
        if (window.mermaid.contentLoaded) {
          window.mermaid.contentLoaded();
        }
      }, 200);
    }
  }, [mermaidLoaded, theme.name]);

  return (
    <div style={{
      minHeight: 'calc(100vh - 120px)',
      padding: '20px',
      color: theme.text
    }}>
      <h1 style={{
        fontSize: theme.typography.h1.fontSize,
        fontWeight: theme.typography.h1.fontWeight,
        marginBottom: '24px',
        color: theme.text
      }}>
        GZC Intel App - Documentation
      </h1>

      <div style={{
        display: 'flex',
        gap: '20px',
        height: 'calc(100vh - 200px)'
      }}>
        {/* Navigation */}
        <div style={{
          width: '250px',
          backgroundColor: theme.surface,
          borderRadius: '4px',
          border: `1px solid ${theme.border}`,
          padding: '12px',
          overflow: 'auto'
        }}>
          <h3 style={{
            fontSize: theme.typography.h3.fontSize,
            fontWeight: theme.typography.h3.fontWeight,
            marginBottom: '12px',
            color: theme.textSecondary
          }}>
            Table of Contents
          </h3>
          {sections.map((section, index) => (
            <div
              key={index}
              onClick={() => setActiveSection(index)}
              style={{
                padding: '8px 12px',
                marginBottom: '4px',
                borderRadius: '2px',
                cursor: 'pointer',
                backgroundColor: activeSection === index 
                  ? theme.name.includes('Light') || theme.name === 'Arctic' || theme.name === 'Parchment' || theme.name === 'Pearl'
                    ? 'rgba(0, 0, 0, 0.05)'
                    : 'rgba(255, 255, 255, 0.05)'
                  : 'transparent',
                borderLeft: activeSection === index ? `3px solid ${theme.primary}` : '3px solid transparent',
                transition: 'all 0.2s ease',
                color: activeSection === index ? theme.primary : theme.text
              }}
              onMouseEnter={(e) => {
                if (activeSection !== index) {
                  e.currentTarget.style.backgroundColor = theme.name.includes('Light') || theme.name === 'Arctic' || theme.name === 'Parchment' || theme.name === 'Pearl'
                    ? 'rgba(0, 0, 0, 0.02)'
                    : 'rgba(255, 255, 255, 0.02)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeSection !== index) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              {section.title}
            </div>
          ))}
        </div>

        {/* Content */}
        <div style={{
          flex: 1,
          backgroundColor: theme.surface,
          borderRadius: '4px',
          border: `1px solid ${theme.border}`,
          padding: '24px',
          overflow: 'auto'
        }}>
          <h2 style={{
            fontSize: theme.typography.h2.fontSize,
            fontWeight: theme.typography.h2.fontWeight,
            marginBottom: '16px',
            color: theme.text
          }}>
            {sections[activeSection].title}
          </h2>
          <div style={{
            fontSize: theme.typography.body.fontSize,
            lineHeight: 1.6
          }}>
            {sections[activeSection].content}
          </div>
        </div>
      </div>

      <div style={{
        marginTop: '24px',
        padding: '12px',
        backgroundColor: theme.surface,
        borderRadius: '4px',
        border: `1px solid ${theme.border}`,
        textAlign: 'center',
        fontSize: theme.typography.bodySmall.fontSize,
        color: theme.textSecondary
      }}>
        Last Updated: {new Date().toLocaleDateString()} | Version: 1.0.0 | Theme: {theme.name}
      </div>
    </div>
  );
};