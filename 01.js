const bcrypt = require("bcryptjs");


/// PART 1, THE USER SIGNS UP AND WE ENCRYPT THE PASSWORD

const saltRounds = 12;

const plainPassword1 = "HelloWorld";
const plainPassword2 = "helloworld";

const salt = bcrypt.genSaltSync(saltRounds);

console.log(`Salt => ${salt}`);

const hash1 = bcrypt.hashSync(plainPassword1, salt);

console.log("FIRST HASH PASSWORD:", hash1);


// PART 2, THE USER LOGS IN

const verifyPass1 = bcrypt.compareSync("helloworld", hash1);

console.log("VERIFICATION OF THE PASSWORD: ", verifyPass1);
