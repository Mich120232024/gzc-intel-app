import { ComponentType } from 'react'
import { loadComponentWithMetadata, getComponentMetadata } from './enhancedComponentRegistry'

// Component registry - Analytics, Documentation and User Tab Container
export const componentRegistry: Record<string, () => Promise<{ default: ComponentType<any> }>> = {
  // Analytics tab - ready for component selection
  Analytics: () => import('../../components/EmptyTab').then(m => ({ 
    default: () => m.EmptyTab({ title: 'Analytics' }) 
  })),
  // Documentation viewer
  Documentation: () => import('../../components/Documentation').then(m => ({ default: m.Documentation })),
  // User Tab Container - renders either DynamicCanvas or StaticCanvas based on tab type
  UserTabContainer: () => {
    console.log('componentRegistry: UserTabContainer loader called')
    return import('../../components/MinimalUserTab').then(m => {
      console.log('componentRegistry: MinimalUserTab module loaded', m)
      return { default: m.MinimalUserTab }
    }).catch(error => {
      console.error('componentRegistry: Failed to load MinimalUserTab', error)
      throw error
    })
  },
  // Component Portal - import/export components between ports
  ComponentPortal: () => import('../../components/ComponentPortal').then(m => ({ default: m.ComponentPortal }))
}

// Component names mapping
export const COMPONENT_NAMES: Record<string, string> = {
  Analytics: 'Analytics',
  Documentation: 'Documentation',
  UserTabContainer: 'User Tab',
  ComponentPortal: 'Component Portal'
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