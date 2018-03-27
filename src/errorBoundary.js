/*
 * Error boundary catches JavaScript errors anywhere in their child component tree, log those errors,
 * and displays a fallback UI instead of the component tree that crashed.
 * It catches errors during rendering, in lifecycle methods, and in constructors of the
 * whole tree below them.
 * It defines a new lifecycle method called componentDidCatch.
 * @module ErrorBoundary
 */
import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      errorInfo: {},
    };
  }

  /**
   * A new lifecycle method
   * @param  {String} error - Be thrown error
   * @param  {Object} errorInfo - Stack infomation
   */
  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    if (this.state.error) {
      return (
        <div>
          {this.state.error.toString()}
          <h1>{this.state.errorInfo.componentStack}</h1>
        </div>
      );
    }
    return this.props.children;
  }
}
