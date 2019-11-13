import React from 'react';
import ProfileViewer from './ProfileViewer';

export default function DetailView(props) {
  const item = props.navigation.state.params; 
  return (
    <ProfileViewer 
      item={item} 
      messagesByUser={props.messagesByUser}
      getMessagesByUser={props.getMessagesByUser}
      setMessagesByUser={props.setMessagesByUser}
      navigation={props.navigation}
    />
  );
}
