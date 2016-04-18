'use strict';

import React, { Component, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux/native';
import {
  actions as routerActions,
  NavBar,
  Route,
  Router,
  Schema,
  TabBar,
  TabRoute
} from 'react-native-router-redux';

import Detail from '../components/Detail';
import Master from '../components/Master';
import Launch from '../components/Launch';

const mapStateToProps = state => ({
  router: state.router,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...routerActions,
  }, dispatch),
  dispatch,
});

const defaultSchema = {
  navBar: NavBar,
  navLeftColor: '#FFFFFF',
  navTint: '#224655',
  navTitleColor: '#FFFFFF',
  navTitleStyle: {
    fontFamily: 'Avenir Next',
    fontSize: 18,
  },
  statusStyle: 'light-content',
  tabBar: TabBar,
};

const assets = {
  'calendar': require('../../assets/thin-0021_calendar_month_day_planner.png'),
  'home': require('../../assets/thin-0046_home_house.png'),
  'logo': require('../../assets/qwikly.png'),
  'profile': require('../../assets/thin-0091_file_profile_user_personal.png'),
  'video': require('../../assets/thin-0592_tv_televison_movie_news.png'),
};

class Application extends Component {
  render() {
    return (
      <Router {...this.props} assets={assets} initial="tab1">
        <Schema name="default" {...defaultSchema} />

        <Route name="launch" component={Launch} type="reset" hideNavBar={true} />
        <Route name="detail" component={Detail} hideFooter={true}/>
        <TabRoute name="tabBar" barTint='#FFFFFF' tint="#32DEAF">
          <Route name="tab1" component={Master('#111')} title="首页" tabItem={{icon: assets['home'], title: '首页'}} />
          <Route name="tab2" component={Master()} title="日期时间" tabItem={{icon: assets['calendar'], title: '日期'}} />
          <Route name="tab3" component={Master('#666')} title="电视频道" tabItem={{icon: assets['video'], title: '视频'}} />
          <Route name="tab4" component={Master('#999')} title="关于我" tabItem={{icon: assets['profile'], title: '个人中心'}} />
        </TabRoute>
      </Router>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Application);
