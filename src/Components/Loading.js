'use strict';

import React, {
	Component,
	StyleSheet,
	View,
	Text
} from 'react-native';

export default class Loading extends Component {

	render() {
		return (
			<View style={styles.container}>
				<Text>玩命加载中...</Text>
			</View>
		);
	}
	
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center'
	}
});