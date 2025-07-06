import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useTabLayout } from './TabLayoutManager'
import { FeatherIcon } from '../../components/icons/FeatherIcon'
import { quantumTheme } from '../../theme/quantum'

export function TabBar() {
  const {
    currentLayout,
    activeTabId,
    setActiveTab,
    saveCurrentLayout,
    loadLayout,
    resetToDefault,
    layouts,
    userLayouts
  } = useTabLayout()

  const [showLayoutMenu, setShowLayoutMenu] = useState(false)
  const [layoutName, setLayoutName] = useState('')

  if (!currentLayout) return null

  const handleSaveLayout = () => {
    if (layoutName.trim()) {
      saveCurrentLayout(layoutName.trim())
      setLayoutName('')
      setShowLayoutMenu(false)
    }
  }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#1A1A1A',
      borderBottom: `1px solid ${quantumTheme.border}`,
      height: '48px',
      padding: '0 16px',
      position: 'relative'
    }}>
      {/* Left Section - Logo and Tabs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        {/* Logo with animated dot */}
        <div style={{
          fontSize: '18px',
          fontWeight: 700,
          background: 'linear-gradient(135deg, #95BD78 0%, #ABD38F 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          letterSpacing: '0.5px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ 
              width: '6px', 
              height: '6px', 
              borderRadius: '50%',
              background: '#ABD38F',
              animation: 'pulse 2s infinite'
            }} />
            <span>GZC Intel</span>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '4px' }}>
          {currentLayout.tabs.map(tab => (
            <div
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                cursor: 'pointer',
                backgroundColor: activeTabId === tab.id ? '#2A2A2A' : 'transparent',
                borderRadius: '4px',
                borderBottom: activeTabId === tab.id ? '2px solid #ABD38F' : '2px solid transparent',
                boxShadow: activeTabId === tab.id ? 'inset 0 -2px 0 0 #ABD38F' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              {tab.icon && (
                <FeatherIcon 
                  name={tab.icon} 
                  size={14} 
                  style={{ 
                    color: activeTabId === tab.id ? '#ABD38F' : quantumTheme.textSecondary 
                  }} 
                />
              )}
              <span style={{
                fontSize: '12px',
                color: activeTabId === tab.id ? quantumTheme.text : quantumTheme.textSecondary,
                fontWeight: activeTabId === tab.id ? 500 : 400
              }}>
                {tab.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section - PnL, Theme Selector, Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        
        {/* PnL Display */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ color: quantumTheme.textSecondary, fontSize: '10px' }}>24h P&L:</span>
            <span style={{ 
              fontWeight: 500, 
              color: '#ABD38F'
            }}>
              +$12,497.97
            </span>
          </div>
          <span style={{ color: quantumTheme.borderLight }}>|</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ color: quantumTheme.textSecondary, fontSize: '10px' }}>MTD:</span>
            <span style={{ 
              fontWeight: 500, 
              color: '#ABD38F'
            }}>
              +$84,923.45
            </span>
          </div>
        </div>

        {/* Theme Selector */}
        <div style={{ position: 'relative' }}>
          <select
            value="GZC Dark"
            onChange={() => {}}
            style={{
              background: `linear-gradient(to bottom, ${quantumTheme.surfaceAlt}CC, ${quantumTheme.surface}EE)`,
              border: `1px solid ${quantumTheme.border}`,
              borderRadius: '6px',
              padding: '6px 28px 6px 10px',
              color: quantumTheme.text,
              fontSize: '12px',
              fontWeight: 400,
              cursor: 'pointer',
              outline: 'none',
              appearance: 'none',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.2s ease'
            }}
          >
            <option value="GZC Dark">GZC Dark</option>
            <option value="GZC Light">GZC Light</option>
            <option value="Trading Pro">Trading Pro</option>
          </select>
          <div style={{
            position: 'absolute',
            right: '8px',
            top: '50%',
            transform: 'translateY(-50%)',
            pointerEvents: 'none'
          }}>
            <FeatherIcon name="chevron-down" size={12} color={quantumTheme.textSecondary} />
          </div>
        </div>

        {/* Layout Menu Button */}
        <button
          onClick={() => setShowLayoutMenu(!showLayoutMenu)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            backgroundColor: 'transparent',
            border: `1px solid ${quantumTheme.border}`,
            borderRadius: '4px',
            cursor: 'pointer',
            color: quantumTheme.textSecondary,
            fontSize: '12px',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = quantumTheme.accent
            e.currentTarget.style.color = quantumTheme.text
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = quantumTheme.border
            e.currentTarget.style.color = quantumTheme.textSecondary
          }}
        >
          <FeatherIcon name="layout" size={14} />
          <span>Layouts</span>
        </button>

        {/* Settings Button */}
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '6px',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: quantumTheme.textSecondary,
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = quantumTheme.text
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = quantumTheme.textSecondary
          }}
        >
          <FeatherIcon name="settings" size={16} />
        </button>
      </div>

      {/* Layout Menu Dropdown */}
      {showLayoutMenu && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: '16px',
          marginTop: '8px',
          backgroundColor: '#1A1A1A',
          border: `1px solid ${quantumTheme.border}`,
          borderRadius: '8px',
          padding: '8px',
          minWidth: '200px',
          zIndex: 1000,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)'
        }}>
          <div style={{ marginBottom: '12px' }}>
            <h4 style={{
              fontSize: '12px',
              fontWeight: 600,
              color: quantumTheme.text,
              marginBottom: '8px'
            }}>
              Save Current Layout
            </h4>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                value={layoutName}
                onChange={(e) => setLayoutName(e.target.value)}
                placeholder="Layout name..."
                style={{
                  flex: 1,
                  padding: '4px 8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: `1px solid ${quantumTheme.border}`,
                  borderRadius: '4px',
                  color: quantumTheme.text,
                  fontSize: '12px'
                }}
              />
              <button
                onClick={handleSaveLayout}
                disabled={!layoutName.trim()}
                style={{
                  padding: '4px 12px',
                  backgroundColor: layoutName.trim() ? quantumTheme.accent : 'transparent',
                  border: `1px solid ${layoutName.trim() ? quantumTheme.accent : quantumTheme.border}`,
                  borderRadius: '4px',
                  color: layoutName.trim() ? '#000' : quantumTheme.textSecondary,
                  fontSize: '12px',
                  cursor: layoutName.trim() ? 'pointer' : 'not-allowed'
                }}
              >
                Save
              </button>
            </div>
          </div>

          {userLayouts.length > 0 && (
            <div style={{ marginBottom: '12px' }}>
              <h4 style={{
                fontSize: '12px',
                fontWeight: 600,
                color: quantumTheme.text,
                marginBottom: '8px'
              }}>
                Saved Layouts
              </h4>
              {userLayouts.map(layout => (
                <div
                  key={layout.id}
                  onClick={() => {
                    loadLayout(layout.id)
                    setShowLayoutMenu(false)
                  }}
                  style={{
                    padding: '6px 8px',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    fontSize: '12px',
                    color: quantumTheme.textSecondary,
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'
                    e.currentTarget.style.color = quantumTheme.text
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.color = quantumTheme.textSecondary
                  }}
                >
                  {layout.name}
                </div>
              ))}
            </div>
          )}

          <button
            onClick={() => {
              resetToDefault()
              setShowLayoutMenu(false)
            }}
            style={{
              width: '100%',
              padding: '6px 8px',
              backgroundColor: 'transparent',
              border: `1px solid ${quantumTheme.border}`,
              borderRadius: '4px',
              color: quantumTheme.textSecondary,
              fontSize: '12px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = quantumTheme.accent
              e.currentTarget.style.color = quantumTheme.text
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = quantumTheme.border
              e.currentTarget.style.color = quantumTheme.textSecondary
            }}
          >
            Reset to Default
          </button>
        </div>
      )}

    </div>
  )
}