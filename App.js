import React from "react";
import { Alert, View, StyleSheet, Text,Image  } from "react-native";
import CameraScreen from "./screens/camera";
import Quiz from "./screens/quiz";
// import { Image } from 'expo';
import { Button } from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome';


//import { createStackNavigator, createAppContainer } from "react-navigation";

// const RootStack = createStackNavigator({
//   CameraScreen,

// })

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
     
    };
  }

  startMcqs = () => {
    this.setState({ startMcqs: true });

    console.log("start mcqs");
  };

  result = (obt, total) => {
    console.log(obt, total);
    console.log("-----");
    this.setState({
      resulted: true,
      home: false,
      startMcqs: false,
      started: false,
      obt,
      total
    });
  };
  render() {
    const { home, startMcqs, started, resulted, obt, total } = this.state;
 
    if (!home && !resulted) {
      return (
        <View style={styles.container}>

< View>

<Image style={styles.welcomeImage}
            source={
              

               require('./assets/image.gif')
            }
            style={styles.welcomeImage}
          />
          </View>
          <Button
            style={{backgroundColor:"#2289F"}}
            onPress={() => {
              this.setState({ home: true });
            }}
            icon={
              <Icon
                name="arrow-right"
                size={15}
                color="white"
              />
            }
            title="  Login by face detector"
            
            //accessibilityLabel="Learn more about this purple button"
          />
        </View>
      );
    } else if (home && !startMcqs) {
      return <CameraScreen startMcqs={this.startMcqs} />;
    } else if (home && startMcqs && !started) {
      return (

        <View style={styles.container}>

        < View>

<Image style={styles.welcomeImage}
            source={
              

               require('./assets/quiz.gif')
            }
            style={styles.welcomeImage}
          />
          </View>
          <Button
            onPress={() => {
              this.setState({ started: true });
            }}
            icon={
              <Icon
                name="arrow-right"
                size={15}
                color="white"
              />
            }
            title="  Start Quiz"
            color="red"
            // accessibilityLabel="Learn more about this purple button"
          />
        </View>
      );
    } else if (home && startMcqs && started) 
     { 
       return (
        <View style={styles.container}>
        <Quiz
          result={(obt, total) => {
            this.result(obt, total);
          }}
        />
        </View >
      );
     } else if (resulted && !home) {
      return (
        <View style={styles.container}>
          <Text style ={styles.result}>
            You Got {obt} / {total}
          
          </Text>
          
          <Button
          backgroundColor="2289F0"
            title=" Start Again"

            onPress={() => {
              this.setState({ home: false, resulted: false });

            }}
            icon={
              <Icon
                name="arrow-right"
                size={15}
                color="white"
              />
            }
          />
        </View>

     );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  welcomeImage :{
width: 500,
height : 500
  },
  result:{
    fontSize: 20,
    fontWeight: "bold"
  }
});
