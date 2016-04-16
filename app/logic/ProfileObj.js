import BaseLogicObj from './BaseLogicObj.js';

class ProfileObj extends BaseLogicObj {

	/**
	 * 返回
	 */
	goBack() {
		this.getProps().routes.pop();
	}
}

module.exports = ProfileObj;