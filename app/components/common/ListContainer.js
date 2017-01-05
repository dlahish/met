import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, Dimensions, Animated } from 'react-native'
import ParallaxBackground from './ParallaxBackground'
import MetHeader from './MetHeader'

const EMPTY_CELL_HEIGHT = Dimensions.get('window').height > 600 ? 200 : 150

export default class ListContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      idx: this.props.selectedSegment || 0,
      anim: new Animated.Value(0),
      stickyHeaderHeight: 0,
    }
  }

  renderHeaderTitle(): ?ReactElement {
    if (Platform.OS === 'android') {
      return null;
    }
    var transform;
    if (!this.props.parallaxContent) {
      var distance = EMPTY_CELL_HEIGHT - this.state.stickyHeaderHeight;
      transform = {
        opacity: this.state.anim.interpolate({
          inputRange: [distance - 20, distance],
          outputRange: [0, 1],
          extrapolate: 'clamp',
        })
      };
    }
    return (
      <Animated.Text style={[styles.headerTitle, transform]}>
        {this.props.title}
      </Animated.Text>
    );
  }

  renderParallaxContent() {
    if (Platform.OS === 'android') {
      return <View />;
    }
    if (this.props.parallaxContent) {
      return this.props.parallaxContent;
    }
    return (
      <Text style={styles.parallaxText}>
        {this.props.title}
      </Text>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerWrapper}>
          <ParallaxBackground
            minHeight={this.state.stickyHeaderHeight + MetHeader.height}
            maxHeight={EMPTY_CELL_HEIGHT + this.state.stickyHeaderHeight + MetHeader.height}
            offset={this.state.anim}
            backgroundImage={this.props.backgroundImage}
            // backgroundShift={backgroundShift}
            backgroundColor={this.props.backgroundColor}
            >
            {this.renderParallaxContent()}
          </ParallaxBackground>
          <MetHeader
            title={this.props.title}
            // leftItem={leftItem}
            // rightItem={this.props.rightItem}
            // extraItems={this.props.extraItems}
            >
            {this.renderHeaderTitle()}
          </MetHeader>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerWrapper: {
    ...Platform.select({
      android: {
        elevation: 2,
        backgroundColor: 'transparent',
        // FIXME: elevation doesn't seem to work without setting border
        borderRightWidth: 1,
        marginRight: -1,
        borderRightColor: 'transparent',
      },
    })
  },
  parallaxText: {
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    letterSpacing: -1,
  },
})
