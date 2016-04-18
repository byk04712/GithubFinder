'use strict';

import React, { Component, Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import MasterObj from '../services/MasterObj.js';

const Master = (backgroundColor = '#F5FCFF') => class extends Component {

  componentWillMount() {
    //初始化业务逻辑对象
    this.masterObj = new MasterObj(this);
  }

  render() {
    return (
      <View style={[styles.container, { backgroundColor }]}>
        <ViewContainer {...this.props} goDetailPage={this.masterObj.goDetailPage.bind(this)}/>
      </View>
    );
  }
}

class ViewContainer extends Component {

  render() {
    const { actions, assets } = this.props;
    return (
      <View style={styles.box}>
        <TouchableHighlight onPress={actions.routes.detail({
          title: '详情页',
          id: '13579'
        })}>
          <Image style={styles.image} source={this.props.assets.logo} />
        </TouchableHighlight>
        <Text style={styles.text} onPress={this.props.goDetailPage}>Push detail view</Text>
      </View>
    );
  }

}

export default Master

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: 'green'
  },
  image: {
    height: 200,
    marginBottom: 20,
    resizeMode: 'contain',
    width: 200,
  },
  text: {
    color: '#FFF',
  },
});
