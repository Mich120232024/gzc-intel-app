import { ComponentType } from 'react'
import { loadComponentWithMetadata, getComponentMetadata } from './enhancedComponentRegistry'

// Component registry for dynamic imports with metadata injection
export const componentRegistry: Record<string, () => Promise<{ default: ComponentType<any> }>> = {
  // Portfolio only - empty
  Portfolio: () => import('../../components/EmptyPortfolio').then(m => ({ default: m.EmptyPortfolio })),
  // Analytics dashboard
  Analytics: () => import('../../components/analytics/AnalyticsDashboardExample').then(m => ({ default: m.AnalyticsDashboardExample }))
}

// Component names mapping
export const COMPONENT_NAMES: Record<string, string> = {
  Portfolio: 'Portfolio',
  Analytics: 'Analytics'
}

// Helper function to register new components dynamically
export function registerComponent(
  id: string, 
  loader: () => Promise<{ default: ComponentType<any> }>
) {
  componentRegistry[id] = loader
}

// Helper function to check if a component is registered
export function isComponentRegistered(id: string): boolean {
  return id in componentRegistry
}

// Helper function to get all registered components
export function getRegisteredComponents(): string[] {
  return Object.keys(componentRegistry)
}