import React, { ReactNode } from 'react'
import { quantumTheme } from '../theme/quantum'

interface TabContainerProps {
  children: ReactNode
  className?: string
}

/**
 * Content-agnostic tab container
 * Provides consistent styling without knowing about content
 */
export const TabContainer: React.FC<TabContainerProps> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div 
      className={`tab-container ${className}`}
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: quantumTheme.background,
        color: quantumTheme.text,
        padding: quantumTheme.spacing.md,
        overflow: 'auto'
      }}
    >
      {children}
    </div>
  )
}

export default TabContainer