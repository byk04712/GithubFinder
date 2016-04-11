'use strict';

import React, {
  Component,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

var api = require('../Utils/api.js');
import Notes from './Notes.js';
import Repositories from './Repositories.js';
import Profile from './Profile.js';

class Dashboard extends Component {

	constructor(props) {
		super(props);
		this.state = {
			id: 2,
			user: null
		}
	}

	makeBackground(btn) {
		var obj = {
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			height: 30,
			flex: 1
		}
		if (btn === 0) {
			obj.backgroundColor = '#48bbec';
		}else if (btn === 1) {
			obj.backgroundColor = '#FAD234';
		}else if (btn === 2) {
			obj.backgroundColor = '#BAbbec';
		}else if (btn === 3) {
			obj.backgroundColor = '#698ebf';
		}
		return obj;
	}

	componentDidMount() {
        //这里获取从FirstPageComponent传递过来的参数: id
        this.setState({
            id: this.props.id
        });
    }

	render() {
		const { route, navigator } = this.props;
		return (
			<View style={{
				paddingTop:60,
				flex:1,
				flexDirection:'column'
			}}>
				<Image source={{
					uri:route.params.userInfo.avatar_url,
				}}
				style={{
					height:300,
					flex:6
				}}/>
				<TouchableOpacity onPress={this.goToProfile.bind(this)}
					style={this.makeBackground(0)}
				>
					<Text>查看大神信息</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={this.goToNotes.bind(this)}
					style={this.makeBackground(1)}
				>
					<Text>给大神留言</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={this.goToRepos.bind(this)}
					style={this.makeBackground(2)}
				>
					<Text>查看大神代码库</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => {
					if(navigator) {
			            //很熟悉吧，入栈出栈~ 把当前的页面pop掉，这里就返回到了上一个页面了
			            navigator.pop();
			        }
				}}
				style={this.makeBackground(3)}
				>
					<Text>返回</Text>
				</TouchableOpacity>
			</View>
		);
	}

	goToProfile() {
		const { route, navigator } = this.props;
		var userInfo = route.params.userInfo;
		navigator.push({
			name: 'profile',
			component: Profile,
			params: {
				userInfo: userInfo
			}
		});
	}

	goToNotes() {
		const { route, navigator } = this.props;
		var userInfo = route.params.userInfo;
		api.getNotes(userInfo.login)
			.then((res)=>{
				res = res || {};
				navigator.push({
					name: 'notes',
					component: Notes,
					params: {
						userInfo: userInfo,
						notes: res
					}
				})
			});
	}

	goToRepos() {
		const { route, navigator } = this.props;
		var userInfo = route.params.userInfo;
		api.getRepos(userInfo.login)
			.then((res)=> {
				navigator.push({
					name: 'repositories',
					component: Repositories,
					params: {
						userInfo: userInfo,
						repos: res
					}
				});
			});
	}

}

module.exports = Dashboard;