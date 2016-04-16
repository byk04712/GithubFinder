import BaseLogicObj from './BaseLogicObj.js';
import API from '../utils/api.js';
import { ListView } from 'react-native';

class NotesObj extends BaseLogicObj {

	/**
	 * 获取历史数据
	 */
	getChatRecords(userInfo = {}) {
		let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		//获取用户notes数据
		API.getNotes(userInfo.login).then((res = {}) => {
			let chatArrays = this._objectToArray(res);
			this.setState({
				notes: dataSource.cloneWithRows(chatArrays),
				loaded: true
			});
		});
	}

	/**
	 * 将对象转换为数组
	 */
	_objectToArray(obj) {
		let chatArrays = [];
		for(let field in obj) {
			chatArrays.push(obj[field]);
		}
		return chatArrays;
	}

	submit() {
		// let self = this;
		let { login } = this.getProps().userInfo;
		let note = this.getState().note;
		let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.setState({
			note: '',
			// loaded: false
		});
		API.addNote(login, note).then(() => {
			API.getNotes(login).then((data) => {
				let chatArrays = this._objectToArray(data);
				this.setState({
					notes: dataSource.cloneWithRows(chatArrays),
					loaded: true
				});
			});
		}).catch((err) => {
			console.warn('请求异常 ', err);
		});
	}

	changeText(text) {
		this.setState({
			note: text
		});
	}

	/**
	 * 返回
	 */
	goBack() {
		this.getProps().routes.pop();
	}
}

module.exports = NotesObj;