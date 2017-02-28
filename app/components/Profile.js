import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, Text, Image } from 'react-native';
import ProfileObj from '../logic/ProfileObj.js';
import Badge from '../components/Badge.js';

class Profile extends Component {

	componentWillMount() {
		this.profileObj = new ProfileObj(this);
	}

	render() {
		let userInfo = this.props.userInfo;
		return (
			<View style={styles.container}>
				<Badge uri={userInfo.avatar_url} name={userInfo.name} login={userInfo.login}/>
				<PropertiesList userInfo={userInfo}/>
				<TouchableOpacity
					activeOpacity={.8}
					onPress={this.profileObj.goBack.bind(this.profileObj)}
					style={styles.backButton}>
					<Text style={styles.backButtonText}>返回</Text>
				</TouchableOpacity>
			</View>
		);
	}
	
}

class PropertiesList extends Component {

	render() {
		let userObj = this.props.userInfo;
		let properties = [];

		//将对象循环
		Object.keys(userObj).forEach((field, index) => {
			properties.push(<Properties key={index} field={field} value={userObj[field]}/>);
		});

		return (
			<View style={{flex:1}}>
				<ScrollView style={styles.propertiesScrollView}>
					{properties}
				</ScrollView>
			</View>
		);
	}

}

class Properties extends Component {

	render() {
		return (
			<View style={styles.properties} activeOpacity={.7}>
				<Text style={styles.field}>{this.props.field}</Text>
				<Text style={styles.value}>{this.props.value}</Text>
			</View>
		);
	}

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column'
	},
	propertiesScrollView: {
		backgroundColor: '#fff'
	},
	properties: {
		padding: 7,
		borderBottomWidth: 1,
		borderColor: '#698EBF',
		flexDirection: 'column'
	},
	field: {
		color: '#333',
		fontSize: 14,
		fontWeight: 'bold'
	},
	value: {
		color: '#666',
		fontSize: 16
	},
	backButton: {
		height: 50,
		backgroundColor: '#999999',
		justifyContent: 'center',
		alignItems: 'center'
	},
	backButtonText: {
		color: '#FFF',
		fontSize: 16
	}
});

module.exports = Profile