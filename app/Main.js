'use strict';

import React, { Component, StyleSheet, View, TextInput, Text } from 'react-native';

import Button from 'react-native-button';
import SearchObj from './logic/SearchObj.js';

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
			<View style={styles.container}>
				<SearchView
					{...this.state}
					changeText={this.searchObj.changeText.bind(this.searchObj)}
					search={this.searchObj.search.bind(this.searchObj)}/>
				<MessageView
					disable={this.state.disable}
					message={this.state.msg}/>
			</View>
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
		    <View style={{alignItems: 'center'}}>
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
		marginTop: 240,
		alignItems: 'center'
	},
	title: {
		fontSize: 24,
		color: '#555'
	},
	inputView: {
		borderWidth: 1,
		width: 350,
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
		width: 350,
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
	}
});

module.exports = Main;