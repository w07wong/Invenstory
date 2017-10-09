import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import firebase from 'firebase';
//import { default as Web3 } from 'web3';
const Web3 = require('web3');
const web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));

const abi = JSON.parse('[{"constant":false,"inputs":[{"name":"boxID","type":"uint256"},{"name":"name","type":"bytes32"}],"name":"packBox","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"boxCount","outputs":[{"name":"n","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"n","type":"bytes32"}],"name":"newBox","outputs":[{"name":"boxID","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"boxID","type":"uint256"}],"name":"getItems","outputs":[{"name":"selectedItems","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"boxID","type":"uint256"}],"name":"getBoxName","outputs":[{"name":"n","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"}]');

export default class AddScreen extends React.Component {
  static navigationOptions = {
    title: 'Add',
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      numbers: 0,
      account: '',
      boxName: '',
      boxItems: ''
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

  populateBoxesArr() {
    boxes = [];
    a = this.testOutput();
    for(var i = 0; i < a; i++) {
        let name = this.hexToString(this.contractInstance.getBoxName(i).toString());
        let items = this.splitByCommas(this.contractInstance.getItems(i).toString());
        boxes += [name]
    }
  }

  hexToString(hex) {
    var string = '';
    for (var i = 0; i < hex.length; i += 2) {
        string += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return string;
  }

  splitByCommas(s) {
    let sArr = s.split(',');
    var tempArr = [];
    for(var i = 0; i < sArr.length; i++) {
        tempArr.push(this.hexToString(sArr[i]) + '\n');
    }
    return tempArr;
  }

  onCreatePress() {
    this.contractInstance.newBox(this.state.boxName, {from: this.state.account}, function(err, result) {
      if(!err) console.log(result);
      else console.log(err);
    });
  }

  onPackPress() {
    boxIndex = Object.keys(boxes).indexOf(this.state.boxName);    
    this.contractInstance.packBox(boxIndex, this.state.boxItems, {from: this.state.account}, function(err, result) {
      if(!err) alert(result);
      else alert(err);
    });
  }

  componentWillMount() {
    this.getAccount()
    this.testOutput()
    this.populateBoxesArr()
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
        <TextInput 
          text={this.state.boxName}
          onChangeText={boxName => this.setState({ boxName })}
          placeholder="Module Name"
          placeholderTextColor="#E7DFDD"
          returnKeyType="next"
          style={styles.input}
        />
        <TextInput 
        text={this.state.boxName}
        onChangeText={boxItems => this.setState({ boxItems })}
        placeholder="Module Items"
        placeholderTextColor="#E7DFDD"
        returnKeyType="next"
        style={styles.input}
      />
          <TouchableOpacity style={styles.pad} onPress={this.onCreatePress.bind(this)}>
            <Text style={styles.loginText}>Create Inventory</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onPackPress.bind(this)}>
            <Text style={styles.loginText}>Pack Inventory</Text>
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
  buttonContainer: {
    paddingTop: '20%',
    height: 40,
    backgroundColor: '#0E0B16',
    borderRadius: 2,
  },
  pad: {
    paddingTop: '20%'
  },
  loginText: {
    fontFamily: 'Avenir',      
    fontSize: 40,
    color: '#E7DFDD'
  }
})