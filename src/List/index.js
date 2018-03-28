import React from 'react';
import {object} from 'prop-types';
import {withStyles} from 'material-ui';
import {Link} from 'react-router-dom';

const styles = (theme) => ({
  root: {
    color: 'orange',
  },
});

@withStyles(styles)
/**
 * List Page
 */
export default class List extends React.Component {
  static propTypes = {
    classes: object,
  };

  /**
   * Render List Page
   * @return {Component}
   */
  render() {
    const {classes} = this.props;

    return (
      <div>
        <div className={classes.root}>Webpack 4.x</div>
        <ul>
          <li><Link to="/detail">Redirect Detail Page</Link></li>
        </ul>
      </div>
    );
  }
}
