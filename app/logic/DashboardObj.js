import BaseLogicObj from './BaseLogicObj.js';
import API from '../utils/api.js';

class DashboardObj extends BaseLogicObj {

	/**
	 * 查看详情
	 */
	goToProfile() {
		const Actions = this.getProps().routes;
		const userInfo = this.getState().userInfo;
		Actions.profile({userInfo});
	}

	/**
	 * 留言
	 */
	goToNotes() {
		const Actions = this.getProps().routes;
		const userInfo = this.getState().userInfo;
		Actions.notes({title: userInfo.name, userInfo});
	}

	/**
	 * 查看代码库
	 */
	goToRepos() {
		const Actions = this.getProps().routes;
		const userInfo = this.getState().userInfo;
		Actions.repos({userInfo});
	}

}

module.exports = DashboardObj;