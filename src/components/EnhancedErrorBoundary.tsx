import React, { Component, ReactNode } from 'react';
import { quantumTheme } from '../theme/quantum';

interface Props {
  children: ReactNode;
  componentName?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
  errorCount: number;
}

export class EnhancedErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorCount: 0
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
      errorCount: 0
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('🚨 Component Error:', {
      component: this.props.componentName,
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack
    });
    
    this.setState(prevState => ({
      error,
      errorInfo,
      errorCount: prevState.errorCount + 1
    }));
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return (
        <div style={{
          padding: '20px',
          margin: '20px',
          background: quantumTheme.surface,
          border: `2px solid ${quantumTheme.danger}`,
          borderRadius: '8px',
          color: quantumTheme.text
        }}>
          <h2 style={{ color: quantumTheme.danger, marginBottom: '10px' }}>
            🚨 Component Error{this.props.componentName ? `: ${this.props.componentName}` : ''}
          </h2>
          
          <div style={{
            background: quantumTheme.background,
            padding: '10px',
            borderRadius: '4px',
            marginBottom: '10px',
            fontSize: '14px'
          }}>
            <strong>Error:</strong> {this.state.error.message}
          </div>
          
          <details style={{ marginBottom: '10px' }}>
            <summary style={{ cursor: 'pointer', color: quantumTheme.primary }}>
              Stack Trace
            </summary>
            <pre style={{
              background: quantumTheme.background,
              padding: '10px',
              borderRadius: '4px',
              fontSize: '11px',
              overflow: 'auto',
              maxHeight: '200px'
            }}>
              {this.state.error.stack}
            </pre>
          </details>
          
          {this.state.errorInfo && (
            <details style={{ marginBottom: '10px' }}>
              <summary style={{ cursor: 'pointer', color: quantumTheme.primary }}>
                Component Stack
              </summary>
              <pre style={{
                background: quantumTheme.background,
                padding: '10px',
                borderRadius: '4px',
                fontSize: '11px',
                overflow: 'auto',
                maxHeight: '200px'
              }}>
                {this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
          
          <div style={{ fontSize: '12px', color: quantumTheme.textSecondary }}>
            Error count: {this.state.errorCount}
          </div>
          
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null, errorInfo: null });
              window.location.reload();
            }}
            style={{
              marginTop: '10px',
              padding: '8px 16px',
              background: quantumTheme.primary,
              color: quantumTheme.text,
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}