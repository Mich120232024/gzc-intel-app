import React from 'react'
import { quantumTheme } from '../theme/quantum'

export const MarketIntelPanel = () => {
  return (
    <div style={{
      width: '300px',
      height: '100%',
      backgroundColor: '#0f0f0f',
      borderRight: `1px solid ${quantumTheme.border}`,
      padding: '16px',
      overflowY: 'auto'
    }}>
      <h3 style={{
        fontSize: '14px',
        fontWeight: 600,
        color: '#ABD38F',
        marginBottom: '16px',
        letterSpacing: '0.5px'
      }}>
        Market Intel
      </h3>
      
      {/* Placeholder sections */}
      <div style={{ marginBottom: '24px' }}>
        <h4 style={{
          fontSize: '12px',
          fontWeight: 500,
          color: quantumTheme.textSecondary,
          marginBottom: '8px'
        }}>
          Watchlist
        </h4>
        <div style={{ color: quantumTheme.textTertiary, fontSize: '11px' }}>
          No items in watchlist
        </div>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <h4 style={{
          fontSize: '12px',
          fontWeight: 500,
          color: quantumTheme.textSecondary,
          marginBottom: '8px'
        }}>
          Recent Activity
        </h4>
        <div style={{ color: quantumTheme.textTertiary, fontSize: '11px' }}>
          No recent activity
        </div>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <h4 style={{
          fontSize: '12px',
          fontWeight: 500,
          color: quantumTheme.textSecondary,
          marginBottom: '8px'
        }}>
          Market Overview
        </h4>
        <div style={{ color: quantumTheme.textTertiary, fontSize: '11px' }}>
          Loading market data...
        </div>
      </div>
    </div>
  )
}