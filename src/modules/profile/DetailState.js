// Initial state
// Actions
import {
  GET_MESSAGES_BY_USER,
  SET_MESSAGES_BY_US,
} from './DetailActionTypes';
import { getMessages } from '../../data';

const initialState = {
  messagesByUser: [],
};

export function getMessagesByUser() {
  return { type: GET_MESSAGES_BY_USER };
}

export function setMessagesByUser(data) {
  return dispatch => {
    getMessages()
    .then((mes) => {
      const msgs = mes.filter((msgItem) => {
        return (data === msgItem.userId);
      });
      dispatch(setMsgsByUser(msgs))
    })
    .catch((err) => {
        console.log(err);
    });
  };
}

function setMsgsByUser(msgs) {
  return {
    type: SET_MESSAGES_BY_US,
    data: msgs,
  };
}

// Reducer
export default function DetailStateReducer(state = initialState, action = {}) {
  switch (action.type) {
      case GET_MESSAGES_BY_USER:
        return state.messagesByUser;
      case SET_MESSAGES_BY_US:
          return Object.assign({}, state, {
              messagesByUser: action.data,
          });
      default:
          return state;
  }
}