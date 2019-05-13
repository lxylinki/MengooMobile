// import React, {Component} from 'react';
// import {
// 	StyleSheet,
// 	View,
// 	Text
// } from 'react-native';

// import AntDesign from 'react-native-vector-icons/AntDesign';


// export default class CourseStruct extends Component {
// 	constructor(props){
// 		super(props);
// 		this.courseId = this.props.navigation.getParam('id', null);
// 		this.courseName = this.props.navigation.getParam('name', '');
// 		this.teachers = this.props.navigation.getParam('teachers', []);
// 		this.imgSrc = this.props.navigation.getParam('img_src', '');
// 	}

// 	listTeachers(){
// 		let teachers = [];
// 		for(let i in this.teachers) {
// 			let teacher = this.teachers[i];
// 			teachers.push(<Text key={i} style={styles.teacherName}>{teacher.realname}</Text>);
// 		}
// 		return teachers;
// 	}

// 	render(){
// 		return(
// 			<View>
// 				<Text>{'I am Course Struct Page.'}</Text>
// 			</View>
// 		);
// 	}
// }

// let styles = StyleSheet.create({

// });

// import React from 'react';
// import { Animated, Text, View } from 'react-native';

// class FadeInView extends React.Component {
//   state = {
//     fadeAnim: new Animated.Value(0),  // 透明度初始值设为0
//   }

//   componentDidMount() {
//     Animated.timing(                  // 随时间变化而执行动画
//       this.state.fadeAnim,            // 动画中的变量值
//       {
//         toValue: 1000,                   // 透明度最终变为1，即完全不透明
//         duration: 10000,              // 让动画持续一段时间
//       }
//     ).start();                        // 开始执行动画
//   }

//   render() {
//     let { fadeAnim } = this.state;

//     return (
//       <Animated.View                 // 使用专门的可动画化的View组件
//         style={{
//           ...this.props.style,
//           top: fadeAnim,         // 将透明度指定为动画变量值
//         }}
//       >
//         {this.props.children}
//       </Animated.View>
//     );
//   }
// }

// // 然后你就可以在组件中像使用`View`那样去使用`FadeInView`了
// export default class CourseStruct extends React.Component {
//   render() {
//     return (
//       <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//         <FadeInView style={{width: 250, height: 50, backgroundColor: 'powderblue'}}>
//           <Text style={{fontSize: 28, textAlign: 'center', margin: 10}}>Fading in</Text>
//         </FadeInView>
//       </View>
//     )
//   }
// }
import React, { Component } from 'react'
import { StyleSheet, Text, View, Animated, FlatList } from 'react-native'

class List extends Component {
  render() {
    // 模拟列表数据
    const mockData = [
      '富强',
      '民主',
      '文明',
      '和谐',
      '自由',
      '平等',
      '公正',
      '法治',
      '爱国',
      '敬业',
      '诚信',
      '友善'
    ]

    return (
      <FlatList
        onScroll={this.props.onScroll}
        data={mockData}
        renderItem={({ item }) => (
          <View style={styles.list}>
            <Text>{item}</Text>
          </View>
        )}
      />
    )
  }
}

export default class CourseStruct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      headerTop: new Animated.Value(0)
    }
  }

  componentWillMount() {
    // P.S. 270,217,280区间的映射是告诉interpolate，所有大于270的值都映射成-50
    // 这样就不会导致Header在上滑的过程中一直向上滑动了
    this.top = this.state.headerTop.interpolate({
      inputRange: [0, 270, 271, 280],
      outputRange: [0, -50, -50, -50]
    })

    this.animatedEvent = Animated.event([
      {
        nativeEvent: {
          contentOffset: { y: this.state.headerTop }
        }
      }
    ])
  }

  render() {
    return (
      <View style={styles.container}>
        
        <Animated.View style={{ top: this.top }}>
          <View style={styles.header}>
            <Text style={styles.text}>linshuirong.cn</Text>
          </View>
        </Animated.View>

        {/* 在Header组件上移的同时，列表容器也需要同时向上移动，需要注意。 */}
        <Animated.View style={{ top: this.top }}>
          <List onScroll={this.animatedEvent} />
        </Animated.View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  list: {
    height: 80,
    backgroundColor: 'pink',
    marginBottom: 1,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white'
  },
  header: {
    height: 50,
    backgroundColor: '#3F51B5',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: 'white'
  }
})