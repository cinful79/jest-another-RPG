//constructor function using capital letter
// function Potion(name) {
//   this.name = name;

//   if (this.name === 'health') {
//     this.value = Math.floor(Math.random() * 10 + 30);
//   } else {
//     this.value = Math.floor(Math.random() * 5 + 7);
//   }
// }

class Potion {
    constructor (name) {
      this.types = ['strength', 'agility', 'health'];
      //assigning a truthy value to a variable.
      // assigned to the verbatim name or a random choice in the types array
      // if theres no argument placed in the new Class declaration??
      // basically what i got was set this.name to the name parameter
      // if no argument passed in, evaluate the value to be true with the 
      // OR operator by choosing a random name in the types array
      this.name = name || this.types[Math.floor(Math.random() * this.types.length)];
  
      if (this.name === 'health') {//if health potion set value to this
        this.value = Math.floor(Math.random() * 10 + 30);
      } else {//any other name set to this value
        this.value = Math.floor(Math.random() * 5 + 7);
      }
    }
  
  }
  
  module.exports = Potion;