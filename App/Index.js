'use strict';

import React, {
	Component,
	StyleSheet,
	Navigator,
	View,
	Text,
	PropTypes,
	Platform,
} from 'react-native';

import Main from './Main.js';
import Dashboard from './Components/Dashboard.js';
import Notes from './Components/Notes.js';
import Repositories from './Components/Repositories.js';
import Profile from './Components/Profile.js';

var _navigator;
class Index extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		var defaultName = 'main';
		var defaultComponent = Main;
		return (
			<Navigator
                initialRoute={{
                	name: defaultName,
                	component: defaultComponent
                }}
                configureScene={this._configureScene}
                renderScene={this._renderScene}
				style={styles.navigatorBox}
			/>
		);
	}

	_configureScene(route){
		return Navigator.SceneConfigs.FloatFromRight;
    }

    _renderScene(route, navigator){
    	_navigator = navigator;
    	let Component = route.component;
		// switch(route.name){
		// 	case "main":
		// 		Component = Main;
		// 		break;
		// 	case "dashboard":
		// 		Component = Dashboard;
		// 		break;
		// 	case "notes":
		// 		Component = Notes;
		// 	    break;
		// 	case "repositories":
		// 		Component = Repositories;
		// 	    break;
		// 	case "profile":
		// 		Component = Profile;
		// 	    break;
		// 	default:
		// 		Component = DefaultView;
		// }
		return <Component route={route} navigator={navigator} />
    }

    componentDidMount() {
    	if (Platform.OS == 'android') {
			React.BackAndroid.addEventListener('hardwareBackPress', function() {
				if (_navigator && _navigator.getCurrentRoutes().length > 1) {
					_navigator.pop();
					return true;
				}
				return false;
			});
		}
    }

    componentWillUnmount() {
    	if (Platform.OS == 'android') {
			React.BackAndroid.removeEventListener('hardwareBackPress');
		}
    }

}

class DefaultView  extends Component {
    render(){
      return (
          <View style={styles.container}>
              <Text style={styles.welcome}>Default view</Text>
          </View>
      )
    }
}

const styles = StyleSheet.create({
	navigatorBox: {
		flex: 1
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f5f5f5'
	},
	welcome: {
		fontSize: 30,
		textAlign: 'center',
		margin: 10
	}
});

module.exports = Index;