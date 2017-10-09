pragma solidity ^0.4.11;

contract Inventory {
    struct Item {
        bytes32 name;
    }
    
    struct Box {
        bytes32 name;
        uint numItems;
        mapping (uint => Item) items;
    }
    
    uint numBoxes;
    mapping (uint => Box) boxes;
    
    function newBox(bytes32 n) returns (uint boxID) {
        boxID = numBoxes++;
        boxes[boxID] = Box(n, 0);
    }
    
    function packBox(uint boxID, bytes32 name) {
        Box storage c = boxes[boxID];
        c.items[c.numItems++] = Item(name);
    }
    
    function boxCount() constant returns (uint n) {
        return numBoxes;
    }

    function getBoxName(uint boxID) constant returns (bytes32 n) {
        Box storage c = boxes[boxID];
        return c.name;
    }
    
    function getItems(uint boxID) constant returns (bytes32[] selectedItems) {
        bytes32[] storage tempItems;
        Box storage c = boxes[boxID];
        for (uint i = 0; i < c.numItems; i++) {
            tempItems.push(c.items[i].name);
        }
        selectedItems = tempItems;
        return selectedItems;
    }
    
}