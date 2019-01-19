import { connect } from 'react-redux';
// import sagaManager from '../sagaManager';
import Component from './component';
import {
  async,
} from './actions';

const {
  fetchSomeAsyncRequest,
} = async;

const mapStateToProps = (state) => {
  return {
    count: state.list.count,
  };
};

/**
 * The comments is to explain how to inject saga and cancel saga.
 */
const mapDispatchToProps = (dispatch) => {
  return {
    fetchSomeAsyncRequest: () => {
      dispatch(fetchSomeAsyncRequest());
    },
    // onDidMount: () => {
    //   /* Start saga when the component is mounted */
    //   sagaManager.start('list');
    // },
    // onWillUnmount() {
    //   /* Cancel saga before the component is unmounted and destroyed */
    //   sagaManager.stop('list');
    // },
  };
};

@connect(mapStateToProps, mapDispatchToProps)
class Container extends Component {

}

export default Container;
