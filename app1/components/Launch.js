'use strict';

import React, { Component, StyleSheet, Text, View } from 'react-native';

export default class Launch extends Component {
  render() {
    const { actions } = this.props;

    return (
      <View style={styles.container}>
        <Text onPress={actions.routes.tabBar.tab1()}>点击我进入</Text>
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
