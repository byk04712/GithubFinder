'use strict';

import React, {
	View,
	StyleSheet,
	Component,
} from 'react-native';

var styles = StyleSheet.create({
	separator: {
		flex:1,
		marginLeft: 15,
		height:1,
		backgroundColor:'#e4e4e4'
	}
});

class Separator extends Component {
	render() {
		return <View style={styles.separator}/>
	}
}

module.exports = Separator;