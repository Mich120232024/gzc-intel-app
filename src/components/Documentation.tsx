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

// Mermaid component for rendering diagrams
const MermaidDiagram: React.FC<{ chart: string; id: string }> = ({ chart, id }) => {
  const { currentTheme: theme } = useTheme();
  const [isRendered, setIsRendered] = useState(false);
  
  useEffect(() => {
    if (window.mermaid && !isRendered) {
      setTimeout(() => {
        try {
          window.mermaid.contentLoaded();
          setIsRendered(true);
        } catch (e) {
          console.error('Mermaid render error:', e);
        }
      }, 100);
    }
  }, [isRendered]);
  
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
      <pre className="mermaid" style={{ background: 'transparent', margin: 0 }}>
        {chart}
      </pre>
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
            chart={`flowchart TB
    subgraph frontend ["Frontend - Port 3500"]
        UI["React + TypeScript<br/>Vite Dev Server"]
        Theme["Theme System<br/>11 Professional Themes"]
        Tabs["Tab Management<br/>Dynamic Components"]
        DnD["React Grid Layout<br/>Drag & Drop"]
    end
    
    subgraph features ["Core Features"]
        Header["Professional Header<br/>P&L Display"]
        Intel["Market Intel Panel<br/>AI Agents"]
        Docs["Documentation<br/>Mermaid Diagrams"]
        Analytics["Analytics Tab<br/>Ready for Widgets"]
    end
    
    subgraph state ["State Management"]
        Context["React Context<br/>Theme Provider"]
        Local["LocalStorage<br/>Persistence"]
        Memory["View Memory<br/>Dual System"]
        Inspector["Memory Inspector<br/>Dev Tools"]
    end
    
    UI --> Theme
    UI --> Tabs
    UI --> DnD
    
    Theme --> features
    Tabs --> features
    
    Theme --> Context
    Context --> Local
    Context --> Memory
    Memory --> Inspector
    
    style frontend fill:#1A1A1A,stroke:#7A9E65,color:#F0F0F0
    style features fill:#2A2A2A,stroke:#95BD78,color:#E0E0E0
    style state fill:#142236,stroke:#4db8e8,color:#FFFFFF`}
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
            chart={`flowchart TD
    subgraph dark ["Dark Themes"]
        GD["GZC Dark<br/>Institutional"]
        AD["Analytics Dark<br/>Data Viz"]
        TG["Terminal Green<br/>Bloomberg Style"]
        TO["Trading Operations<br/>High Contrast"]
        MT["Midnight Trading<br/>Ultra Dark"]
        QA["Quantum Analytics<br/>Gradient"]
        PR["Professional<br/>Sea Blue"]
    end
    
    subgraph light ["Light Themes"]
        GL["GZC Light<br/>Clean Professional"]
        AR["Arctic<br/>Cool Blue-Grey"]
        PA["Parchment<br/>Warm Silver"]
        PE["Pearl<br/>Steel Blue"]
    end
    
    subgraph features ["Theme System"]
        TP["Theme Provider"]
        LS["LocalStorage<br/>Persistence"]
        CV["CSS Variables<br/>Instant Switch"]
        VM["View Memory<br/>Dual System"]
    end
    
    TP --> dark
    TP --> light
    TP --> LS
    TP --> CV
    TP --> VM
    
    style dark fill:#2A2A2A,stroke:#7A9E65,color:#E0E0E0
    style light fill:#F8F9FA,stroke:#5B7C4B,color:#1F2937
    style features fill:#1A1A1A,stroke:#95BD78,color:#F0F0F0`}
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
            chart={`flowchart TD
    App["App.tsx<br/>Entry Point"]
    
    subgraph providers ["Provider Layer"]
        TP["ThemeProvider"]
        TLP["TabLayoutProvider"]
        EB["ErrorBoundary"]
        VM["ViewMemory<br/>Hook"]
    end
    
    subgraph core ["Core Components"]
        PH["ProfessionalHeader<br/>Logo, Tabs, P&L"]
        MIP["MarketIntelPanel<br/>AI Agents, Alerts"]
        TC["TabContainer<br/>Content Area"]
    end
    
    subgraph tabs ["Tab Components"]
        AT["Analytics Tab<br/>Empty State"]
        DT["Documentation Tab<br/>This Page"]
    end
    
    App --> providers
    TP --> TLP
    TLP --> EB
    EB --> core
    VM --> TP
    
    core --> tabs
    PH --> tabs
    TC --> AT
    TC --> DT
    
    style providers fill:#1A1A1A,stroke:#7A9E65,color:#F0F0F0
    style core fill:#2A2A2A,stroke:#95BD78,color:#E0E0E0
    style tabs fill:#3A3A3A,stroke:#ABD38F,color:#FFFFFF`}
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
      const isDarkTheme = !theme.name.includes('Light') && 
                         theme.name !== 'Arctic' && 
                         theme.name !== 'Parchment' && 
                         theme.name !== 'Pearl';
      
      window.mermaid.initialize({ 
        startOnLoad: true,
        theme: 'base',
        themeVariables: {
          // Primary colors
          primaryColor: theme.surface,
          primaryTextColor: theme.text,
          primaryBorderColor: theme.primary,
          
          // Background colors
          background: theme.surface,
          mainBkg: theme.surface,
          secondBkg: theme.surfaceAlt,
          tertiaryBkg: theme.background,
          
          // Border colors
          nodeBorder: theme.border,
          clusterBorder: theme.border,
          edgeLabelBackground: theme.surface,
          
          // Text colors
          textColor: theme.text,
          labelTextColor: theme.text,
          
          // Node colors
          nodeTextColor: theme.text,
          
          // Line colors
          lineColor: theme.border,
          
          // Font
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: '14px',
          
          // Dark mode
          darkMode: isDarkTheme,
          
          // Cluster
          clusterBkg: theme.surfaceAlt,
          defaultLinkColor: theme.border
        }
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

  // Re-render Mermaid diagrams when section or theme changes
  useEffect(() => {
    if (mermaidLoaded && window.mermaid) {
      // Remove old SVGs
      document.querySelectorAll('.mermaid svg').forEach(el => el.remove());
      
      // Clear mermaid internal state
      if (window.mermaid.mermaidAPI && window.mermaid.mermaidAPI.reset) {
        window.mermaid.mermaidAPI.reset();
      }
      
      // Force re-initialization with current theme
      const isDarkTheme = !theme.name.includes('Light') && 
                         theme.name !== 'Arctic' && 
                         theme.name !== 'Parchment' && 
                         theme.name !== 'Pearl';
      
      window.mermaid.initialize({ 
        startOnLoad: true,
        theme: 'base',
        themeVariables: {
          primaryColor: theme.surface,
          primaryTextColor: theme.text,
          primaryBorderColor: theme.primary,
          background: theme.surface,
          mainBkg: theme.surface,
          secondBkg: theme.surfaceAlt,
          tertiaryBkg: theme.background,
          nodeBorder: theme.border,
          clusterBorder: theme.border,
          edgeLabelBackground: theme.surface,
          textColor: theme.text,
          labelTextColor: theme.text,
          nodeTextColor: theme.text,
          lineColor: theme.border,
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: '14px',
          darkMode: isDarkTheme,
          clusterBkg: theme.surfaceAlt,
          defaultLinkColor: theme.border
        }
      });
      
      // Trigger re-render with delay
      setTimeout(() => {
        window.mermaid.contentLoaded();
      }, 100);
    }
  }, [activeSection, mermaidLoaded, theme]);

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