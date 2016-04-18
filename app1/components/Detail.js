'use strict';

import React, { Component, StyleSheet, Text, View } from 'react-native';

export default class Detail extends Component {
  render() {
    const { actions } = this.props;

    console.log('这里是详情页', this.props.routerData);
    return (
      <View style={styles.container}>
        <Text onPress={actions.pop}>Go back!</Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flex: 1,
    justifyContent: 'center',
  },
});
