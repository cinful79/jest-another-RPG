onst inquirer = require('inquirer');
const Enemy = require('./Enemy');
const Player = require('./Player');


class Game {
  constructor() {
    this.roundNumber = 0;
    this.isPlayerTurn = false;
    this.enemies = [];
    //console.table(this.enemies);
    this.player;
  }
  initGame() {
    this.enemies.push(new Enemy('Darth Vader', 'diaper'));
    this.enemies.push(new Enemy('Darth Zannah', 'light-saber'));
    this.enemies.push(new Enemy('<TNT>M-Viking', 'lightning bolt'));
    this.currentEnemy = this.enemies[0];
    //console.log(this.enemies);
    console.table(this.enemies);
    inquirer.prompt(
      {
        type: 'text',
        name: 'name',
        message: 'Warrior, what is your name?'
      }
    )
    //destructure name from the prompt object
    // using the arrow function here to keep "this" referring back to
    // the game object and not a new scope within this function
    .then(({ name }) => {
      this.player = new Player(name);
      
      //test the object creation
      console.log(this.currentEnemy, this.player);

      this.startNewBattle();
    });
  }

  battle() {
    if (this.isPlayerTurn) {
      //prompt user to attack or use potion
      inquirer.prompt (
        {
          type: 'list',
          message: 'What would you like to do?',
          name: 'action',
          choices: ['Attack', 'Use Potion']
        }
      )
      .then(({ action }) => {
        //console.log(action);
        if (action === 'Use Potion') {
          //follow up prompt goes here
          inquirer.prompt (
            {
              type: 'list',
              message: 'Which potion would you like to use?',
              name: 'action',
              choices: this.player.getInventory().map((item, index) => `${index + 1}: ${item.name}`)
            }
          )
          .then(({ action }) => {
            const potionDetails = action.split(': ');

            this.player.usePotion(potionDetails[0] - 1);
            console.log(`You used a ${potionDetails[1]} potion.`)
            this.checkEndOfBattle();
          });
          if (!this.player.getInventory()) {
            console.log("You don't have any potions!");
            return this.checkEndOfBattle();
          }
        } else {
          const damage = this.player.getAttackValue();
          this.currentEnemy.reduceHealth(damage);

          console.log(`You attacked the ${this.currentEnemy.name}`);
          console.log(this.currentEnemy.getHealth());
          this.checkEndOfBattle();
        }
      })
    } else {
      const damage = this.currentEnemy.getAttackValue();
      this.player.reduceHealth(damage);

      console.log(`You were attacked by the ${this.currentEnemy.name}`);
      console.log(this.player.getHealth());
      this.checkEndOfBattle();
    }
    
    //if using a potion - display the potion objects to user
    //apply selection potion effect on the player

    //if attacking - subtract health from enemy based on player attack value

    //if enemy's turn - subtract health from the player based on enemy attack value
  }

  startNewBattle() {
    console.log('Your stats are as follows:');
    console.table(this.player.getStats());
    console.log(this.currentEnemy.getDescription());
    if (this.player.agility > this.currentEnemy.agility) {
      this.isPlayerTurn = true;
    } else {
      this.isPlayerTurn = false;
    }
    this.battle();
  }

  checkEndOfBattle() {
    if (this.player.isAlive() && this.currentEnemy.isAlive()) {
      this.isPlayerTurn = !this.isPlayerTurn;
      this.battle();
    } else if (this.player.isAlive() && !this.currentEnemy.isAlive()) {
      console.log(`You've defeated the ${this.currentEnemy.name}`);

      this.player.addPotion(this.currentEnemy.potion);
      console.log(`${this.player.name} found a ${this.currentEnemy.potion.name} potion`);

      this.roundNumber++;

      if (this.roundNumber < this.enemies.length) {
        this.currentEnemy = this.enemies[this.roundNumber];
        this.startNewBattle();
      } else {
        console.log('You Defeated the Mobs! w00t');
      }
    } else if (!this.player.isAlive() && this.currentEnemy.isAlive()) {
      console.log("You've been defeated! rip...")
    }
  }
}



module.exports = Game;