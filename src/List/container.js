import {connect} from 'react-redux';

import Component from './component';
import {
  fetchSomeAsyncRequest,
} from './actions';

const mapStateToProps = (state, ownProps) => {
  return {
    count: state.list.count,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchSomeAsyncRequest: () => {
      dispatch(fetchSomeAsyncRequest());
    },
  };
};

@connect(mapStateToProps, mapDispatchToProps)
/**
 * Connected react component
 */
export default class Container extends Component {

}
