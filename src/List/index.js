import React from 'react';
import {object} from 'prop-types';
import {withStyles} from 'material-ui';
import {Link} from 'react-router-dom';
import {hot} from 'react-hot-loader';

const styles = (theme) => ({
  root: {
    color: 'orange',
  },
});

@hot(module)
@withStyles(styles)
/**
 * List Page
 */
export default class List extends React.Component {
  static propTypes = {
    classes: object,
  };

  /**
   * @param  {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      count: 1,
    };
  }

  /**
   * Increment count by 1
   * Try to modify crement number and understand HMR
   */
  onClick() {
    this.setState({
      count: this.state.count + 1,
    });
  }

  /**
   * Render List Page
   * @return {Component}
   */
  render() {
    const {classes} = this.props;

    return (
      <div>
        <div className={classes.root}>JSS demo</div>
        <ul>
          <li><Link to="/detail">Redirect and lazy load detail page</Link></li>
        </ul>
        <div onClick={this.onClick.bind(this)}>
          Click me, then modify count increment number to see HMR:
          {this.state.count}
        </div>
      </div>
    );
  }
}
