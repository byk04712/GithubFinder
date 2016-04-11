import React,{
	View,
	WebView,
	StyleSheet,
	Text,
	Component,
	TouchableHighlight
} from 'react-native';

export default class Web extends Component {

	// static propTypes = {
	// 	html_url : React.PropTypes.string.isRequired
	// };

	render() {
		var { route, navigator } = this.props;
		var source = {
			uri : route.params.html_url
		}
		return (
			<View style={styles.container}>
				<WebView source={source}/>
				<TouchableHighlight onPress={() => {
					if(navigator) {
			            navigator.pop();
			        }
				}}
				style={styles.backButton}
				>
					<Text>返回</Text>
				</TouchableHighlight>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container:{
		flex:1,
		backgroundColor:'#dddddd',
		flexDirection:'column'
	},
	backButton: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		height: 40,
		backgroundColor: '#698ebf'
	}
});