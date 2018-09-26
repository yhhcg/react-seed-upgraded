import { connect } from 'react-redux';
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

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSomeAsyncRequest: () => {
      dispatch(fetchSomeAsyncRequest());
    },
  };
};

@connect(mapStateToProps, mapDispatchToProps)
class Container extends Component {

}

export default Container;
