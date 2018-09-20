import get from 'lodash.get';

export const ACTION_TYPES = {
  DID_INIT_REQUEST: 'REACT_REDUX_REQUEST:DID_INIT_REQUEST',
  DID_SUCCEED: 'REACT_REDUX_REQUEST:DID_SUCCEED',
  DID_FAIL: 'REACT_REDUX_REQUEST:DID_FAIL',
  DID_UNMOUNT: 'REACT_REDUX_REQUEST:DID_UNMOUNT'
};

export const STATUS = {
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE'
};

export function reducer(state = {}, action = {}) {
  const { args, id, data, error, type } = action;
  switch (type) {
    case ACTION_TYPES.DID_INIT_REQUEST:
      return {
        ...state,
        [id]: {
          status: STATUS.LOADING,
          data: get(state[id], 'data'),
          args
        }
      };

    case ACTION_TYPES.DID_SUCCEED:
      return {
        ...state,
        [id]: {
          status: STATUS.SUCCESS,
          data,
          args
        }
      };

    case ACTION_TYPES.DID_FAIL:
      return {
        ...state,
        [id]: {
          status: STATUS.FAILURE,
          error,
          args
        }
      };

    case ACTION_TYPES.DID_UNMOUNT:
      return {
        ...state,
        [id]: get(state[id], 'status') === STATUS.SUCCESS ? state[id] : {}
      };

    default:
      return state;
  }
}
