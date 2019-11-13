import React, {PureComponent} from 'react';
import {
  View,
  TouchableOpacity,
  Image
} from 'react-native';
import { Divider } from 'react-native-elements';
import { getSharePressAction } from '../../../utils';


export default class BottomMenu extends PureComponent {
    render() {
        return (
          <View style={{...this.props.styles.buttonsContainer, borderTopColor:'#E5E5E5', borderTopWidth: 0.5,}}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.goBack();
              }}
              style={this.props.styles.touchableButton}
            >
              <Image
                source={require('../../../../assets/images/icons/arrow.png')}
                title="Back"
                style={{
                  padding: 5,
                  alignSelf: 'center'
                }}
              />
            </TouchableOpacity>
            <Divider style={this.props.styles.divider} />
            <TouchableOpacity
              style={this.props.styles.touchableButton}
              onPress={()=>getSharePressAction(this.props.item)}
            >
              <Image
                source={require('../../../../assets/images/icons/share.png')}
                title="Share"
                style={{
                  padding: 5,
                  alignSelf: 'center',
                }}
              />
            </TouchableOpacity>
          </View>
      );
    }
}