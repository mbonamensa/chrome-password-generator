
//Characters to be used in password

let characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T",
"U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s",
"t","u","v","w","x","y","z"];
const numberCharacters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
const symbolCharacters = ["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",
",","|",":",";","<",">",".","?","/"]

//Grab elements from HTML

const genPassword         = document.querySelector("#gen-password")
const password            = document.querySelector("#password")
const cpyPassword         = document.querySelector("#cpy-password")
const passwordLengthRange = document.querySelector("#pwd-length-range")
const numbers             = document.querySelector("#numbers")
const symbols             = document.querySelector("#symbols")         
const copied              = document.querySelector("#copied") 
const output              = document.querySelector("#numoutput") 




/* 
------------------------------------------------------------
Function for showing output number oninput from range slider
------------------------------------------------------------
*/
function showOutput() {
    output.value = passwordLengthRange.value
}



/* 
----------------------------------------------------------
Function for checking if special characters are required
----------------------------------------------------------
*/
function renderPassword(arr, char) {
    /*Check if special character is checked and push to characters array.
    If not, remove from characters array*/

    if (char.checked == true) {
        characters.push(...arr)
    }else {
        characters = characters.filter((item) => !arr.includes(item));
    }

}



/* 
----------------------------------
Function for generating passwords
----------------------------------
*/
function generatePassword() {
    //Set the password text variables as strings
    let passwordText = ""
    let lengthInput = passwordLengthRange.value

    //Loop through characters and add till charater length is user input value
    for (let i = 0; i < lengthInput; i++ ) {
        let randomChar = characters[Math.floor(Math.random() * characters.length)]
        passwordText += randomChar
    }

    //Show the password on screen
    password.textContent = passwordText
}



/* 
-------------------------------
Function for copying password
-------------------------------
*/
function copyPassword(e) {
    //Create a textarea element
    const textarea = document.createElement('textarea')

    //set height to 0 to avoid showing on screen
    textarea.style.height = 0

    //make it a child of the document body
    document.body.appendChild(textarea)

    //set its value to the contents of the password that has been generated

    textarea.value = e.textContent

    //select the password
    textarea.select()

    //copy the password
    document.execCommand('copy')

    //remove the textarea element created
    textarea.remove()

    //show password copied
    copied.style.visibility = "visible"

    setTimeout( () => {
        copied.style.visibility = "hidden"
    }, 2000)
    
}



/* 
-------------------------------------------------
Function for custome range slider color progress
-------------------------------------------------
*/
function InputChanges(e) {
    e = document.getElementById("pwd-length-range")
    const min = e.min
    const max = e.max
    const val = e.value

    e.style.backgroundSize = (val - min) * 100 / (max - min) + "% 100%"

}



// Event listeners

document.addEventListener("DOMContentLoaded", generatePassword)
genPassword.addEventListener("click", generatePassword)
passwordLengthRange.addEventListener("input", showOutput)
passwordLengthRange.addEventListener("input", generatePassword)
cpyPassword.addEventListener("click", () => {copyPassword(password)})
passwordLengthRange.addEventListener("input", InputChanges)
numbers.addEventListener("input", () => {renderPassword(numberCharacters, numbers)})
symbols.addEventListener("input", () => {renderPassword(symbolCharacters, symbols)})
