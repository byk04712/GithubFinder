'use strict';

import React, { Component, StyleSheet, View, Dimensions, Image, TouchableOpacity, Text } from 'react-native';
import DashboardObj from '../logic/DashboardObj.js';

const {width, height} = Dimensions.get('window');
const statusBarHeight = 60;

class Dashboard extends Component {

	constructor(props) {
		super(props);
		this.state = {
			userInfo: props.res 	//用户信息
		}
	}

	componentWillMount() {
		this.dashboardObj = new DashboardObj(this);
	}

	render() {
		return (
			<View style={styles.container}>
				<Portrait uri={this.props.res.avatar_url}/>
				<ButtonList
					goToProfile={this.dashboardObj.goToProfile.bind(this.dashboardObj)}
					goToNotes={this.dashboardObj.goToNotes.bind(this.dashboardObj)}
					goToRepos={this.dashboardObj.goToRepos.bind(this.dashboardObj)}
					goBack={this.dashboardObj.goBack.bind(this.dashboardObj)}/>
			</View>
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
			<View>
				<View style={[styles.buttonView, {backgroundColor:'#FFD147'}]}>
					<TouchableOpacity
						activeOpacity={.7}
						onPress={this.props.goToProfile}>
						<Text style={styles.buttonText}>查看大神信息</Text>
					</TouchableOpacity>
				</View>

				<View style={[styles.buttonView, {backgroundColor:'#00CC99'}]}>
					<TouchableOpacity
						activeOpacity={.7}
						onPress={this.props.goToNotes}>
						<Text style={styles.buttonText}>给大神留言</Text>
					</TouchableOpacity>
				</View>

				<View style={[styles.buttonView, {backgroundColor:'#339966'}]}>
					<TouchableOpacity
						activeOpacity={.7}
						onPress={this.props.goToRepos}>
						<Text style={styles.buttonText}>查看大神代码库</Text>
					</TouchableOpacity>
				</View>

				<View style={[styles.buttonView, {backgroundColor:'#999999'}]}>
					<TouchableOpacity
						activeOpacity={.7}
						onPress={this.props.goBack}>
						<Text style={styles.buttonText}>返回</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column'
	},
	protrait: {
		flex: 1,
		width
	},
	image: {
		resizeMode: 'stretch',
		flex: 1
	},
	buttonView: {
		height: 50,
		justifyContent: 'center',
		alignItems: 'center'
	},
	buttonText: {
		fontSize: 16,
		color: '#FFF'
	}
});

module.exports = Dashboard