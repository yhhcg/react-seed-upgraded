import React from 'react';
import {Link} from 'react-router-dom';

/**
 * Detail Page
 */
export default class Detail extends React.Component {
  /**
   * Render Detail Page
   * @return {Component}
   */
  render() {
    return (
      <div>
        <div>Detail Page</div>
        <div><Link to="/">Redirect List Page</Link></div>
      </div>
    );
  }
}
