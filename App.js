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

    render() {
        return (
            <View style={this.state.screenStyle.rootView}>
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