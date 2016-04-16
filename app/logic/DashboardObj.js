import BaseLogicObj from './BaseLogicObj.js';
import API from '../utils/api.js';

class DashboardObj extends BaseLogicObj {

	/**
	 * 查看详情
	 */
	goToProfile() {
		let Actions = this.getProps().routes;
		Actions.profile({userInfo: this.getState().userInfo});
	}

	/**
	 * 留言
	 */
	goToNotes() {
		let Actions = this.getProps().routes;
		let userInfo = this.getState().userInfo;
		Actions.notes({title: userInfo.name, userInfo});
	}

	/**
	 * 查看代码库
	 */
	goToRepos() {
		let Actions = this.getProps().routes;
		let userInfo = this.getState().userInfo;
		Actions.repos({userInfo});
	}

	/**
	 * 返回
	 */
	goBack() {
		this.getProps().routes.pop();
	}
}

module.exports = DashboardObj;