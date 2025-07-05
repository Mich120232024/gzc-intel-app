import React from 'react'
import { quantumTheme } from '../theme/quantum'

/**
 * Empty tab placeholder component
 * Content-agnostic - just provides structure
 */
export const EmptyTab: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        color: quantumTheme.textSecondary,
        textAlign: 'center'
      }}
    >
      <div style={{ fontSize: '48px', marginBottom: quantumTheme.spacing.md }}>
        📊
      </div>
      <h3 style={quantumTheme.typography.h2}>
        Empty Tab
      </h3>
      <p style={quantumTheme.typography.body}>
        This tab is ready for content
      </p>
    </div>
  )
}

export default EmptyTab