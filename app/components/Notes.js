'use strict';

import React, { Component, StyleSheet, ListView, View, Text, TextInput } from 'react-native';
import NotesObj from '../logic/NotesObj.js';
import Badge from '../components/Badge.js';
import Button from 'react-native-button';
import Loading from '../components/Loading.js';

class Notes extends Component {

	constructor(props) {
		super(props);
		this.state = {
			notes: null,
			note: '',
			loaded: false
		}
	}

	componentWillMount() {
		//初始化业务逻辑对象
		this.notesObj = new NotesObj(this);

		//初始化数据
		this.notesObj.getChatRecords(this.props.userInfo);
	}

	render() {
		let userInfo = this.props.userInfo;
		return (
			<View style={styles.container}>
				<Badge uri={userInfo.avatar_url} name={userInfo.name} login={userInfo.login}/>
				<ChatBoard dataSource={this.state.notes} loading={this.state.loaded}/>
				<TypingBoard
					{...this.state}
					changeText={this.notesObj.changeText.bind(this.notesObj)}
					submit={this.notesObj.submit.bind(this.notesObj)}/>
			</View>
		);
	}
	
}

/**
 * 显示聊天面板
 */
class ChatBoard extends Component {

	render() {
		return (
			<View style={styles.chatboard}>
				{
					this.props.loading ? 
						<ListView
							dataSource={this.props.dataSource}
							renderRow={this._renderRow}/>
					:
						<Loading/>
				}
			</View>
		);
	}

	_renderRow(rowData) {
		return (
			<View style={styles.row}>
				<Text>{rowData}</Text>
			</View>
		);
	}

}

/**
 * 打字输入面板
 */
class TypingBoard extends Component {

	render() {
		return (
			<View style={styles.typingView}>
				<View style={styles.inputView}>
					<TextInput
						style={styles.input}
						onChangeText={this.props.changeText}
						value={this.props.note}
						placeholder='输入留言内容'/>
				</View>
				<Button style={styles.submitBtn} onPress={this.props.submit}>提交</Button>
			</View>
		);
	}

}

const styles = StyleSheet.create({
	container: {
		flex:1
	},
	row: {
		borderBottomWidth: 1,
		borderColor: '#ddd',
		padding: 7
	},
	chatboard: {
		height: 350
	},
	typingView: {
		flexDirection: 'row',
		backgroundColor: '#E3E3E3'
	},
	inputView: {
		flex: 1,
		height: 50
	},
	input: {
		flex: 1,
		fontSize: 16,
		padding: 10
	},
	submitBtn: {
		backgroundColor: '#48EEBC',
		padding: 15,
		width: 80,
		color: '#FFF'
	}
});

module.exports = Notes