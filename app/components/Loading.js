import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, Text } from 'react-native';

/**
 * 加载中组件
 */
class Loading extends Component {

	static propTypes = {
		loadingText: PropTypes.string,
		textStyle: Text.propTypes.style
	};

	static defaultProps = {
		loadingText: '加载中...'
	};

	render() {
		return (
			<View style={styles.container}>
				<Text style={this.props.textStyle || styles.textStyle}>{this.props.loadingText}</Text>
			</View>
		);
	}
	
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center'
	},
	textStyle: {
		color: '#999',
		padding: 15
	}
});

module.exports = Loading