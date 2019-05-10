import React, { Component } from 'react';
import { 
    Dimensions, 
    StyleSheet, 
    Text, 
    View 
} from 'react-native';

import MainNav from './app/components/nav/MainNav';
import { Provider } from 'react-redux';
import { store } from './app/common/Store';

export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            screenStyle: styles
        }
    }

    render() {
        return (
            <Provider store={store}>
                <View style={this.state.screenStyle.rootView}>
                    <MainNav />
                </View>
            </Provider>
        );
    }
}


let styles = StyleSheet.create({
    rootView: {
        flex: 1
    }
});