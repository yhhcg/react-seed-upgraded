import React from 'react';
import {Link} from 'react-router-dom';

/**
 * List Page
 */
export default class List extends React.Component {
  /**
   * Render List Page
   * @return {Component}
   */
  render() {
    return (
      <div>
        <div>Webpack 4.x</div>
        <ul>
          <li><Link to="/detail">Redirect Detail Page</Link></li>
        </ul>
      </div>
    );
  }
}
