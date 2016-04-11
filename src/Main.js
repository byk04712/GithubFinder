'use strict';

import React, {
  AppRegistry,
  Component,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicatorIOS,
  TextInput,
  StyleSheet,
  Platform
} from 'react-native';

import api from './Utils/api.js';
import Dashboard  from './Components/Dashboard.js';
import Loading from './Components/Loading.js';
import * as Screen from './Utils/Screen.js';

export default class Main extends Component {

	constructor(props) {
		super(props);
		this.state = {
			username: '',
			isLoading: false,
			error: false
		}
	}

	render() {
		var showErr = this.state.error ? <Text style={styles.errText}>{this.state.error}</Text> : null;
		var loadingView = this.state.isLoading ? <Loading/> : null;
		return (
		    <View style={styles.container}>
		    	<Text style={styles.title}>到github上寻找大神</Text>
		    	<TextInput
		    		style={styles.input}
					value={this.state.username}
					placeholder='在此输入大神的github帐号'
					onChange={this.handleChange.bind(this)} />
		    	<TouchableOpacity onPress={this.handleSubmit.bind(this)} style={styles.btnBox}>
		    		<Text>开始查找</Text>
		    	</TouchableOpacity>
		    	<View style={styles.msgView}>{loadingView}</View>
		    	<View style={styles.msgView}>{showErr}</View>
		    </View>
		);
	}

	handleChange(event) {
		this.setState({
			username: event.nativeEvent.text
		});
	}

	handleSubmit() {
		const { route, navigator } = this.props;
		//update our indicatorIOS spinner
		this.setState({
			isLoading: true,
			error: false
		});
		//fetch data from github
		api.getBio(this.state.username).
			then((res) => {
				if(res.message === 'Not Found'){
					this.setState({
						error: '没有找到这位大神',
						isLoading: false
					});
				}else{
					if (navigator) {
						navigator.push({
							name: 'dashboard',
							component: Dashboard,
							params: {
								userInfo: res
							}
						});
					}
					this.setState({
						isLoading: false,
						error: false,
						username: ''
					})
				}
			});
	}

};

const styles = StyleSheet.create({
	container: {
    	flex:1,
    	paddingTop:60,
    	justifyContent:'center',
    	alignItems:'center'
    },
    title: {
    	margin: 10,
    	fontSize: 20
    },
    input: {
		height:50,
		borderWidth:1,
		borderColor:'#ddd',
		borderStyle:'solid',
		padding: 0,
		margin:20,
	},
	btnBox: {
		width:300,
		backgroundColor:'#fad261',
		borderRadius:10,
		height:40,
		alignItems:'center',
		justifyContent:'center',
		marginBottom:60
	},
	load: {
		height: 50,
		alignItems: 'center',
		justifyContent: 'center'
	},
	msgView: {
		height: 50,
		width: Screen.width,
		alignItems: 'center',
		justifyContent: 'center'
	},
	errText: {
		color: '#ff6600'
	}
});