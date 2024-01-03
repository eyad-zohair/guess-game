// setting game name
let gameName = "Guess The Word"
document.title = gameName;
document.querySelector("h1").innerHTML = gameName
document.querySelector("footer").innerHTML = `${gameName} Game Created By 3eyas`

// setting game options 
let numberOfTries = 6;
let numberOfLetters = 6;
let currentTry = 1;

// MANAGE WORDS
let wordToGuess = ""
const words = ["Create", "Update", "Delete", "Master", "Branch", "Mainly", "School", "Change"]
wordToGuess = words[Math.floor(Math.random() * words.length)].toLocaleLowerCase()

window.onload = () => {
    generateInput()
}

const guessButton = document.querySelector(".check")
guessButton.addEventListener("click", handleGuesses)

function generateInput() {
    const inputsContainer = document.querySelector(".inputs");

    for (let i = 1; i <= numberOfTries; i++) {
        const tryDiv = document.createElement("div");
        tryDiv.classList.add(`try-${i}`);
        tryDiv.innerHTML = `<span>Try ${i}</span>`;

        if (i !== 1) tryDiv.classList.add("disabled-input")
        for (let j = 1; j <= numberOfLetters; j++) {
            const input = document.createElement("input");
            input.type = "text";
            input.id = `guess-${i}-letter-${j}`;
            input.setAttribute("maxlength", "1")
            tryDiv.appendChild(input);
        }

        inputsContainer.appendChild(tryDiv)
    }
    inputsContainer.children[0].children[1].focus()

    // Disaple all inputs exept first 
    const inputsInDisapledDiv = document.querySelectorAll(".disabled-input input")
    inputsInDisapledDiv.forEach((input) => {
        input.disabled = true
        input.style.caretColor = "transparent"
    })

    const inputs = document.querySelectorAll("input")
    inputs.forEach((input, index) => {
        input.addEventListener("keyup", (e) => {
            if (e.keyCode !== 8) {
                input.value = input.value.toLowerCase()
                const nextInput = inputs[index + 1];
                if (nextInput) nextInput.focus()
            }
        })
        input.addEventListener("keyup", (event) => {
            const currentIndex = Array.from(inputs).indexOf(event.target);
            if (event.key === "ArrowRight") {
                const nextInput = currentIndex + 1;
                if (nextInput < inputs.length) inputs[nextInput].focus();
            }
            if (event.key === "ArrowLeft") {
                const prevInput = currentIndex - 1;
                if (prevInput >= 0) inputs[prevInput].focus();
            }
            if (event.keyCode === 8) {
                input.value = ""
                const prevInput = currentIndex - 1;
                if (prevInput >= 0) inputs[prevInput].focus();
            }
        });
    })
}

function handleGuesses() {
    let sucsessGuess = false;
    console.log(wordToGuess)
    for (let i = 1; i <= numberOfLetters; i++) {
        const inputField = document.querySelector(`#guess-${currentTry}-letter-${i}`)
        const letter = inputField.value.toLocaleLowerCase()
        const actualLetter = wordToGuess[i - 1]
        // GAME LOGIC
        if (letter === actualLetter) {
            // letter is correct and in place
            inputField.classList.add("yes-in-place")
            sucsessGuess = true;
        } else if (wordToGuess.includes(letter) && letter !== "") {
            // letter is correct and not in place
            inputField.classList.add("not-in-place")
            sucsessGuess = false;
        } else {
            // letter is false
            inputField.classList.add("no")
            sucsessGuess = false;
        }
    }

    // check if user win or lose 
    if (sucsessGuess) {
        createBobab("You Won", "won")
    } else {
        document.querySelector(`.try-${currentTry}`).classList.add("disabled-input")
        const currentTryInputs = document.querySelectorAll(`.try-${currentTry} input`)
        currentTryInputs.forEach((input) => (input.disabled = true))

        currentTry++

        const nextTryInputs = document.querySelectorAll(`.try-${currentTry} input`)
        nextTryInputs.forEach((input, index) => {
            input.disabled = false
        })

        let el = document.querySelector(`.try-${currentTry}`)
        if (el) {
            document.querySelector(`.try-${currentTry}`).classList.remove("disabled-input")
            el.children[1].focus()
        } else {
            createBobab("You Lose", "lose")
        }
    }
}

function createBobab(useressage, chosenClass) {
    // CREATE ELEMENT
    let overlay = document.createElement("div")
    let div = document.createElement("div")
    let message = document.createElement("h2")
    let retry = document.createElement("button")
    let x = document.createElement("p")
    let getMenu = document.createElement("button")

    // ADD TEXT TO ELELEMENTS
    message.innerHTML = useressage
    retry.innerHTML = "Retry"
    x.innerHTML = "X"
    getMenu.innerHTML = "End Menu"

    // ADD CLASSES TO ELEMENTS
    overlay.className = "overlay"
    div.className = "final-div"
    message.className = chosenClass
    document.querySelector(".game-area").classList.add("over")
    getMenu.className = "menu"

    // ADD LISENTER TO ELEMENTS
    retry.addEventListener("click", function () {
        location.reload()
    })
    x.onclick = function () {
        overlay.remove()
        // ADD MENU TO IT'S PLACE
        document.querySelector(".key-colors").appendChild(getMenu)
    }
    getMenu.onclick = function () {
        createBobab("You Won", "won")
        getMenu.remove()
    }

    // ADD ELEMENTS TO DIV
    div.appendChild(message)
    if (chosenClass === "lose") {
        let wordIs = document.createElement("h3")
        wordIs.innerHTML = `The Word Is <span>${wordToGuess}</span>`
        div.appendChild(wordIs)
    }
    div.appendChild(retry)
    div.appendChild(x)

    // ADD DIV TO OVERLAY
    overlay.appendChild(div)

    // ADD OVERLAY TO PAGE
    document.body.appendChild(overlay)

    // DISABLE INPUTS
    let alltries = document.querySelectorAll(".inputs > div")
    alltries.forEach((tryDiv) => tryDiv.classList.add("disabled-input"))

    // DISABLE GUES BUTTON 
    guessButton.disabled = true;
}