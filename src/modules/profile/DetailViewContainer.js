// @flow
import { connect } from 'react-redux';
import { compose } from 'recompose';

import Detail from './DetailView';
import { messagesByUser, getMessagesByUser, setMessagesByUser } from './DetailState';

export default compose(
  connect(
    state => ({
      messagesByUser: state.detail.messagesByUser,
    }),
    dispatch => ({
      getMessagesByUser: () => dispatch(getMessagesByUser()),
      setMessagesByUser: data => dispatch(setMessagesByUser(data)),
    }),
  )
)(Detail);