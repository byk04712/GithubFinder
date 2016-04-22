'use strict';

import React, { Component, StyleSheet, Platform, View } from 'react-native';
import NavigationBar from 'react-native-navbar';

/**
 * 顶部导航栏
 */
class NavBarBase extends Component {

	onPrev() {
		let Actions = this.props.routes;
		if (this.props.onPrev) {
			this.props.onPrev();
			return;
		}
		if (this.props.navigator && this.props.navigator.getCurrentRoutes().length > 1) {
			Actions.pop();
		}
	}

	render() {
		let Actions = this.props.routes;
		let statusBarConfig = {
			style: 'light-content',	//light-content/default
			hidden: true
		};
		let titleConfig = {
			title : this.props.title || '',
			tintColor: this.props.titleColor || '#333'
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
    	if (Platform.OS === 'android') {
			React.BackAndroid.addEventListener('hardwareBackPress', function() {
				this.onPrev();
			});
		}
    }

	/**
	 * 针对android的返回键
	 */
    componentWillUnmount() {
    	if (Platform.OS === 'android') {
			React.BackAndroid.removeEventListener('hardwareBackPress');
		}
    }
}

class NavBar extends Component {

	render() {
		let Actions = this.props.routes;
		let leftButtonConfig = {
			title: '返回',
			handler: this.props.onPrev || Actions.pop
		};
		return <NavBarBase {...this.props} leftButton={leftButtonConfig}/>
	}
	
}

class NavBarModal extends Component {

   render() {
		let Actions = this.props.routes;
		let rightButtonConfig = {
			title: '关闭',
			handler: this.props.onNext || Actions.pop
		};
		return <NavBarBase {...this.props} rightButton={rightButtonConfig}/>
   }

}

const styles = StyleSheet.create({
});

module.exports = { NavBarBase, NavBar, NavBarModal };