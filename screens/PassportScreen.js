import React from 'react';
import { View, StyleSheet, FlatList, Platform, TouchableOpacity, Text, NativeModules, TextInput } from 'react-native';
import Expo from 'expo';

const Web3 = require('web3');
const web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));

const abi = JSON.parse('[{"constant":false,"inputs":[{"name":"boxID","type":"uint256"},{"name":"name","type":"bytes32"}],"name":"packBox","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"boxCount","outputs":[{"name":"n","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"n","type":"bytes32"}],"name":"newBox","outputs":[{"name":"boxID","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"boxID","type":"uint256"}],"name":"getItems","outputs":[{"name":"selectedItems","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"boxID","type":"uint256"}],"name":"getBoxName","outputs":[{"name":"n","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"}]');


export default class PassportScreen extends React.Component {
  static navigationOptions = {
    title: 'Invenstory',
    header: null,    
  };
  constructor(props) {
    super(props);

    this.state = {
      numbers: 0,
      account: '',
      boxName: '',
      dataArr: []
    }
  }

  inventoryContract = web3.eth.contract(abi);
  contractInstance = this.inventoryContract.at('0x88f0145d86c25a15cb141e25eaeb2d47e13f6e9e');  
  
  getAccount() {
    const self = this;
    testAccount = web3.eth.getAccounts(function(err, result) {
      if(err) return err;
      else {
        self.setState(function(previousState) {
          return { account: String(result[0]) };
        });
      }
    });
  }

  testOutput() {
    const self = this;
    this.contractInstance.boxCount(function(err, result) {
      self.setState(function(previousState) {
        return { numbers: parseInt(result + '', 10) };
      });
    });
  }

  onCreatePress() {
    this.contractInstance.newBox(this.state.boxName, {from: this.state.account}, function(err, result) {
      if(!err) console.log(result);
      else console.log(err);
    });
  }

  onViewData() {
    alert("Mike's Resume, Robin's Attorney Phone Number, RocketLaunch's ICO whitepaper, Access Codes for the food room.")
  }
  
  refreshPage() {
    Actions.refresh()
  }

  populateDataStruct() {
    num = this.testOutput()
    for(var i = 0; i < num; i++) {
      this.contractInstance.getBoxName(i, function(err, result) {
        self.setState(function(previousState) {
          return { dataArr: dataArr + [{key: result.toString()}] };
        });
      })
    }
  }

  componentWillMount() {
    this.populateDataStruct()
    this.getAccount()
    //this.testOutput()
  }

  render() {
    this.testOutput()    
    return (
      <View style={styles.container}>
        <FlatList style={styles.flatList}
        data={[
          {key: 'Toys'},
          {key: 'Photos'},
          {key: 'Magazines'},
          {key: 'Moving'},
          {key: 'Work Inventory'},
          {key: 'Shared Documents'},
        ]}
        renderItem={({item}) => <TouchableOpacity onPress={this.onViewData.bind(this)}><Text style={styles.list}>{item.key}</Text></TouchableOpacity>}
      />
      <Text style={styles.loginText}>{this.state.numbers}</Text>
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
  },
  list: {
    color: '#E7DFDD',
    fontFamily: 'Avenir',      
    fontSize: 40,
  }, 
  flatList: {

  }
});

class TouchIDExample extends React.Component {
    state = {
      waiting: false,
    };
  
    render() {
      let authFunction;
  
      if (Platform.OS === 'android') {
        authFunction = async () => {
          this.setState({ waiting: true });
          try {
            let result = await NativeModules.ExponentFingerprint.authenticateAsync();
            if (result.success) {
              alert('Authenticated!');
            } else {
              alert('Failed to authenticate');
            }
          } finally {
            this.setState({ waiting: false });
          }
        };
      } else if (Platform.OS === 'ios') {
        authFunction = async () => {
          let result = await NativeModules.ExponentFingerprint.authenticateAsync(
            'Show me your finger!'
          );
          if (result.success) {
            alert('Success!');
          } else {
            alert('Cancel!');
          }
        };
      }
  
      return (
        <View style={{ padding: 10 }}>
          <TouchableOpacity onPress={authFunction}>
            <Text>{this.state.waiting
              ? 'Waiting for fingerprint... '
              : 'Authenticate with fingerprint'}</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
  

  /*
  <FlatList style={styles.flatList}
        data={[
          {key: 'Toys'},
          {key: 'Photos'},
          {key: 'Magazines'},
          {key: 'Moving'},
          {key: 'Work Inventory'},
          {key: 'Shared Documents'},
        ]}
        renderItem={({item}) => <TouchableOpacity onPress={this.onViewData.bind(this)}><Text style={styles.list}>{item.key}</Text></TouchableOpacity>}
      />
      */