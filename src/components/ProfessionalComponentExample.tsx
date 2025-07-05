import React, { useState, useEffect, useCallback } from 'react'
import { ComponentContract, ComponentCapabilities, ComponentMetadata, ComponentLifecycle, DataContract, ComponentConfig } from '../core/contracts/ComponentContract'
import { quantumTheme } from '../theme/quantum'

/**
 * PROFESSIONAL COMPONENT EXAMPLE
 * 
 * Demonstrates complete contract implementation
 * Shows how content-agnostic components should be built
 */

interface ProfessionalComponentProps {
  width?: number
  height?: number
  data?: any
  config?: Record<string, any>
  onDataChange?: (data: any) => void
  onError?: (error: Error) => void
}

// Component implementation
export const ProfessionalComponentExample: React.FC<ProfessionalComponentProps> = ({
  width = 400,
  height = 300,
  data,
  config = {},
  onDataChange,
  onError
}) => {
  const [isInitialized, setIsInitialized] = useState(false)
  const [componentData, setComponentData] = useState(data)
  const [performanceMetrics, setPerformanceMetrics] = useState({
    renderTime: 0,
    memoryUsage: 0,
    dataFreshness: Date.now()
  })

  // Lifecycle implementation
  const initialize = useCallback(async () => {
    try {
      console.log('🔧 Initializing Professional Component')
      await new Promise(resolve => setTimeout(resolve, 100)) // Simulate async init
      setIsInitialized(true)
    } catch (error) {
      onError?.(error as Error)
    }
  }, [onError])

  const onMount = useCallback(async () => {
    console.log('📦 Professional Component mounted')
  }, [])

  const onResize = useCallback(async (newWidth: number, newHeight: number) => {
    console.log(`📏 Resizing to ${newWidth}x${newHeight}`)
  }, [])

  const onUnmount = useCallback(async () => {
    console.log('🗑️ Professional Component unmounting')
  }, [])

  const handleError = useCallback(async (error: Error) => {
    console.error('❌ Component error:', error)
    onError?.(error)
  }, [onError])

  // Initialize on mount
  useEffect(() => {
    initialize()
    onMount()
    
    return () => {
      onUnmount()
    }
  }, [initialize, onMount, onUnmount])

  // Handle resize
  useEffect(() => {
    onResize(width, height)
  }, [width, height, onResize])

  // Handle data updates
  useEffect(() => {
    if (data !== componentData) {
      setComponentData(data)
      setPerformanceMetrics(prev => ({
        ...prev,
        dataFreshness: Date.now()
      }))
      onDataChange?.(data)
    }
  }, [data, componentData, onDataChange])

  // Performance monitoring
  useEffect(() => {
    const startTime = performance.now()
    
    return () => {
      const renderTime = performance.now() - startTime
      setPerformanceMetrics(prev => ({
        ...prev,
        renderTime,
        memoryUsage: (performance as any).memory?.usedJSHeapSize || 0
      }))
    }
  })

  if (!isInitialized) {
    return (
      <div style={{
        width,
        height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: quantumTheme.surface,
        border: `1px solid ${quantumTheme.border}`,
        borderRadius: quantumTheme.borderRadius.md
      }}>
        <div style={{ color: quantumTheme.textSecondary }}>
          🔄 Initializing...
        </div>
      </div>
    )
  }

  return (
    <div style={{
      width,
      height,
      backgroundColor: quantumTheme.surface,
      border: `1px solid ${quantumTheme.border}`,
      borderRadius: quantumTheme.borderRadius.md,
      padding: quantumTheme.spacing.md,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: quantumTheme.spacing.sm,
        borderBottom: `1px solid ${quantumTheme.borderLight}`,
        paddingBottom: quantumTheme.spacing.sm
      }}>
        <h3 style={{
          ...quantumTheme.typography.h2,
          color: quantumTheme.text,
          margin: 0
        }}>
          Professional Component
        </h3>
        <div style={{
          backgroundColor: quantumTheme.success,
          color: quantumTheme.background,
          padding: '2px 6px',
          borderRadius: quantumTheme.borderRadius.sm,
          fontSize: '10px',
          fontWeight: '500'
        }}>
          v1.0.0
        </div>
      </div>

      {/* Content Area */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: quantumTheme.spacing.sm
      }}>
        {/* Configuration Display */}
        <div style={{
          backgroundColor: quantumTheme.background,
          padding: quantumTheme.spacing.sm,
          borderRadius: quantumTheme.borderRadius.sm,
          border: `1px solid ${quantumTheme.borderLight}`
        }}>
          <div style={{
            ...quantumTheme.typography.label,
            color: quantumTheme.textSecondary,
            marginBottom: '4px'
          }}>
            CONFIGURATION
          </div>
          <div style={{
            ...quantumTheme.typography.bodySmall,
            color: quantumTheme.text
          }}>
            Theme: {config.theme || 'quantum'} | 
            Mode: {config.mode || 'standalone'} |
            Features: {Object.keys(config).length}
          </div>
        </div>

        {/* Data Display */}
        <div style={{
          backgroundColor: quantumTheme.background,
          padding: quantumTheme.spacing.sm,
          borderRadius: quantumTheme.borderRadius.sm,
          border: `1px solid ${quantumTheme.borderLight}`,
          flex: 1
        }}>
          <div style={{
            ...quantumTheme.typography.label,
            color: quantumTheme.textSecondary,
            marginBottom: '4px'
          }}>
            DATA CONTRACT
          </div>
          <div style={{
            ...quantumTheme.typography.bodySmall,
            color: quantumTheme.text
          }}>
            {componentData ? (
              <>
                Type: {typeof componentData} | 
                Size: {JSON.stringify(componentData).length} bytes |
                Fresh: {Math.round((Date.now() - performanceMetrics.dataFreshness) / 1000)}s ago
              </>
            ) : (
              'No data provided'
            )}
          </div>
        </div>

        {/* Performance Metrics */}
        <div style={{
          backgroundColor: quantumTheme.background,
          padding: quantumTheme.spacing.sm,
          borderRadius: quantumTheme.borderRadius.sm,
          border: `1px solid ${quantumTheme.borderLight}`
        }}>
          <div style={{
            ...quantumTheme.typography.label,
            color: quantumTheme.textSecondary,
            marginBottom: '4px'
          }}>
            PERFORMANCE
          </div>
          <div style={{
            ...quantumTheme.typography.bodySmall,
            color: quantumTheme.text
          }}>
            Render: {performanceMetrics.renderTime.toFixed(2)}ms |
            Memory: {(performanceMetrics.memoryUsage / 1024 / 1024).toFixed(1)}MB |
            Size: {width}×{height}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        marginTop: quantumTheme.spacing.sm,
        paddingTop: quantumTheme.spacing.sm,
        borderTop: `1px solid ${quantumTheme.borderLight}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{
          ...quantumTheme.typography.bodyTiny,
          color: quantumTheme.textTertiary
        }}>
          Professional Contract v1.0
        </div>
        <div style={{
          ...quantumTheme.typography.bodyTiny,
          color: quantumTheme.success
        }}>
          ✅ Contract Compliant
        </div>
      </div>
    </div>
  )
}

// Contract implementation
const metadata: ComponentMetadata = {
  id: 'professional-component-example',
  name: 'ProfessionalComponentExample',
  displayName: 'Professional Component Example',
  version: '1.0.0',
  category: 'docs',
  description: 'Example component demonstrating complete contract implementation',
  icon: 'package',
  tags: ['example', 'professional', 'contract', 'demo'],
  author: 'GZC Intel Team',
  license: 'MIT',
  lastUpdated: '2025-07-05'
}

const capabilities: ComponentCapabilities = {
  sizing: {
    minWidth: 300,
    minHeight: 200,
    maxWidth: 'unlimited',
    maxHeight: 'unlimited',
    aspectRatio: 'free',
    resizable: true,
    responsive: true
  },
  modes: {
    standalone: true,
    widget: true,
    embedded: true,
    modal: false
  },
  data: {
    realTime: false,
    historical: false,
    userSpecific: false,
    external: false,
    cached: true
  },
  performance: {
    renderComplexity: 'low',
    memoryUsage: 'light',
    cpuIntensive: false,
    networkIntensive: false
  },
  layout: {
    scrollable: false,
    fixedPosition: false,
    overlay: false
  }
}

const lifecycle: ComponentLifecycle = {
  initialize: async () => {
    console.log('Professional component initialized')
  },
  onMount: async () => {
    console.log('Professional component mounted')
  },
  onResize: async (width: number, height: number) => {
    console.log(`Professional component resized: ${width}x${height}`)
  },
  onUnmount: async () => {
    console.log('Professional component unmounted')
  },
  onError: async (error: Error) => {
    console.error('Professional component error:', error)
  }
}

const dataContract: DataContract = {
  inputs: [
    {
      id: 'config',
      name: 'Configuration',
      type: 'object',
      required: false,
      description: 'Component configuration object',
      defaultValue: {}
    },
    {
      id: 'data',
      name: 'Component Data',
      type: 'object',
      required: false,
      description: 'Data to display in component'
    }
  ],
  outputs: [
    {
      id: 'dataChange',
      name: 'Data Change Event',
      type: 'object',
      required: false,
      description: 'Emitted when component data changes'
    },
    {
      id: 'error',
      name: 'Error Event',
      type: 'object',
      required: false,
      description: 'Emitted when component encounters an error'
    }
  ]
}

const config: ComponentConfig = {
  settings: {
    theme: {
      type: 'select',
      default: 'quantum',
      options: ['quantum', 'dark', 'light'],
      description: 'Component theme'
    },
    mode: {
      type: 'select',
      default: 'standalone',
      options: ['standalone', 'widget', 'embedded'],
      description: 'Component display mode'
    },
    showPerformance: {
      type: 'boolean',
      default: true,
      description: 'Show performance metrics'
    }
  },
  theme: {
    customizable: true,
    properties: ['--primary-color', '--background-color', '--text-color']
  }
}

// Export the complete contract
export const ProfessionalComponentContract: ComponentContract = {
  metadata,
  capabilities,
  lifecycle,
  dataContract,
  config,
  
  validateProps: (props: any) => {
    const errors: string[] = []
    
    if (props.width && (typeof props.width !== 'number' || props.width < 100)) {
      errors.push('Width must be a number >= 100')
    }
    
    if (props.height && (typeof props.height !== 'number' || props.height < 100)) {
      errors.push('Height must be a number >= 100')
    }
    
    return {
      valid: errors.length === 0,
      errors
    }
  },
  
  validateData: (data: any) => {
    // Data validation logic here
    return { valid: true, errors: [] }
  },
  
  getPerformanceMetrics: () => {
    return {
      renderTime: performance.now(),
      memoryUsage: (performance as any).memory?.usedJSHeapSize || 0,
      dataFreshness: Date.now()
    }
  }
}

export default ProfessionalComponentExample