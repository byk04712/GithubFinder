import BaseLogicObj from './BaseLogicObj.js';
import API from '../utils/api.js';

class RepositoriesObj extends BaseLogicObj {

	/**
	 * 获得用户代码库
	 */
	getRepositories(userInfo) {
		API.getRepos(userInfo.login).then((res)=> {
			this.setState({
				repos: res,
				loaded: true
			})
		});
	}

	/**
	 * 查看代码库详情
	 */
	openPage(html_url) {
		let Actions = this.getProps().routes;
		Actions.web({url: html_url});
	}

}

module.exports = RepositoriesObj;