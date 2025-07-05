import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

// Alex's modular structure
import { ThemeProvider as AlexThemeProvider, DateProvider, QuoteProvider, AuthContext } from './modules/ui-library'
// Our core providers
import { ThemeProvider } from './core/theme'
import { GridProvider } from './core/layout'
import { TabLayoutProvider, TabBar } from './core/tabs'
import { EnhancedComponentLoader } from './core/tabs/EnhancedComponentLoader'
import { MarketIntelPanel } from './components/MarketIntelPanel'
import { UserProvider } from './contexts/UserContext'
// Header removed - TabBar now includes all header functionality

import './styles/globals.css'
import './styles/quantum.css'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

function App() {
  // Remove any data-theme attributes to use quantum theme only
  document.documentElement.removeAttribute('data-theme')

  return (
    <UserProvider>
      <ThemeProvider>
        <GridProvider>
          <TabLayoutProvider>
            <AlexThemeProvider>
              <AuthContext.Provider value={{ getToken: async () => "mock-token" }}>
                <DateProvider>
                  <QuoteProvider>
                    <Router>
                    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#0a0a0a', color: 'rgba(248, 246, 240, 0.9)' }}>
                      {/* Tab Bar with integrated header - single line */}
                      <TabBar />
                      
                      {/* Main Layout with Market Intel Panel */}
                      <div className="flex flex-1 overflow-hidden" style={{ paddingBottom: '40px' }}>
                        {/* Market Intel Panel - Left side */}
                        <MarketIntelPanel />
                        
                        {/* Main Content Area - Right side */}
                        <main className="flex-1 overflow-hidden" style={{ backgroundColor: '#0a0a0a' }}>
                          <EnhancedComponentLoader />
                        </main>
                      </div>
                      
                      {/* Next-Gen Status Bar - matching PMS NextGen */}
                      <div style={{
                        position: "fixed",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        backgroundColor: "rgba(26, 26, 26, 0.93)",
                        borderTop: "1px solid #3a3a3a",
                        padding: "6px 16px",
                        fontSize: "12px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        height: "40px",
                        zIndex: 1000,
                        backdropFilter: "blur(12px)"
                      }}>
                        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                          <span style={{ color: "#ABD38F" }}>● All Systems Operational</span>
                          <span>Latency: 8ms</span>
                          <span>AI Models: 12/12 Online</span>
                          <span>Blockchain Sync: 100%</span>
                          <span>Layout: LG</span>
                        </div>
                        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                          <span>Gas: 45 gwei</span>
                          <span>BTC: $67,234</span>
                          <span>ETH: $3,456</span>
                          <span style={{ color: "#b0b0b0" }}>
                            24h P&L: <span style={{ color: "#ABD38F" }}>
                              +$12,497.97
                            </span>
                          </span>
                        </div>
                      </div>
                      
                      {/* Debug Panel removed */}
                    </div>
                  </Router>
                </QuoteProvider>
              </DateProvider>
            </AuthContext.Provider>
          </AlexThemeProvider>
        </TabLayoutProvider>
      </GridProvider>
    </ThemeProvider>
    </UserProvider>
  )
}

export default App