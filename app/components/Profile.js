'use strict';

import React, { Component, StyleSheet, ScrollView, View, Text, Image } from 'react-native';
import Button from 'react-native-button';
import ProfileObj from '../logic/ProfileObj.js';
import Badge from '../components/Badge.js';

class Profile extends Component {

	componentWillMount() {
		this.profileObj = new ProfileObj(this);
	}

	render() {
		let userInfo = this.props.userInfo;
		// var columns = {
		// 	bio: 'BIO',
		// 	blog: '博客',
		// 	company: '公司',
		// 	created_at: '创建时间',
		// 	email: '邮箱',
		// 	followers: '粉丝人数',
		// 	following: '他关注过',
		// 	location: '位置',
		// 	type: '类型',
		// 	public_repos: '公开代码库',
		// 	updated_at: '最后更新时间'
		// };
		return (
			<View style={styles.container}>
				<Badge uri={userInfo.avatar_url} name={userInfo.name} login={userInfo.login}/>
				<PropertiesList userInfo={userInfo}/>
				<Button activeOpacity={.7} onPress={this.profileObj.goBack.bind(this.profileObj)} style={styles.backBtn}>返回</Button>
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
			<ScrollView style={styles.propertiesScrollView}>
				{properties}
			</ScrollView>
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
	backBtn: {
		padding: 10,
		color: '#FFF',
		backgroundColor: '#999999'
	}
});

module.exports = Profile