import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Item from './Item';
import { getHeight, getWidth} from '../../utils';
import TopMenu from './ProfileViewer/TopMenu';
import BottomMenu from './ProfileViewer/BottomMenu';

const ProfileViewer = React.memo(({
  item,
  messagesByUser,
  setMessagesByUser,
  navigation,
}) => {
  const [fontSize, setFontsize] = useState(12);
  useEffect(()=> {
    setMessagesByUser(item.userId);
  }, [])
  return (
    <SafeAreaView style={styles.safeArea}>
      <TopMenu
        styles={styles}
        item={item}
        decreaseFont={() => setFontsize(fontSize - 0.5)}
        increaseFont={() => setFontsize(fontSize + 0.5)}
      />
      <Item item={item} messagesByUser={messagesByUser} fontSize={fontSize} />
      <BottomMenu 
        styles={styles}
        item={item}
        stopTextToSpeech={this.stopTextToSpeech}
        navigation={navigation}
      />
    </SafeAreaView>
  );
});

export default ProfileViewer;

const styles = StyleSheet.create({
  buttonsContainer: {
    alignSelf: 'baseline',
    backgroundColor: '#FFFFFF',
    alignItems: 'flex-start',
    paddingVertical: 5,
    width: getWidth(),
    flexDirection: "row",
    justifyContent: "space-around",
    zIndex:1000,
    height:42,
  },
  safeArea: {
    height: getHeight(), 
    flex:1, 
    flexDirection: 'column', 
    alignContent: 'space-between',
    justifyContent:'space-between'
  },
  topRight: {
    flexDirection: 'row',
  },
  divider: { backgroundColor: '#E5E5E5',width:1, height:24, marginTop:5, },
  touchableButton: {
    width: 65,
    height:35,
    justifyContent: 'center',
  },
});