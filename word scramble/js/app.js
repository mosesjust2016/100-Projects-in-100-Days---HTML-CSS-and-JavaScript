const wordText = document.querySelector(".word"),
hintText = document.querySelector(".hint span"),
timerText = document.querySelector(".time b"),
inputField = document.querySelector("input"),
refreshBtn = document.querySelector(".refresh-word"),
checkBtn = document.querySelector(".check-word");

let correctWord, timer;

const initTimer = maxTime =>{
    clearInterval(timer);
    timer = setInterval(() => {
        if(maxTime > 0){
            maxTime --; //decrease maxTime by 1
            return timerText.innerText = maxTime;
        }
        clearInterval(timer);
        alert(`Time Up! ${correctWord.toUpperCase()} was the correct word`);
        initGame(); //calling initGame function, to restart the game
    }, 1000)
}

const initGame = () => {
    initTimer(30);//calling  initTimer function
    let radomObj = words[Math.floor(Math.random()*words.length)] //getting random object from words
    let wordArray = radomObj.word.split(""); //splitting each letter of radom word

    for (let index = wordArray.length - 1; index > 0; index--) {
        let element = Math.floor(Math.random() * (index + 1)); //getting radom number

        /* shuffling and swipping wordArray letters randomly */
        [wordArray[index], wordArray[element]]= [wordArray[element], wordArray[index]]
    }
    wordText.innerText = wordArray.join(""); //passing shuffled word as text
    hintText.innerText = radomObj.hint; //passing random  object hint as hint
    correctWord = radomObj.word.toLocaleLowerCase(); // passing random word to correctWord
    inputField.value = "";// making input field empty
    inputField.setAttribute("maxlength", correctWord.length); //setting input maxlength attr value to word length
}

const checkWord = () =>{
    let userWord = inputField.value.toLocaleLowerCase();//getting user value 
    if(!userWord) return alert(`Please enter a word`);//if user did not enter anything 

    if(userWord !== correctWord) return alert(`Oops! ${userWord} is not a correct word`);//if user word did not match with the correct word

    alert(`Congrats! ${correctWord.toUpperCase()} is the correct word`);//if user word matches with the correct word
    initGame();
}

initGame();
refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);