import React from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'
import { motion } from 'framer-motion'
import { quantumTheme } from '../theme/quantum'
import { FeatherIcon } from './icons/FeatherIcon'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

const ResponsiveGridLayout = WidthProvider(Responsive)

export function CleanDashboard() {
  const [layouts, setLayouts] = React.useState({})
  const [portfolioValue] = React.useState(2453932.42)
  const [dailyPnL] = React.useState(12497.97)
  const [monthlyPnL] = React.useState(45892.15)

  const defaultLayout = [
    { i: 'portfolio-summary', x: 0, y: 0, w: 6, h: 3, minW: 3, minH: 2 },
    { i: 'pnl-metrics', x: 6, y: 0, w: 6, h: 3, minW: 3, minH: 2 },
    { i: 'market-status', x: 0, y: 3, w: 4, h: 2, minW: 2, minH: 2 },
    { i: 'quick-actions', x: 4, y: 3, w: 8, h: 2, minW: 4, minH: 2 }
  ]

  return (
    <div style={{ 
      height: '100%', 
      width: '100%',
      background: quantumTheme.background,
      padding: '16px'
    }}>
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        onLayoutChange={(layout, layouts) => setLayouts(layouts)}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={60}
        isDraggable={true}
        isResizable={true}
      >
        {/* Portfolio Summary */}
        <div key="portfolio-summary" data-grid={defaultLayout[0]}>
          <motion.div
            whileHover={{ boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}
            style={{
              height: '100%',
              background: quantumTheme.surface,
              border: `1px solid ${quantumTheme.border}`,
              borderRadius: '8px',
              padding: '16px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <FeatherIcon name="briefcase" size={16} color={quantumTheme.primary} />
              <h3 style={{ fontSize: '14px', fontWeight: '600', color: quantumTheme.text, margin: 0 }}>
                Portfolio Value
              </h3>
            </div>
            <div style={{ fontSize: '28px', fontWeight: '700', color: quantumTheme.text }}>
              ${portfolioValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div style={{ fontSize: '12px', color: quantumTheme.success, marginTop: '4px' }}>
              <FeatherIcon name="trending-up" size={12} /> +2.34% today
            </div>
          </motion.div>
        </div>

        {/* P&L Metrics */}
        <div key="pnl-metrics" data-grid={defaultLayout[1]}>
          <motion.div
            whileHover={{ boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}
            style={{
              height: '100%',
              background: quantumTheme.surface,
              border: `1px solid ${quantumTheme.border}`,
              borderRadius: '8px',
              padding: '16px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <FeatherIcon name="bar-chart-2" size={16} color={quantumTheme.primary} />
              <h3 style={{ fontSize: '14px', fontWeight: '600', color: quantumTheme.text, margin: 0 }}>
                P&L Summary
              </h3>
            </div>
            <div style={{ display: 'grid', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '12px', color: quantumTheme.textSecondary }}>Daily P&L</span>
                <span style={{ fontSize: '12px', fontWeight: '600', color: dailyPnL > 0 ? quantumTheme.success : quantumTheme.danger }}>
                  {dailyPnL > 0 ? '+' : ''}${Math.abs(dailyPnL).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '12px', color: quantumTheme.textSecondary }}>Monthly P&L</span>
                <span style={{ fontSize: '12px', fontWeight: '600', color: monthlyPnL > 0 ? quantumTheme.success : quantumTheme.danger }}>
                  {monthlyPnL > 0 ? '+' : ''}${Math.abs(monthlyPnL).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Market Status */}
        <div key="market-status" data-grid={defaultLayout[2]}>
          <motion.div
            whileHover={{ boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}
            style={{
              height: '100%',
              background: quantumTheme.surface,
              border: `1px solid ${quantumTheme.border}`,
              borderRadius: '8px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: quantumTheme.success,
                animation: 'pulse 2s infinite'
              }} />
              <span style={{ fontSize: '12px', fontWeight: '600', color: quantumTheme.text }}>
                Markets Open
              </span>
            </div>
            <div style={{ fontSize: '11px', color: quantumTheme.textSecondary, marginTop: '4px' }}>
              NYSE, NASDAQ, FOREX
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <div key="quick-actions" data-grid={defaultLayout[3]}>
          <motion.div
            whileHover={{ boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}
            style={{
              height: '100%',
              background: quantumTheme.surface,
              border: `1px solid ${quantumTheme.border}`,
              borderRadius: '8px',
              padding: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            <button style={{
              padding: '8px 16px',
              background: quantumTheme.primary,
              border: 'none',
              borderRadius: '6px',
              color: 'white',
              fontSize: '12px',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <FeatherIcon name="plus" size={14} />
              New Trade
            </button>
            <button style={{
              padding: '8px 16px',
              background: 'transparent',
              border: `1px solid ${quantumTheme.border}`,
              borderRadius: '6px',
              color: quantumTheme.text,
              fontSize: '12px',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <FeatherIcon name="eye" size={14} />
              View Portfolio
            </button>
            <button style={{
              padding: '8px 16px',
              background: 'transparent',
              border: `1px solid ${quantumTheme.border}`,
              borderRadius: '6px',
              color: quantumTheme.text,
              fontSize: '12px',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <FeatherIcon name="download" size={14} />
              Export
            </button>
          </motion.div>
        </div>
      </ResponsiveGridLayout>

      <style>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}

export default CleanDashboard