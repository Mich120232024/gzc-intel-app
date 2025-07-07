import React, { useState, useEffect } from 'react'
import { useTheme } from '../../contexts/ThemeContext'
import { componentInventory } from '../../core/components/ComponentInventory'

interface ComponentRendererProps {
  componentId: string
  instanceId: string
  props?: Record<string, any>
  isEditMode: boolean
  onRemove: () => void
  onPropsUpdate?: (props: Record<string, any>) => void
}

// Map component IDs to actual components
const componentMap: Record<string, () => Promise<any>> = {
  'price-ticker': () => import('../widgets/PriceTicker').then(m => m.PriceTicker),
  'simple-chart': () => import('../widgets/SimpleChart').then(m => m.SimpleChart),
  // Add more component mappings here as we create them
}

export const ComponentRenderer: React.FC<ComponentRendererProps> = ({
  componentId,
  instanceId,
  props = {},
  isEditMode,
  onRemove
}) => {
  const { currentTheme } = useTheme()
  const [Component, setComponent] = useState<React.ComponentType<any> | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const meta = componentInventory.getComponent(componentId)

  useEffect(() => {
    const loadComponent = async () => {
      try {
        setLoading(true)
        setError(null)

        if (componentMap[componentId]) {
          const LoadedComponent = await componentMap[componentId]()
          setComponent(() => LoadedComponent)
        } else {
          setError(`No component mapping for: ${componentId}`)
        }
      } catch (err) {
        console.error(`Failed to load component ${componentId}:`, err)
        setError(`Failed to load component: ${err}`)
      } finally {
        setLoading(false)
      }
    }

    loadComponent()
  }, [componentId])

  // Component not found in inventory
  if (!meta) {
    return (
      <div style={{
        height: '100%',
        padding: '20px',
        backgroundColor: currentTheme.surface,
        border: `1px solid ${currentTheme.border}`,
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: currentTheme.textSecondary
      }}>
        Component not found: {componentId}
      </div>
    )
  }

  // Loading state
  if (loading) {
    return (
      <div style={{
        height: '100%',
        backgroundColor: currentTheme.surface,
        border: `1px solid ${currentTheme.border}`,
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: currentTheme.textSecondary
      }}>
        Loading {meta.displayName}...
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div style={{
        height: '100%',
        backgroundColor: currentTheme.surface,
        border: `1px solid ${currentTheme.border}`,
        borderRadius: '8px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        color: currentTheme.textSecondary
      }}>
        <div style={{ fontSize: '24px', opacity: 0.5 }}>⚠️</div>
        <div style={{ fontSize: '12px' }}>{error}</div>
      </div>
    )
  }

  // Render actual component if loaded
  if (Component) {
    return (
      <div style={{
        height: '100%',
        width: '100%',
        position: 'relative'
      }}>
        {isEditMode && (
          <button
            onClick={onRemove}
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              zIndex: 10,
              background: currentTheme.surface,
              border: `1px solid ${currentTheme.border}`,
              borderRadius: '4px',
              cursor: 'pointer',
              color: currentTheme.textSecondary,
              padding: '4px 8px',
              fontSize: '12px',
              opacity: 0.8,
              transition: 'opacity 0.2s ease'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '1' }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.8' }}
          >
            ×
          </button>
        )}
        <Component {...props} />
      </div>
    )
  }

  // Fallback placeholder (component not implemented yet)
  return (
    <div style={{
      height: '100%',
      width: '100%',
      backgroundColor: currentTheme.surface,
      border: `1px solid ${currentTheme.border}`,
      borderRadius: '8px',
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    }}>
      {/* Component Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: '8px',
        borderBottom: `1px solid ${currentTheme.border}`
      }}>
        <h4 style={{
          margin: 0,
          fontSize: '14px',
          fontWeight: '600',
          color: currentTheme.text
        }}>
          {meta.displayName}
        </h4>
        
        {isEditMode && (
          <button
            onClick={onRemove}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: currentTheme.textSecondary,
              padding: '2px',
              borderRadius: '2px',
              fontSize: '14px'
            }}
          >
            ×
          </button>
        )}
      </div>

      {/* Component Content Placeholder */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '12px',
        color: currentTheme.textSecondary,
        fontSize: '12px'
      }}>
        <div style={{ fontSize: '32px', opacity: 0.3 }}>🚧</div>
        <div>{meta.description}</div>
        <div style={{ fontSize: '10px', opacity: 0.7 }}>
          Component implementation coming soon
        </div>
      </div>

      {/* Component Info */}
      <div style={{
        display: 'flex',
        gap: '4px',
        flexWrap: 'wrap'
      }}>
        {meta.tags.slice(0, 3).map(tag => (
          <span
            key={tag}
            style={{
              fontSize: '10px',
              padding: '2px 6px',
              backgroundColor: `${currentTheme.primary}20`,
              color: currentTheme.primary,
              borderRadius: '4px'
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}