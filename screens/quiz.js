import React, { Component } from "react";
import { CheckBox } from "react-native";
import { View, StyleSheet, Text, TouchableWithoutFeedback, Alert } from "react-native";
import RadioButton from "radio-button-react-native";
import { Button } from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome';
// import Button from "react-native-elements"

class Quiz extends Component {
  constructor() {
    super();
    this.state = {
      selectedOption: "Option 1",
      show: false,
      num: 0,
      answers: [],
      ansOf: "----------",
      list: [],
      arr: [],
      disabled: true 

    };

  }
  handleOnPress(value) {
    this.setState({ value: value })
  }
  

  componentDidMount() {
    this.listData();
  }

  listData = () => {
    const th = this;
    fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=boolean")
      .then(function (response) {
        return response.json();
      })

      .then(function (myJson) {
        var arr = myJson.results;
        arr = arr.map(temp => {
          temp.incorrect_answers.splice(Math.floor(Math.random() * (temp.incorrect_answers.length + 1)), 0, temp.correct_answer);
          return temp;

        });
        th.setState({ list: arr,show: true })
      });
  };

  render() {
    
    const { list, num, show, ansOf, answers } = this.state;
    
console.log("TEST====>",list)
    return (
      <View style={styles.container}>
        {show && 
          <View >
            <Text style={styles.titleText}>{list[num].question}</Text>
            {list[num].incorrect_answers.map(res => {




              return (      
                  <View style={styles.radio}>
                  <RadioButton 
                    currentValue={this.state.ansOf}
                    value={res}
                   
                    onPress={() => { 
                               
                      this.setState({ ansOf: res}, () => {
                        if (res == true ){
                          this.setState({
                            disabled: !this.state.disabled
                          })
                          this.state.disabled
                        }
                        else{
                          this.setState({
                            disabled : false

                          })
                         
                        }
                      });

                    }}
                  >
                 

                    <Text style={styles.baseText}>
                      {res}
                    </Text>
                  </RadioButton>
                </View>
              
              );
            })
            }
            {num < list.length -1 && <Button
icon={
  <Icon
    name="arrow-right"
    size={15}
    color="white"
  />
}
              disabled = {this.state.disabled}
              onPress={() => {
                console.log("next");
                let ls = answers;
                ls.push(ansOf);
                this.setState({ num: num + 1, answers: ls, ansOf:"",  }, () => {
                  
                    console.log(answers);
                 

                  
                });
              }}
             
              title="Next"
            
              
            />}
             {num==list.length-1 && <Button 
icon={
<Icon
  name="arrow-right"
  size={15}
  color="white"
/>
}
onPress={() => {
  console.log("next");
  let ls = answers;
  if(answers.length < list.length){
  ls.push(ansOf);
  this.setState({answers: ls,ansOf: "--------------"},() => {
    console.log(answers);

    var marks = 0;
    list.map((res,ind) => {
      if(res.correct_answer == answers[ind]){
        marks++;
      }
    })

    Alert.alert("completed and you got " + marks + " marks out of " + answers.length);
    this.props.result(marks,answers.length); 
  });
  }
  
}}
title="Finish"
/>} 
          
      </View>
}
</View >
    );
  }
}

export default Quiz;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  baseText: {
    
    fontFamily: "Cochin",

    fontSize: 20,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold"
  },
  radio:{
    marginVertical: 15,
   

  },

});


























//  {num==list.length-1 && <Button 
// onPress={() => {
//   console.log("next");
//   let ls = answers;
//   if(answers.length < list.length){
//   ls.push(ansOf);
//   this.setState({answers: ls,ansOf: "--------------"},() => {
//     console.log(answers);

//     var marks = 0;
//     list.map((res,ind) => {
//       if(res.correct_answer == answers[ind]){
//         marks++;
//       }
//     })

//     Alert.alert("completed and you got " + marks + " marks out of " + answers.length);
//     this.props.result(marks,answers.length); 
//   });
//   }
  
// }}
// title="Finish"
// />} 