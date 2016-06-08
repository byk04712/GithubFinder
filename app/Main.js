'use strict';

import React, { Component, StyleSheet, View, TextInput, Dimensions, Image, Text, TouchableOpacity, Platform } from 'react-native';

import SearchObj from './logic/SearchObj.js';
import packageJson from '../package.json';
import configure from './utils/configure';
import * as codePushSync from './utils/codePushSync';

const {width, height} = Dimensions.get('window');

/**
 * 首页
 */
class Main extends Component {

	constructor(props) {
		super(props);
		this.state = {
			keyword: '',
			disable: false,
			msg: ''
		}
	}

	componentWillMount() {
		//初始化业务逻辑对象
		this.searchObj = new SearchObj(this);
	    codePushSync.sync();
	}

	render() {
		return (
			<Image style={styles.container} source={{uri:configure.main_bg}}>
				<SearchView
					{...this.state}
					changeText={this.searchObj.changeText.bind(this.searchObj)}
					search={this.searchObj.search.bind(this.searchObj)}/>
				<MessageView
					disable={this.state.disable}
					message={this.state.msg}/>
				<View style={styles.footer}>
					<Text style={styles.version}>{'Version : ' + packageJson.version}</Text>
				</View>
			</Image>
		);
	}
	
}

/**
 * 查询输入框
 */
class SearchView extends Component {

	render() {
		let color = this.props.disable ? '#bbb' : '#00B7C3';
		return (
		    <View style={styles.searchContainer}>
		    	<Text style={styles.title}>github上寻找大神!</Text>
		    	<View style={[styles.inputView, {borderColor: color}]}>
		    		<TextInput style={styles.input}
		    			defaultValue={this.props.keyword}
		    			editable={!this.props.disable}
		    			onChangeText={this.props.changeText}
		    			placeholder='请输入要查找的github帐号'
		    			underlineColorAndroid='transparent'/>
		    	</View>
		    	<TouchableOpacity
		    		style={[styles.button, {backgroundColor: color}]}
		    		activeOpacity={.8}
		    		disabled={this.props.disable}
		    		onPress={this.props.search}>
					<Text style={styles.buttonText}>开始查找</Text>
		    	</TouchableOpacity>
		    </View>
		);
	}
	
}

/**
 * 显示消息
 */
class MessageView extends Component {

	render() {
		return (
			<View style={styles.messageView}>
				<Text style={[styles.messageText, {color: this.props.disable ? '#777' : '#FBA512'}]}>{this.props.message}</Text>
			</View>
		);
	}
	
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 160,
		alignItems: 'center'
	},
	searchContainer: {
		width,
		alignItems: 'center',
		paddingVertical: 30,
		backgroundColor: 'rgba(255,255,255,.6)'
	},
	title: {
		fontSize: 24,
		color: '#555'
	},
	inputView: {
		borderWidth: 1,
		width: width - 40,
		height: 50,
		marginTop: 30,
		marginBottom: 15
	},
	input: {
		height: 50,
		padding: 10,
		width: 350,
		borderWidth: 0,
		fontSize: 20
	},
	button: {
		width: width - 40,
		padding: 12,
		alignItems: 'center'
	},
	buttonText: {
		color: '#FFF',
		fontSize: 20
	},
	messageView: {
		width: 350,
		height: 100,
		marginTop: 20,
		justifyContent: 'center',
		alignItems: 'center'
	},
	messageText: {
		fontSize: 16
	},
	footer: {
		position: 'absolute',
		bottom: 0,
		width,
		height: 40,
		alignItems: 'center',
		justifyContent: 'center'
	},
	version: {
		fontSize: 14,
		color: '#999'
	}
});

module.exports = Main;