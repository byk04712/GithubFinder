import React, {
	View,
	Component,
	StyleSheet,
	Text,
	ScrollView,
	TouchableHighlight
} from 'react-native';

import Badge from './Badge.js';
import Separator from '../Helpers/Separator.js';
import Web from '../Helpers/Web.js';

const styles = StyleSheet.create({
	container:{
		flex:1,
	},
	rowContainer:{
		flexDirection:'column',
		flex:1,
		padding: 10
	},
	name:{
		color:'#48bbec',
		fontSize:18,
		paddingBottom:5
	},
	starts:{
		color:'#48bbec',
		fontSize:14,
		paddingBottom:5
	},
	description:{
		fontSize:14,
		paddingBottom:5
	},
	backButton: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		height: 40,
		flex: 1,
		margin: 20,
		borderRadius: 5,
		backgroundColor: '#698ebf'
	}
});

export default class Repositories extends Component{
	openPage(url) {
		this.props.navigator.push({
			title: 'WebView',
			component: Web,
			params: {
				html_url: url
			}
		})
	}
	render() {
		var { route, navigator } = this.props;
		var { userInfo, repos } = route.params;
		var list = repos.map((item, index) => {
			var desc = repos[index].description ? <Text style={styles.description}>{repos[index].description}</Text>:<View/>;
			return (
				<View key={index}>
					<View style={styles.rowContainer}>
						<TouchableHighlight
							onPress={this.openPage.bind(this, repos[index].html_url)}
							underlay='transparent'
						>
							<Text style={styles.name}>{repos[index].name}</Text>
						</TouchableHighlight>
						<Text style={styles.starts}>Stars: {repos[index].stargazers_count}</Text>
						{desc}
					</View>
					<Separator/>
				</View>
			);
		});
		return (
			<ScrollView styles={styles.container}>
				<Badge userInfo={userInfo}/>
				{list}
				<TouchableHighlight onPress={() => {
					if(navigator) {
			            navigator.pop();
			        }
				}}
				style={styles.backButton}
				>
					<Text>返回</Text>
				</TouchableHighlight>
			</ScrollView>
		);
	}
}

