'use strict';

import React, {
	View,
	Text,
	ScrollView,
	Component,
	StyleSheet,
	TouchableOpacity
} from 'react-native';

import Badge from './Badge.js';
import Separator from '../Helpers/Separator.js';

export default class Profile extends Component {

	getRowTitle(item) {
		item = (item === 'public_repos') ? item.replace('_', ' ') : item;
		return item[0] ? item[0].toUpperCase() + item.slice(1) : item;
	}

	render() {
		var { route, navigator } = this.props;
		var { userInfo } = route.params;
		var topicArr = [
			'company',
			'blog',
			'location',
			'email',
			'bio',
			'type',
			'site_admin',
			'created_at',
			'hireable',
			'public_repos'
		];
		var list = topicArr.map((item, index) => {
			if(!userInfo[item]) {
				return <View key={index}/>
			} else {
				return (
					<View key={index}>
						<View style={styles.rowContainer}>
							<View>
								<Text style={styles.rowTitle}>{this.getRowTitle(item)}</Text>
								<Text style={styles.rowContent}>{userInfo[item]}</Text>
							</View>
						</View>
						<Separator/>
					</View>
				);
			}
		});
		return (
			<ScrollView>
				<Badge userInfo={userInfo}/>
				{list}
				<TouchableOpacity onPress={() => {
					if(navigator) {
			            navigator.pop();
			        }
				}}
				style={styles.backButton}
				>
					<Text>返回</Text>
				</TouchableOpacity>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex:1,
	},
	buttonText:{
		fontSize:18,
		color:'white',
		alignSelf:'center'
	},
	rowContainer:{
		padding:10
	},
	rowTitle:{
		color:'#488bec',
		fontSize:16
	},
	rowContent:{
		fontSize:19
	},
	backButton: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		height: 40,
		flex: 1,
		margin: 20,
		borderWidth: 1,
		borderColor: '#333333',
		borderStyle: 'solid',
		borderRadius: 5,
		backgroundColor: '#698ebf'
	}
});