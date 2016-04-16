'use strict';

import React, { Component, StyleSheet, ScrollView, View, Image } from 'react-native';
import Button from 'react-native-button';
import DashboardObj from '../logic/DashboardObj.js';

class Dashboard extends Component {

	constructor(props) {
		super(props);
		this.state = {
			userInfo: props.res//用户信息
		}
	}

	componentWillMount() {
		this.dashboardObj = new DashboardObj(this);
	}

	render() {
		return (
			<ScrollView containerStyle={styles.container}>
				<Portrait uri={this.props.res.avatar_url}/>
				<ButtonList
					goToProfile={this.dashboardObj.goToProfile.bind(this.dashboardObj)}
					goToNotes={this.dashboardObj.goToNotes.bind(this.dashboardObj)}
					goToRepos={this.dashboardObj.goToRepos.bind(this.dashboardObj)}
					goBack={this.dashboardObj.goBack.bind(this.dashboardObj)}/>
			</ScrollView>
		);
	}
	
}

class Portrait extends Component {

	render() {
		return (
			<View style={styles.protrait}>
				<Image source={{uri:this.props.uri}} style={styles.image}/>
			</View>
		);
	}

}

class ButtonList extends Component {

	render() {
		return (
			<View style={styles.buttonListView}>
				<Button activeOpacity={.7} style={[styles.button, {backgroundColor:'#FFD147'}]} onPress={this.props.goToProfile}>查看大神信息</Button>
				<Button activeOpacity={.7} style={[styles.button, {backgroundColor:'#00CC99'}]} onPress={this.props.goToNotes}>给大神留言</Button>
				<Button activeOpacity={.7} style={[styles.button, {backgroundColor:'#339966'}]} onPress={this.props.goToRepos}>查看大神代码库</Button>
				<Button activeOpacity={.7} style={[styles.button, {backgroundColor:'#999999'}]} onPress={this.props.goBack}>返回</Button>
			</View>
		);
	}

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: 'red'
	},
	protrait: {
		flex: 1
	},
	image: {
		resizeMode: 'stretch',
		height: 450
	},
	buttonListView: {
		flex: 1
	},
	button: {
		padding: 14,
		color: '#FFF'
	}
});

module.exports = Dashboard