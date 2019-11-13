import React, {PureComponent} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import { Tooltip, Divider } from 'react-native-elements';

export default class TopMenu extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { toolTipOpen: false, };
    }

    render() {
        return (
          <View style={{...this.props.styles.buttonsContainer,justifyContent: 'space-between', borderBottomColor:'#E5E5E5', borderBottomWidth: 0.5,}}>
            <View style={{...this.props.styles.topRight, marginRight:10,}}>
              <TouchableOpacity
                style={this.props.styles.touchableButton}
              >
                <Tooltip 
                  style={{ ...this.props.styles.topRight}}
                  containerStyle={{padding:4,alignSelf: 'baseline',}}
                  withOverlay={false}
                  backgroundColor='white'
                  onOpen={() => this.setState({toolTipOpen: true})}
                  onClose={() => this.setState({toolTipOpen: false})}
                  width={120}
                  popover={(
                    <View style={{...this.props.styles.topRight, }}>
                      <TouchableOpacity
                        onPress={this.props.decreaseFont}
                        style={this.props.styles.touchableButton}
                      >
                        <Text
                          style={{
                            padding: 5,
                            alignSelf: 'center',
                            color: '#666666',
                            fontSize: 20,
                          }}
                        >
                          t
                        </Text>
                      </TouchableOpacity>
                      <Divider style={this.props.styles.divider} />
                      <TouchableOpacity
                        onPress={this.props.increaseFont}
                        style={this.props.styles.touchableButton}
                      >
                        <Image
                          source={require('../../../../assets/images/icons/sizeUp.png')}
                          title="Size Up"
                          style={{
                            padding: 5,
                            alignSelf: 'center'
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  )} 
                >
                  <Image
                    source={require('../../../../assets/images/icons/size.png')}
                    title="Adjust Font Size"
                    style={{
                      padding: 5,
                      alignSelf: 'center',
                      tintColor: this.state.toolTipOpen ? 'blue' : '#666666'
                    }}
                  />
                </Tooltip>
              </TouchableOpacity>
            </View>
          </View>
      );
    }
}