// setting game name
let gameName = "Guess The Word"
document.title = gameName;
document.querySelector("h1").innerHTML = gameName
document.querySelector("footer").innerHTML = `${gameName} Game Created By 3eyas`

// setting game options 
let numberOfTries = 6;
let numberOfLetters = 6;
let currentTry = 1;

window.onload = () => {
    generateInput()
}

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
        input.addEventListener("input", () => {
            input.value = input.value.toLowerCase()
            const nextInput = inputs[index + 1];
            if (nextInput) nextInput.focus()
        })
        input.addEventListener("keydown", (event) => {
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
                const nextInput = inputs[index - 1];
                if (nextInput) {
                    nextInput.focus()
                }
            }
        });
    })
}