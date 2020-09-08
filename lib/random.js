//exporting a function no curly braces around the function name
// MUST use variable assignment here or it will not bind with
// the export!!
const randomNumber = () => Math.floor(Math.random() * 9 + 1);
module.exports = randomNumber; 





/* anonymous function */
// module.exports = (val1, val2) => {
//   // if (val1 === val2) {
//   //   return true;
//   // } else {
//   //   return false;
//   // }

//   return (val1 === val2 ? true : false);
// };


// /* creating the property method and exporting that */ 
// //need to use variable assignment
// // here to bind the property with the returned value of the function
// const checkIfEqual = (val1, val2) => val1 === val2 ? true : false;

// module.exports = {
//   checkIfEqual: checkIfEqual,
// };