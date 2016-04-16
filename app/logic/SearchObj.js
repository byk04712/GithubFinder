import BaseLogicObj from './BaseLogicObj.js';
import API from '../utils/api.js';

class SearchObj extends BaseLogicObj {

	/**
	 * 查询
	 */
    search() {
    	var Actions = this.getProps().routes;
		this.setState({
			disable: true,
			msg: '正在查询中...'
		});
		// 从接口抓取数据
		let { keyword } = this.getState();
		API.getBio(keyword).then((res) => {
			if(res.message === 'Not Found'){
				this.setState({
					disable: false,
					msg: '没有找到这位大神'
				});
			}else{
				Actions.dashboard({
					title: keyword,
					res
				});
				// 还原 state
				this.setState({
					keyword: '',
					disable: false,
					msg: ''
				})
			}
		});
    }

    /**
     * 查询输入框文本改变事件
     */
    changeText(text) {
    	this.setState({keyword: text});
    }

}

module.exports = SearchObj;