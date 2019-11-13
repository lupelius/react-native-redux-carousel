import React from 'react';
import { Animated, TouchableWithoutFeedback } from 'react-native';

export default class AnimatedView extends React.Component {
  state = {
    fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
    height: new Animated.Value(0),
    width: new Animated.Value(0),
    animHeight: null,
    animWidth: null,
    firstTimeDone: false,
  }

  componentDidMount() {
    Animated.timing(                  // Animate over time
      this.state.fadeAnim,            // The animated value to drive
      {
        toValue: 1,                   // Animate to opacity: 1 (opaque)
        duration: 1000,              // Make it take a while
      }
    ).start();                        // Starts the animation
  }

  shrink() {
    Animated.timing(
      this.state.animHeight,
      {
        toValue: this.state.height+60,                   // Animate to opacity: 1 (opaque)
        // easing: Easing.back(),
        duration: 1000,              // Make it take a while
      }
    ).start(() => {
      this.props.onPress();
      // Vibration.vibrate(10);
      Animated.timing(
        this.state.animHeight,
        {
          toValue: this.state.height,                   // Animate to opacity: 1 (opaque)
          // easing: Easing.back(),
          duration: 1000,              // Make it take a while
        }
      ).start();
    });
  }

  render() {
    // eslint-disable-next-line prefer-const
    let { fadeAnim, animWidth, animHeight } = this.state;

    return (
      <Animated.View                 // Special animatable View
        style={{
          ...this.props.style,
          opacity: fadeAnim,         // Bind opacity to animated value
          width: animWidth,
          height: animHeight,
        }}
        onLayout={
          (event) => {
            if (!this.state.firstTimeDone) {
              this.setState(event.nativeEvent.layout);
              this.setState({firstTimeDone: true});
              this.setState(state => ({animHeight: new Animated.Value(state.height)}));
              this.setState(state => ({animWidth: new Animated.Value(state.width)}));
            }
          }}
      >
        <TouchableWithoutFeedback
          key={`${this.props._id}`}
          onPress={this.props.onPress}
        >
          {this.props.children}
        </TouchableWithoutFeedback>
      </Animated.View>
    );
  }
}

