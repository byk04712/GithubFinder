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

import { NavBar, NavBarModal } from './components/NavBar.js';

class Index extends Component {
	render() {
		return (
			<Provider store={store}>
				{() => <MainContainer/>}
			</Provider>
		);
	}
}

import Loading from './components/Loading.js';

class MainContainer extends Component {

	render() {
		return (
			<View style={styles.container}>
				<Router>
					<Schema name='modal' sceneConfig={Animations.FlatFloatFromBottom} navBar={NavBarModal} />
					<Schema name='default' sceneConfig={Animations.FlatFloatFromRight} navBar={NavBar} />
					<Schema name='withoutAnimation' navBar={NavBar} />
					<Schema name='tab' navBar={NavBar} />

                    <Route name='main' component={Main} initial={true} hideNavBar={true} title='首页'/>
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
	},
	block: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		backgroundColor: '#F5FCFF'
	}
});

module.exports = Index;