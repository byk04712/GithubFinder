'use strict';

import React, { Component, StyleSheet, View } from 'react-native';
import { Router, routerReducer, Route, Container, Animations, Schema } from 'react-native-redux-router';
import { Provider } from 'react-redux/native';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';

const loggerMiddleWare = createLogger();

const createStoreWithMiddleware = applyMiddleware(loggerMiddleWare)(createStore);

const reducer = combineReducers({routerReducer});
let store = createStoreWithMiddleware(reducer);

import Main from './Main.js';
import Dashboard from './components/Dashboard.js';
import Profile from './components/Profile.js';
import Notes from './components/Notes.js';
import Repositories from './components/Repositories.js';
import Web from './components/Web.js';
import Loading from './components/Loading.js';

import { NavBar, NavBarModal, NavBarBase } from './components/NavBar.js';

const modalConfig = {
	sceneConfig: Animations.FlatFloatFromBottom,
	navBar: NavBarModal,
	tintColor: '#FFF'
}

const defaultConfig = {
	sceneConfig: Animations.FlatFloatFromRight,
	navBar: NavBar,
	tintColor: '#FFF'
}

const basicConfig = {
	navBar: NavBarBase,
	tintColor: '#FFF'
}

const tabConfig = {
	navBar: NavBar,
	tintColor: '#FFF'
}

/**
 * 项目主框架
 */
class Index extends Component {
	render() {
		return (
			<Provider store={store}>
				{() => <MainContainer/>}
			</Provider>
		);
	}
}

class MainContainer extends Component {

	render() {
		return (
			<View style={styles.container}>
				<Router>
					<Schema name='modal' {...modalConfig} />
					<Schema name='default' {...defaultConfig} />
					<Schema name='basic' {...basicConfig} />
					<Schema name='tab' {...tabConfig} />

                    <Route name='main' component={Main} initial={true} schema='basic' hideNavBar={false} title='首页'/>
                    <Route name='dashboard' component={Dashboard} title='用户信息' schema='default'/>
                    <Route name='profile' component={Profile} title='详细信息' hideNavBar={true} schema='modal'/>
                    <Route name='notes' component={Notes} title='聊天'/>
                    <Route name='repos' component={Repositories} schema='defalut' hideNavBar={true} title='代码库'/>
                    <Route name='web' component={Web} schema='modal' hideNavBar={false}/>
				</Router>
			</View>
		);
	}

}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});

module.exports = Index;