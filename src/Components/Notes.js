import React, {
	View,
	Text,
	ListView,
	StyleSheet,
	Component,
	TextInput,
	TouchableHighlight,
} from 'react-native';

import api from '../Utils/api.js';
import Badge from '../Components/Badge.js';
import Separator from '../Helpers/Separator.js';

const styles = StyleSheet.create({
	container:{
		flex:1,
		flexDirection:'column'
	},
	buttonText: {
		fontSize:18,
		color:'#fff'
	},
	button:{
		height:60,
		backgroundColor:'#48eebc',
		flex:3,
		alignItems:'center',
		justifyContent:'center'
	},
	input:{
		height:60,
		padding:10,
		fontSize:18,
		color:'#111',
		flex:8
	},
	rowContainer:{
		padding:10
	},
	footContainer:{
		backgroundColor:'#e3e3e3',
		alignItems:'center',
		flexDirection:'row'
	},
	backButton: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		height: 60,
		flex: 3,
		backgroundColor: '#698ebf'
	}
});

export default class Notes extends Component {
	constructor(props){
		super(props);
		this.ds = new ListView.DataSource({rowHasChanged:(row1,row2) => row1 !== row2});
		this.state = {
			dataSource : this.ds.cloneWithRows(this.props.route.params.notes),
			note:'',
			error:''
		}
	}
	handleChange(e) {
		this.setState({
			note: e.nativeEvent.text
		});
	}
	handleSubmit() {
		var { route, navigator } = this.props;
		var { userInfo } = route.params;
		var note = this.state.note;
		this.setState({
			note: ''
		});
		api.addNote(userInfo.login, note)
			.then((data)=>{
				api.getNotes(userInfo.login)
					.then((data) => {
						this.setState({
							dataSource:this.ds.cloneWithRows(data)
						})
					})
			}).catch((err) => {
				console.log('Request error ', err);
				this.setState({
					error
				});
			})
	}

	footer(){
		var { navigator } = this.props;
		return (
			<View style={styles.footContainer}>
				<TouchableHighlight onPress={() => {
					if(navigator) {
			            navigator.pop();
			        }
				}}
				style={styles.backButton}
				>
					<Text>返回</Text>
				</TouchableHighlight>
				<TextInput
					style={styles.input}
					value={this.state.note}
					onChange={this.handleChange.bind(this)}
					placeholder='输入留言内容'
				/>
				<TouchableHighlight
					style={styles.button}
					onPress={this.handleSubmit.bind(this)}
					underlayColor='#88d4f5'
				>
					<Text style={styles.buttonText}>提交</Text>
				</TouchableHighlight>
			</View>
		);
	}
	renderRow(rowData) {
		return (
			<View>
				<View style={styles.rowContainer}>
					<Text>{rowData}</Text>
				</View>
				<Separator/>
			</View>
		);
	}
	render() {
		return (
			<View style={styles.container}>
				<ListView dataSource={this.state.dataSource}
					renderRow={this.renderRow}
					renderHeader={() => <Badge userInfo={this.props.route.params.userInfo}/>}
				/>
				{this.footer()}
			</View>
		);
	}

}