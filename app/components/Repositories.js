import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native';
import Badge from './Badge.js';
import RepositoriesObj from '../logic/RepositoriesObj.js';
import Loading from '../components/Loading.js';

class Repositories extends Component {

	constructor(props) {
		super(props);
		this.state = {
			repos: null,
			loaded: false
		}
	}

	componentWillMount() {
		//初始化业务逻辑对象
		this.repositoriesObj = new RepositoriesObj(this);

		//初始化数据
		this.repositoriesObj.getRepositories(this.props.userInfo);
	}

	render() {
		let userInfo = this.props.userInfo;
		return (
			<View style={styles.container}>
				<Badge uri={userInfo.avatar_url} name={userInfo.name} login={userInfo.login}/>
				<RepositoryList {...this.state} openPage={this.repositoriesObj.openPage.bind(this.repositoriesObj)}/>
				<TouchableOpacity
					activeOpacity={.8}
					onPress={this.repositoriesObj.goBack.bind(this.repositoriesObj)}
					style={styles.backButton}>
					<Text style={styles.backButtonText}>返回</Text>
				</TouchableOpacity>
			</View>
		);
	}
	
}

class RepositoryList extends Component {

	render() {
		let component = null;
		if(this.props.loaded) {
			component = this.props.repos.map((item, index) => <Repository openPage={this.props.openPage} key={index} {...item}/>);
		} else {
			component = <Loading/>
		}
		return (
			<View style={{flex:1}}>
				<ScrollView style={styles.scrollView}>
					{component}
				</ScrollView>
			</View>
		);
	}

}

class Repository extends Component {

	render() {
		return (
			<View style={styles.row}>
				<TouchableOpacity activeOpacity={.8} onPress={()=>this.props.openPage(this.props.html_url)}>
					<Text style={styles.repositoryName}>{this.props.name}</Text>
					<View style={styles.descView}>
						<Text style={styles.stars}>Stars: {this.props.stargazers_count}</Text>
						<Text style={styles.description}>{this.props.description}</Text>
					</View>
				</TouchableOpacity>
			</View>
		);
	}

}



const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column'
	},
	scrollView: {
		backgroundColor: '#fff'
	},
	row: {
		margin: 5,
		padding: 5
	},
	repositoryName: {
		backgroundColor: '#B0C4DE',
		color: '#FFF',
		padding: 6,
		paddingLeft: 10
	},
	descView: {
		borderColor: '#B0C4DE',
		borderWidth: 1,
		padding: 10
	},
	stars: {
		fontSize: 14,
		color: '#FF4500'
	},
	description: {
		fontSize: 12,
		color: '#555'
	},
	backButton: {
		height: 50,
		backgroundColor: '#999999',
		justifyContent: 'center',
		alignItems: 'center'
	},
	backButtonText: {
		color: '#FFF',
		fontSize: 16
	}
});

module.exports = Repositories