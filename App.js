import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

import Header from './app/components/head/Header';
import MainNav from './app/components/nav/MainNav';

export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            screenStyle: styles
        }
    }
  
    _onlayout=()=>{
        let {width, height} = Dimensions.get('window');
        if(width > height) {
            this.setState({screenStyle: horizontal_styles});
        } else {
            this.setState({screenStyle: styles});
        }
    }

    render() {
        return (
            <View style={this.state.screenStyle.rootView} onLayout={this._onlayout}>
                <Header style={this.state.screenStyle.headerView} title='MY FIRST APP' />
                <View style={this.state.screenStyle.mainView}>
                    <MainNav />
                </View>
            </View>
        );
    }
}


let styles = StyleSheet.create({
    rootView: {
        flex: 1
    },

    headerView: {
        flex: 1
    },

    mainView: {
        flex: 8,
        backgroundColor: '#ddd'
    }
});


let horizontal_styles = StyleSheet.create({
    rootView: {
        flex: 1
    },

    headerView: {
        flex: 1
    },

    mainView: {
        flex: 6,
        backgroundColor: '#333',
    }
});