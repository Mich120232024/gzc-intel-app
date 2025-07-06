// Component Inventory System for Dynamic Tabs
// Handles navigation through large component libraries

export interface ComponentMeta {
  id: string
  name: string
  displayName: string
  category: string
  subcategory?: string
  description: string
  thumbnail?: string
  defaultSize: { w: number; h: number }
  minSize: { w: number; h: number }
  maxSize?: { w: number; h: number }
  tags: string[]
  complexity: 'simple' | 'medium' | 'complex'
  dependencies?: string[]
  props?: Record<string, any>
  preview?: string // Preview component or image
  quality: 'port-3000' | 'port-3200' | 'enhanced' | 'basic'
  source?: 'internal' | 'port-3000' | 'port-3200' | 'external'
}

export interface ComponentCategory {
  id: string
  name: string
  icon: string
  description: string
  subcategories?: ComponentSubcategory[]
  color?: string
}

export interface ComponentSubcategory {
  id: string
  name: string
  description: string
  tags: string[]
}

// Component Inventory organized by categories
export class ComponentInventory {
  private static instance: ComponentInventory
  private components: Map<string, ComponentMeta> = new Map()
  private categories: Map<string, ComponentCategory> = new Map()
  private searchIndex: Map<string, string[]> = new Map()

  static getInstance(): ComponentInventory {
    if (!ComponentInventory.instance) {
      ComponentInventory.instance = new ComponentInventory()
      ComponentInventory.instance.initializeDefaults()
    }
    return ComponentInventory.instance
  }

  private initializeDefaults() {
    // Initialize categories
    this.addCategory({
      id: 'financial',
      name: 'Financial',
      icon: 'trending-up',
      description: 'Trading, portfolio, and market data components',
      color: '#95BD78',
      subcategories: [
        { id: 'charts', name: 'Charts & Graphs', description: 'Financial visualization', tags: ['chart', 'graph', 'data'] },
        { id: 'portfolio', name: 'Portfolio Management', description: 'Portfolio tools', tags: ['portfolio', 'holdings', 'performance'] },
        { id: 'trading', name: 'Trading Tools', description: 'Order management and execution', tags: ['trading', 'orders', 'execution'] },
        { id: 'market-data', name: 'Market Data', description: 'Real-time market feeds', tags: ['market', 'quotes', 'feeds'] }
      ]
    })

    this.addCategory({
      id: 'visualization',
      name: 'Visualization',
      icon: 'bar-chart-2',
      description: 'Charts, graphs, and data visualization components',
      color: '#64b5f6',
      subcategories: [
        { id: 'charts', name: 'Charts', description: 'Various chart types', tags: ['chart', 'line', 'bar', 'pie'] },
        { id: 'tables', name: 'Data Tables', description: 'Advanced data grids', tags: ['table', 'grid', 'data'] },
        { id: 'dashboards', name: 'Dashboard Widgets', description: 'Pre-built dashboard components', tags: ['dashboard', 'widget', 'kpi'] }
      ]
    })

    this.addCategory({
      id: 'layout',
      name: 'Layout',
      icon: 'layout',
      description: 'Layout and container components',
      color: '#ABD38F',
      subcategories: [
        { id: 'containers', name: 'Containers', description: 'Panel, card, and container components', tags: ['panel', 'card', 'container'] },
        { id: 'grids', name: 'Grid Systems', description: 'Responsive grid layouts', tags: ['grid', 'layout', 'responsive'] }
      ]
    })

    this.addCategory({
      id: 'data',
      name: 'Data & APIs',
      icon: 'database',
      description: 'Data integration and API components',
      color: '#DD8B8B',
      subcategories: [
        { id: 'feeds', name: 'Data Feeds', description: 'Real-time data connections', tags: ['feed', 'realtime', 'websocket'] },
        { id: 'forms', name: 'Forms & Inputs', description: 'Data entry components', tags: ['form', 'input', 'validation'] }
      ]
    })

    // Initialize sample components
    this.addComponent({
      id: 'g10-yield-curve',
      name: 'G10YieldCurveAnimator',
      displayName: 'G10 Yield Curve Animator',
      category: 'financial',
      subcategory: 'charts',
      description: 'Professional animated yield curve visualization with historical scenarios',
      defaultSize: { w: 6, h: 4 },
      minSize: { w: 4, h: 3 },
      maxSize: { w: 12, h: 8 },
      tags: ['yield-curve', 'animation', 'g10', 'bonds', 'fred-data'],
      complexity: 'complex',
      quality: 'port-3000',
      source: 'port-3000'
    })

    this.addComponent({
      id: 'portfolio-summary',
      name: 'PortfolioSummary',
      displayName: 'Portfolio Summary',
      category: 'financial',
      subcategory: 'portfolio',
      description: 'Real-time portfolio performance and holdings summary',
      defaultSize: { w: 4, h: 3 },
      minSize: { w: 3, h: 2 },
      tags: ['portfolio', 'performance', 'holdings', 'pnl'],
      complexity: 'medium',
      quality: 'port-3200',
      source: 'port-3200'
    })

    this.addComponent({
      id: 'market-heatmap',
      name: 'MarketHeatmap',
      displayName: 'Market Heatmap',
      category: 'visualization',
      subcategory: 'charts',
      description: 'Interactive market sector performance heatmap',
      defaultSize: { w: 6, h: 4 },
      minSize: { w: 4, h: 3 },
      tags: ['heatmap', 'market', 'sectors', 'performance'],
      complexity: 'medium',
      quality: 'enhanced'
    })

    this.buildSearchIndex()
  }

  addCategory(category: ComponentCategory): void {
    this.categories.set(category.id, category)
  }

  addComponent(component: ComponentMeta): void {
    this.components.set(component.id, component)
    this.updateSearchIndex(component)
  }

  getCategories(): ComponentCategory[] {
    return Array.from(this.categories.values())
  }

  getComponentsByCategory(categoryId: string, subcategoryId?: string): ComponentMeta[] {
    return Array.from(this.components.values()).filter(c => {
      if (c.category !== categoryId) return false
      if (subcategoryId && c.subcategory !== subcategoryId) return false
      return true
    })
  }

  searchComponents(query: string, filters?: ComponentFilter): ComponentMeta[] {
    const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0)
    
    let results = Array.from(this.components.values())

    // Apply search terms
    if (searchTerms.length > 0) {
      results = results.filter(component => {
        const searchText = [
          component.name,
          component.displayName,
          component.description,
          ...component.tags
        ].join(' ').toLowerCase()

        return searchTerms.every(term => searchText.includes(term))
      })
    }

    // Apply filters
    if (filters) {
      if (filters.category) {
        results = results.filter(c => c.category === filters.category)
      }
      if (filters.subcategory) {
        results = results.filter(c => c.subcategory === filters.subcategory)
      }
      if (filters.complexity) {
        results = results.filter(c => c.complexity === filters.complexity)
      }
      if (filters.quality) {
        results = results.filter(c => c.quality === filters.quality)
      }
      if (filters.tags && filters.tags.length > 0) {
        results = results.filter(c => 
          filters.tags!.some(tag => c.tags.includes(tag))
        )
      }
    }

    // Sort by relevance (exact name matches first, then by quality)
    results.sort((a, b) => {
      const aNameMatch = a.name.toLowerCase().includes(query.toLowerCase()) ? 1 : 0
      const bNameMatch = b.name.toLowerCase().includes(query.toLowerCase()) ? 1 : 0
      
      if (aNameMatch !== bNameMatch) return bNameMatch - aNameMatch
      
      const qualityOrder = ['port-3000', 'port-3200', 'enhanced', 'basic']
      return qualityOrder.indexOf(a.quality) - qualityOrder.indexOf(b.quality)
    })

    return results
  }

  getComponent(id: string): ComponentMeta | undefined {
    return this.components.get(id)
  }

  getFavorites(): ComponentMeta[] {
    // TODO: Implement favorites from user preferences
    return []
  }

  getRecents(): ComponentMeta[] {
    // TODO: Implement recent components from usage tracking
    return []
  }

  private updateSearchIndex(component: ComponentMeta): void {
    const terms = [
      component.name,
      component.displayName,
      component.description,
      ...component.tags,
      component.category,
      component.subcategory || ''
    ].join(' ').toLowerCase().split(' ')

    for (const term of terms) {
      if (term.length > 2) {
        if (!this.searchIndex.has(term)) {
          this.searchIndex.set(term, [])
        }
        this.searchIndex.get(term)!.push(component.id)
      }
    }
  }

  private buildSearchIndex(): void {
    this.searchIndex.clear()
    for (const component of this.components.values()) {
      this.updateSearchIndex(component)
    }
  }
}

export interface ComponentFilter {
  category?: string
  subcategory?: string
  tags?: string[]
  complexity?: 'simple' | 'medium' | 'complex'
  quality?: 'port-3000' | 'port-3200' | 'enhanced' | 'basic'
  source?: 'internal' | 'port-3000' | 'port-3200' | 'external'
}

// Singleton instance
export const componentInventory = ComponentInventory.getInstance()