import React, { Component } from 'react';
import { StyleSheet, Platform, BackAndroid, ToastAndroid, View } from 'react-native';
import NavigationBar from 'react-native-navbar';

/**
 * 顶部导航栏
 */
class NavBarBase extends Component {

	onBackAndroid() {
		const nav = this.props.navigator;
		const routes = nav.getCurrentRoutes();

		if (routes.length > 1) {
			nav.pop();
			return true;
		}
		if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
			//最近2秒内按过back键，可以退出应用
			return false;
		}
		this.lastBackPressed = Date.now();
		ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
		return true;
	}

	render() {
		let Actions = this.props.routes;
		let statusBarConfig = {
			style: 'light-content',	//light-content/default
			hidden: true
		};
		let titleConfig = {
			title : this.props.title || '',
			tintColor: this.props.tintColor || '#333'
		}
		let style;
		if(statusBarConfig.hidden) {
			style = {
				paddingTop: 15
			}
		}
		let bgColor = this.props.navbarBgColor || '#0DB0D9';
		return (
			<View style={[style, {backgroundColor: bgColor}]}>
				<NavigationBar
					style={{backgroundColor: bgColor}}
					titleColor='#FFF'
					buttonsColor='#FFF'
					statusBar={statusBarConfig}
					title={titleConfig}
					prevTitle={this.props.initial ? '' : null}
					leftButton={this.props.leftButton || {title:''}}
					rightButton={this.props.rightButton || {title:''}}
				/>
			</View>
		);
	}

	/**
	 * 针对android的返回键
	 */
    componentDidMount() {
    	// BackAndroid在iOS平台下是一个空实现，所以理论上不做这个Platform.OS === 'android'判断也是安全的
    	if (Platform.OS === 'android') {
			BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid.bind(this));
		}
    }

	/**
	 * 针对android的返回键
	 */
    componentWillUnmount() {
    	// BackAndroid在iOS平台下是一个空实现，所以理论上不做这个Platform.OS === 'android'判断也是安全的
    	if (Platform.OS === 'android') {
			BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid.bind(this));
		}
    }
}

class NavBar extends Component {

	render() {
		const Actions = this.props.routes;
		const leftButtonConfig = {
			title: '返回',
			tintColor: '#FFF',
			handler: this.props.onPrev || Actions.pop
		};
		return <NavBarBase {...this.props} leftButton={leftButtonConfig}/>
	}
	
}

class NavBarModal extends Component {

   render() {
		const Actions = this.props.routes;
		const rightButtonConfig = {
			title: '关闭',
			tintColor: '#FFF',
			handler: this.props.onNext || Actions.pop
		};
		return <NavBarBase {...this.props} rightButton={rightButtonConfig}/>
   }

}

const styles = StyleSheet.create({
});

module.exports = { NavBarBase, NavBar, NavBarModal };