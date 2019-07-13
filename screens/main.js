import React from 'react';
import { Alert, View, StyleSheet } from 'react-native';
import { Button } from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome';
export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Button
        icon={
          <Icon
            name="arrow-right"
            size={15}
            color="white"
          />
        }
  //onPress={() => {Alert.alert("Clicked")}}
  title="Start Mcqs"
  color="#841587"
  //accessibilityLabel="Learn more about this purple button"
/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
