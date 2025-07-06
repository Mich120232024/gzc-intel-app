import { ComponentType } from 'react'
import { loadComponentWithMetadata, getComponentMetadata } from './enhancedComponentRegistry'

// Component registry - Analytics and Documentation only
export const componentRegistry: Record<string, () => Promise<{ default: ComponentType<any> }>> = {
  // Analytics tab - ready for component selection
  Analytics: () => import('../../components/EmptyTab').then(m => ({ 
    default: () => m.EmptyTab({ title: 'Analytics' }) 
  })),
  // Documentation viewer
  Documentation: () => import('../../components/Documentation').then(m => ({ default: m.Documentation }))
}

// Component names mapping - Analytics and Documentation only
export const COMPONENT_NAMES: Record<string, string> = {
  Analytics: 'Analytics',
  Documentation: 'Documentation'
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