import {
	NetInfo,
	Platform
} from 'react-native';
import configure from '../utils/configure';
import codePush from 'react-native-code-push';

/**
 * 是否可以更新
 */
export function shoudSync() {
	return NetInfo.fetch().then(reach => {
		// if (__DEV__) return false;

		if (Platform.OS === 'ios') {
			return reach === 'wifi';
		} else {
			return ['WIFI', 'VPN'].indexOf(reach) > -1;
		}
	});
}

/**
 * 更新
 */
export function sync() {
	shoudSync().done((shoudSync) => shoudSync && codePush.sync({
		deploymentKey: configure.code_push.PRODUCTION_KEY
	}));
}