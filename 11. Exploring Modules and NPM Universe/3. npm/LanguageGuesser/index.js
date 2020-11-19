const franc = require("franc");
const langs = require("langs");
const userInput = process.argv[2];
const langCode = franc(userInput);

if(langCode === 'und'){
    console.log('Sorry couldn figure it out')
}

const language = langs.where("3",langCode);
console.log(language.name);