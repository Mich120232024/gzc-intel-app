import React from 'react'
import { quantumTheme } from '../theme/quantum'

export const Dashboard: React.FC = () => {
  return (
    <div style={{
      padding: quantumTheme.spacing.lg,
      backgroundColor: quantumTheme.background,
      minHeight: '100%'
    }}>
      <h1 style={quantumTheme.typography.h1}>Dashboard</h1>
      <p style={quantumTheme.typography.body}>Main dashboard view</p>
    </div>
  )
}

export default Dashboard