import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '40px',
          textAlign: 'center',
          fontFamily: 'Arial, sans-serif'
        }}>
          <h1 style={{ color: '#dc2626', marginBottom: '20px' }}>
            Произошла ошибка
          </h1>
          <p style={{ color: '#666', marginBottom: '20px' }}>
            {this.state.error?.message || this.state.error?.toString() || 'Неизвестная ошибка'}
          </p>
          {this.state.error && (
            <details style={{ marginTop: '20px', textAlign: 'left', maxWidth: '600px', margin: '20px auto' }}>
              <summary style={{ cursor: 'pointer', color: '#1a2332', marginBottom: '10px' }}>
                Детали ошибки
              </summary>
              <pre style={{ 
                background: '#f7fafc', 
                padding: '15px', 
                borderRadius: '4px', 
                overflow: 'auto',
                fontSize: '12px',
                color: '#666'
              }}>
                {this.state.error.stack || JSON.stringify(this.state.error, null, 2)}
              </pre>
            </details>
          )}
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '12px 24px',
              backgroundColor: '#1a2332',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Перезагрузить страницу
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
