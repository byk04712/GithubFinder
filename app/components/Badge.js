import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text, Image } from 'react-native';

class Badge extends Component {

	render() {
		return (
			<View style={styles.portraitView}>
				<Image source={{uri:this.props.uri}} style={styles.portrait}/>
				<Text style={styles.name}>{this.props.name}</Text>
				<Text style={styles.login}>{this.props.login}</Text>
			</View>
		);
	}

}

const styles = StyleSheet.create({
	portraitView: {
		height: 200,
		backgroundColor: '#48BBEC',
		paddingTop: 25,
		alignItems: 'center'
	},
	portrait: {
		width: 100,
		height: 100,
		borderRadius: 50
	},
	name: {
		fontSize: 22,
		marginTop: 5,
		color: '#FFF'
	},
	login: {
		fontSize: 18,
		marginTop: 5,
		color: '#FFF'
	}
})

module.exports = Badge;