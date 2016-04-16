'use strict'

/**
 * 所有业务对象基类
 */
class BaseLogicObj {

    constructor(root) {
        if (!root) {
            console.error('实例化BaseLogicObj必须传入root组件对象.');
        }
        this.root = root;
    }

    getState() {
        return this.root.state;
    }

    setState(state) {
        this.root.setState(state);
    }

    getRefs() {
        return this.root.refs;
    }

    getProps() {
        return this.root.props;
    }

}

module.exports = BaseLogicObj;
