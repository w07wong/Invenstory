/*
var browser_inventory_sol_inventoryContract = web3.eth.contract([{"constant":false,"inputs":[{"name":"boxID","type":"uint256"},{"name":"name","type":"bytes32"}],"name":"packBox","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"boxCount","outputs":[{"name":"n","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"n","type":"bytes32"}],"name":"newBox","outputs":[{"name":"boxID","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"boxID","type":"uint256"}],"name":"getItems","outputs":[{"name":"selectedItems","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"boxID","type":"uint256"}],"name":"getBoxName","outputs":[{"name":"n","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"}]);
var browser_inventory_sol_inventory = browser_inventory_sol_inventoryContract.new(
   {
     from: web3.eth.accounts[0], 
     data: '0x6060604052341561000f57600080fd5b6104278061001e6000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806317130f831461006957806344ff038f146100995780634917199d146100c2578063796c5e94146100fd578063910ec7bf1461017557600080fd5b341561007457600080fd5b6100976004808035906020019091908035600019169060200190919050506101b4565b005b34156100a457600080fd5b6100ac61021e565b6040518082815260200191505060405180910390f35b34156100cd57600080fd5b6100e7600480803560001916906020019091905050610227565b6040518082815260200191505060405180910390f35b341561010857600080fd5b61011e600480803590602001909190505061028a565b6040518080602001828103825283818151815260200191508051906020019060200280838360005b83811015610161578082015181840152602081019050610146565b505050509050019250505060405180910390f35b341561018057600080fd5b6101966004808035906020019091905050610371565b60405180826000191660001916815260200191505060405180910390f35b6000600160008481526020019081526020016000209050602060405190810160405280836000191681525081600201600083600101600081548092919060010191905055815260200190815260200160002060008201518160000190600019169055905050505050565b60008054905090565b60008060008154809291906001019190505590506040805190810160405280836000191681526020016000815250600160008381526020019081526020016000206000820151816000019060001916905560208201518160010155905050919050565b610292610396565b6000806000600160008681526020019081526020016000209150600090505b8160010154811015610310578280548060010182816102d091906103aa565b91600052602060002090016000846002016000858152602001908152602001600020600001549091909150906000191690555080806001019150506102b1565b8280548060200260200160405190810160405280929190818152602001828054801561035f57602002820191906000526020600020905b81546000191681526020019060010190808311610347575b50505050509350839350505050919050565b6000806001600084815260200190815260200160002090508060000154915050919050565b602060405190810160405280600081525090565b8154818355818115116103d1578183600052602060002091820191016103d091906103d6565b5b505050565b6103f891905b808211156103f45760008160009055506001016103dc565b5090565b905600a165627a7a723058202fbb02d29cba156653c1716fb19812e3f540b09c32b6c364b4f4c282544262ba0029', 
     gas: '4700000'
   }, function (e, contract){
    console.log(e, contract);
    if (typeof contract.address !== 'undefined') {
         console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
    }
 })
 */
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
abi = JSON.parse('[{"constant":false,"inputs":[{"name":"boxID","type":"uint256"},{"name":"name","type":"bytes32"}],"name":"packBox","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"boxCount","outputs":[{"name":"n","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"n","type":"bytes32"}],"name":"newBox","outputs":[{"name":"boxID","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"boxID","type":"uint256"}],"name":"getItems","outputs":[{"name":"selectedItems","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"boxID","type":"uint256"}],"name":"getBoxName","outputs":[{"name":"n","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"}]');
InventoryContract = web3.eth.contract(abi);
boxes = {"Toys": "box-1", "Photos": "box-2"};

contractInstance = InventoryContract.at('0x88f0145d86c25a15cb141e25eaeb2d47e13f6e9e');

numBoxes = 2;
//var table = document.getElementById("table_id");

function createBox() {
    boxName = $("#box-name").val();
    contractInstance.newBox(boxName, {from: web3.eth.accounts[0]}, function() {
        let div_id = boxes[boxName];
        $("#" + div_id).html(contractInstance.getItems(numBoxes).toString());
        numBoxes++;
    });
    //document.getElementById("box-index").value = boxName;
    boxes += {boxName: "box-" + numBoxes};
}

function packBox() {
    boxName = $("#box-index").val();
    boxIndex = Object.keys(boxes).indexOf(boxName);
    boxItem = $("#box-item").val();
    contractInstance.packBox(boxIndex, boxItem, {from: web3.eth.accounts[0]}, function() {
        let div_id = boxes[boxName];
        alert(div_id);
        let itemsHex = contractInstance.getItems(boxIndex).toString();
        let itemsStr = splitByCommas(itemsHex);
        $("#" + div_id).html(itemsStr);
    });
}

function hexToString(hex) {
    var string = '';
    for (var i = 0; i < hex.length; i += 2) {
        string += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return string;
}

function splitByCommas(s) {
    let sArr = s.split(',');
    var tempArr = [];
    for(var i = 0; i < sArr.length; i++) {
        tempArr.push(hexToString(sArr[i]) + '\n');
    }
    return tempArr;
}

$(document).ready(function() {
    boxNames = Object.keys(boxes);
    for(var i = 0; i < boxNames.length; i++) {
        let name = boxNames[i];
        let items = contractInstance.getItems(i).toString();
        $("#" + boxes[name]).html(splitByCommas(items));        
    }
    //populateTable();
})

function populateTable(){
    boxNames = Object.keys(boxes); 
    for(var i = 0; i < boxNames.length; i++) {
        let name = boxNames[i];
        let items = contractInstance.getItems(i).toString();

        addRow(name, splitByCommas(items));
    }
}

function addRow(name, items) {    
    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    
    cell1.innerHTML = name;
    cell2.innerHTML = items;
}    