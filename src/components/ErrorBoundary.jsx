// components/ErrorBoundary.jsx
import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    this.setState({ error, info });
    // eslint-disable-next-line no-console
    console.error("Caught by ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      const { error, info } = this.state;
      return (
        <div style={{ padding: 28, color: "#ffeedd", background: "#120806", minHeight: "100vh", fontFamily: "sans-serif" }}>
          <h2 style={{ marginTop: 0 }}>Application error — details below</h2>
          <pre style={{ whiteSpace: "pre-wrap", color: "#ffdcb8" }}>
            {String(error && (error.stack || error.message || error))}
          </pre>
          <details style={{ color: "#e6b7a5" }}>
            <summary>Component Stack</summary>
            {info && info.componentStack}
          </details>
          <button 
            onClick={() => window.location.reload()} 
            style={{ 
              marginTop: 20, 
              padding: "10px 20px", 
              background: "#B9875D", 
              color: "#120806", 
              border: "none", 
              borderRadius: 8, 
              cursor: "pointer",
              fontWeight: "bold"
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