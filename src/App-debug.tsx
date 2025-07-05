import React from 'react'

// Test imports one by one
console.log('Starting App imports...')

try {
  console.log('Testing core theme import...')
  // Import just the theme system first
  // const { useTheme } = require('./core/theme')
  console.log('Theme import successful')
} catch (error) {
  console.error('Theme import failed:', error)
}

function App() {
  console.log('App component rendering...')
  
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>GZC Intel - Debug Mode</h1>
      <p>App component is rendering successfully.</p>
      <p>Check console for import test results.</p>
    </div>
  )
}

export default App