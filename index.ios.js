'use strict';

import React, {
  AppRegistry,
  Component
} from 'react-native';

//工程1
// import Index from './app/Index.js';
// AppRegistry.registerComponent('GithubFinder', () => Index);


//工程2
import AppContainer from './app1/containers';
AppRegistry.registerComponent('GithubFinder', () => AppContainer);