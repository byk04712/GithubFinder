import React, { Component } from 'react';
import { StyleSheet, WebView, View, TouchableOpacity, Text } from 'react-native';
import Loading from '../components/Loading.js';

/**
 * 
 */
class Web extends Component {

	render() {
		return (
			<View style={styles.container}>
				<WebContainer url={this.props.url}/>
			</View>
		);
	}
	
}

class WebContainer extends Component {

	render() {
		let source = {
			uri: this.props.url
		}
		return (
			<WebView source={source}
				startInLoadingState={true}
				renderLoading={()=><Loading/>}
				onError={this._onError}
			/>
		);
	}

	_onError() {
		return (<Loading textStyle={styles.textStyle} loadingText='加载失败了 ～_～！'/>);
	}

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	},
	textStyle: {
		color: '#DF0000'
	}
});

module.exports = Web