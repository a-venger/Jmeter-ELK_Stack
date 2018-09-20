import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash.get';
import isEqual from 'lodash.isequal';
import { ReactReduxRequestView } from './view';

const STATE_KEY = 'reactReduxRequest';

export function getRequestState(state, id) {
  if (id) {
    return state[STATE_KEY][id];
  }

  return state[STATE_KEY];
}

// export reducer
export { reducer } from './reducer';

const mapStateToProps = (state, ownProps) => {
  const { args, id, selector } = ownProps;

  if (!state[STATE_KEY]) {
    throw new Error(
      `The key "${STATE_KEY}" was not found in store. Did you setup your reducers?`
    );
  }

  const prevArgs = get(state[STATE_KEY][id], 'args');
  const didArgsChange = !isEqual(args, prevArgs);

  let selectorResult;
  try {
    selectorResult = selector(state, { id });
  } catch (e) {
    console.error(`The selector for "Request#${id}" threw an error:\n`, e);
    throw new Error(e);
  }

  return {
    didArgsChange,
    selectorResult
  };
};

const mapDispatchToProps = dispatch => ({
  dispatch
});

export const Request = connect(mapStateToProps, mapDispatchToProps)(
  ReactReduxRequestView
);

Request.propTypes /* remove-proptypes */ = {
  args: PropTypes.array,
  fn: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  preventFetch: PropTypes.bool,
  render: PropTypes.func,
  selector: PropTypes.func
};

Request.defaultProps = {
  args: [],
  selector: (state, props) => state[STATE_KEY][props.id]
};
