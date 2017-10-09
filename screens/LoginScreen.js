import React from 'react';
import { ScrollView, TextInput, AppRegistry, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import firebase from 'firebase';
import Loader from '../components/Loader.js';

export default class LoginScreen extends React.Component {
  state = {
    email: '',
    password: '',
    error: '',
    loading: false,
  }

  onButtonPress() {
    const { email, password } = this.state;
    this.setState({error: '', loading: true});

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(this.onAuthSuccess.bind(this))
    .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(this.onAuthSuccess.bind(this))
            .catch(this.onAuthFailed.bind(this));
    });
  }

  onAuthSuccess() {
      this.setState({
          email: '',
          password: '',
          error: '',
          loading: false,
      });
      console.log('Authentication Succeeded')      
  }

  onAuthFailed() {
      this.setState({
          error: 'Authentication Failed',
          loading: false,
      });
      console.log('Authentication Failed')      
  }

  renderLoader() {
      if(this.state.loading) {
          return <Loader size="large" />
      } else {
          return <Text style={styles.loginText}>Log In/Sign Up</Text>
      }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.inputContainer}>
            <Text style={styles.title}>Invenstory</Text>
            <TextInput 
                text={this.state.email}
                onChangeText={email => this.setState({ email })}
                placeholder="Email"
                placeholderTextColor="#E7DFDD"
                returnKeyType="next"
                autoCapitalize="none"
                autoCorrect={false}
                onSubmitEditing={() => this.passwordInput.focus()}
                style={styles.input}
            />
            <TextInput
                text={this.state.password}
                onChangeText={password => this.setState({ password })}
                placeholder="Password"
                placeholderTextColor="#E7DFDD"                
                returnKeyType="go"
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
                ref={(input) => this.passwordInput = input}
                style={styles.input}
            />
            <TouchableOpacity style={styles.buttonContainer} onPress={this.onButtonPress.bind(this)}>
                {this.renderLoader()}
            </TouchableOpacity>
        </View>
      </ScrollView>
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
});

