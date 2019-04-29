import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
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
                <MainNav />
            </View>
        );
    }
}


let styles = StyleSheet.create({
    rootView: {
        flex: 1
    }
});


let horizontal_styles = StyleSheet.create({
    rootView: {
        flex: 1
    }
});