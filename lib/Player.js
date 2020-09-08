typeof Potion constuctor
const Potion = require('./Potion');
const Character = require('./Character');


//typeof exports for testing can't declare Potion twice...
// declare this just for testing ONLY
//const Potion = require("./__mocks__/Potion");

// function Player(name = '') {
//   this.name = name;

  // this.health = Math.floor(Math.random() * 10 + 95);
  // this.strength = Math.floor(Math.random() * 5 + 7);
  // this.agility = Math.floor(Math.random() * 5 + 7);

//   this.inventory = [new Potion('health'), new Potion()];
// }

// Player.prototype.getStats = function () {
  // return {
  //   potions: this.inventory.length,
  //   health: this.health,
  //   strength: this.strength,
  //   agility: this.agility
  // };
// };

// Player.prototype.getInventory = function () {
//   if (this.inventory.length) {
//     return this.inventory;
//   }
//   return false;
// }
// the test passed at 10.2.7 using this Class constructor
// but can't use prototype syntax with it for some reason
// when creating the methods

class Player extends Character {
  // setting the parameter to default empty string 
  // if no parameter is provided
  constructor(name = '') {
    super(name);//this brings in the inherited methods from the super constructor
    
    // this.name = name

    // this.health = Math.floor(Math.random() * 10 + 100);
    // this.strength = Math.floor(Math.random() * 5 + 7);
    // this.agility = Math.floor(Math.random() * 5 + 7);
    
    //since we mocked potions in player.test.js, calling new Potion()
    // here will use the mock version of the potion, and not call
    // the original constructor function.
    // mainly for testing purposes
    this.inventory = [new Potion('health'), new Potion()];
  }



  getStats() {
  // Player.prototype.getStats = function() {
    return {
      potions: this.inventory.length,
      health: this.health,
      strength: this.strength,
      agility: this.agility
    }
  }

  getInventory() {
    if (this.inventory.length) {
      return this.inventory;
    }
    return false;
  }


  // getHealth() {
  //   return `${this.name}'s health is now ${this.health}!`;
  // }

  // isAlive() {
  //   if (this.health === 0) {
  //     return false;
  //   }
  //   return true;
  // }

  // reduceHealth(health) {
  //   this.health -= health;

  //   if (this.health < 0) {
  //     this.health = 0;
  //   }
  // }

  // getAttackValue() {
  //   const min = this.strength - 5;
  //   const max = this.strength + 5;

  //   return Math.floor(Math.random() * (max - min) + min);
  // }

  addPotion(potion) {
    this.inventory.push(potion);
    // console.log(this);
    // console.log(this.inventory);
  }

  usePotion(index) {
    //splice here is removing the items from the array
    // and returning the removed items as an array
    const potion = this.getInventory().splice(index, 1)[0];

    switch (potion.name) {
      case 'agility':
        this.agility += potion.value;
        break;
      case 'health':
        this.health += potion.value;
        break;
      case 'strength':
        this.strength += potion.value;
        break;
    }
  }
}

// function Player(name = '') {
//   this.name = name;

//   this.health = Math.floor(Math.random() * 10 + 95);
//   this.strength = Math.floor(Math.random() * 5 + 7);
//   this.agility = Math.floor(Math.random() * 5 + 7);

//   this.inventory = [new Potion('health'), new Potion()];
// }

// Player.prototype = Object.create(Character.prototype);

//   Player.prototype.reduceHealth = function(health) {
//     this.health -= health;

//     if (this.health < 0) {
//       this.health = 0;
//     }
//   }

//  Player.prototype.addPotion = function(potion) {
//     this.inventory.push(potion);
//     console.log(this);
//     console.log(this.inventory);
//   }

// Player.prototype.getInventory = function() {
//   if (this.inventory.length) {
//     return this.inventory;
//   }
//   return false;
// };

// Player.prototype.usePotion = function(index) {
//   const potion = this.getInventory().splice(index, 1)[0];

//   switch (potion.name) {
//     case 'agility':
//       this.agility += potion.value;
//       break;
//     case 'health':
//       this.health += potion.value;
//       break;
//     case 'strength':
//       this.strength += potion.value;
//       break;
//   }
// };


// Player.prototype.getStats = function() {
//   return {
//     potions: this.inventory.length,
//     health: this.health,
//     strength: this.strength,
//     agility: this.agility
//   };
// };


module.exports = Player;




// You're not limited to mocking just your own constructors 
// and modules. You can also mock the data you expect to receive 
// from other modules like the fs module. 
// That would be a classic case of not wanting a dependency 
// like fs to interfere with your singular testing.

// An example of mocking fs might look like this:

// const fs = require('fs');
// jest.mock('fs');
// fs.readFileSync.mockReturnValue('fake content');

// In this case, the fs method readFileSync() has been mocked to 
// always return the string 'fake content', 
// thereby eliminating the need to read from an actual file during 
// the test.