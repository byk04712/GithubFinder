'use strict';

import React, { Component, StyleSheet, View, TextInput, Dimensions, Image, Text } from 'react-native';

import Button from 'react-native-button';
import SearchObj from './logic/SearchObj.js';
import packageJson from '../package.json';
import codePush from 'react-native-code-push';

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

		//下面可以继续做一些组件初始化动作，比如请求数据等等
		//这些动作最好是业务逻辑对象提供的，这样root组件将非常干净
		//例如这样 this.searchObj.queryData();
	}

	render() {
		return (
			<Image style={styles.container} source={{uri:'http://cdnq.duitang.com/uploads/item/201308/05/20130805143313_3Aedy.thumb.700_0.jpeg'}}>
				<SearchView
					{...this.state}
					changeText={this.searchObj.changeText.bind(this.searchObj)}
					search={this.searchObj.search.bind(this.searchObj)}/>
				<MessageView
					disable={this.state.disable}
					message={this.state.msg}/>
				<View style={styles.footer}>
					<Text style={styles.version}>{'版本：' + packageJson.version}</Text>
				</View>
			</Image>
		);
	}

	componentDidMount() {
		codePush.sync();
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
		    	<Text style={styles.title}>到github上寻找大神</Text>
		    	<View style={[styles.inputView, {borderColor: color}]}>
		    		<TextInput style={styles.input}
		    			defaultValue={this.props.keyword}
		    			editable={!this.props.disable}
		    			onChangeText={this.props.changeText}
		    			placeholder='输入大神的github帐号'
		    			underlineColorAndroid='transparent'/>
		    	</View>
		    	<Button activeOpacity={1}
		    		disabled={this.props.disable}
		    		onPress={this.props.search}
		    		style={[styles.btn, {backgroundColor: color}]}>开始查找</Button>
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
	btn: {
		width: width - 40,
		padding: 12,
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