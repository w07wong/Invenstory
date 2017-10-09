import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import firebase from 'firebase';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
    header: null,    
  };

  onButtonPress() {
    firebase.auth().signOut()
      .then(this.onSignOutSuccess())
  }

  onSignOutSuccess() {
    alert('Logged out!')
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.buttonContainer} onPress={this.onButtonPress.bind(this)}>
          <Text style={styles.loginText}>Logout</Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#0E0B16',
  },
  title: {
    fontSize: 40,
    fontFamily: 'Avenir',
    color:'#E7DFDD', 
    paddingBottom: '10%',   
  },
  inputContainer: {
    paddingTop: '30%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 50,
    width: '80%',
    textAlign: 'center',
    backgroundColor: '#0E0B16',
    color:'#E7DFDD',
    fontSize: 40,
    fontFamily: 'Avenir',    
    borderRadius:2,
    alignItems: 'center',
    paddingTop: 10,
  },
  buttonContainer: {
    paddingTop: '30%',
    height: 40,
    backgroundColor: '#0E0B16',
    borderRadius: 2,
  },
  loginText: {
    fontFamily: 'Avenir',      
    fontSize: 40,
    color: '#E7DFDD'
  }
})