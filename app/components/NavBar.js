'use strict';

import React, { Component, StyleSheet, Platform, View } from 'react-native';
import NavigationBar from 'react-native-navbar';
import { Router, Route, Animations, Schema } from 'react-native-redux-router';

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
		console.log('Props : ', this.props);
		return <NavigationBar
			style={styles.navBar}
			titleColor='#FFF'
			buttonsColor='#FFF'
			statusBar={{style:'light-content', hidden: false}}
			title={{title:this.props.title||''}}
			prevTitle={this.props.initial ? '' : null}
			leftButton={this.props.leftButton ? this.props.leftButton : {title:''}}
			rightButton={this.props.rightButton ? this.props.rightButton : {title:''}}
		/>
	}

    componentDidMount() {
    	if (Platform.OS == 'android') {
			React.BackAndroid.addEventListener('hardwareBackPress', function() {
				this.onPrev();
			});
		}
    }

    componentWillUnmount() {
    	if (Platform.OS == 'android') {
			React.BackAndroid.removeEventListener('hardwareBackPress');
		}
    }
}

class NavBar extends Component {

	render() {
		let Actions = this.props.routes;
		let leftButtonConfig = {
			title: 'Left',
			handler: this.props.onPrev || Actions.pop
		};
		return <NavBarBase customNext={<View/>} {...this.props} leftButton={leftButtonConfig}/>
	}
	
}

class NavBarModal extends Component {

   render() {
		let Actions = this.props.routes;
		let rightButtonConfig = {
			title: 'Close',
			handler: this.props.onNext || Actions.pop
		};
		return <NavBarBase customPrev={<View/>} nextTitle="Close" {...this.props} rightButton={rightButtonConfig}/>
   }

}

const styles = StyleSheet.create({
	navBar: {
		backgroundColor: '#0DB0D9'
	}
});

module.exports = { NavBar, NavBarModal };