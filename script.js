let correctAnswer = 0;
let countdownInterval = null;
let points = 0;
let difficulty = "Easy"; // Default difficulty

// Initialize the game
generateRandomQuestion();

function generateRandomQuestion() {
    console.log("Generating a new question...");

    let num1, num2;
    const ops = ["+", "-", "*", "/"];
    const operator = ops[Math.floor(Math.random() * ops.length)];

    // Adjust number ranges based on difficulty
    switch (difficulty) {
        case "Easy":
            num1 = Math.floor(Math.random() * 10) + 1;
            num2 = Math.floor(Math.random() * 10) + 1;
            break;
        case "Medium":
            num1 = Math.floor(Math.random() * 50) + 1;
            num2 = Math.floor(Math.random() * 50) + 1;
            break;
        case "Hard":
            num1 = Math.floor(Math.random() * 100) + 1;
            num2 = Math.floor(Math.random() * 100) + 1;
            break;
    }

    // Avoid division by zero
    if (operator === "/") {
        num2 = Math.max(1, num2);
    }

    // Display the question
    const ques = document.querySelector(".question");
    ques.textContent = `${num1} ${operator} ${num2}`;

    // Compute the correct answer
    switch (operator) {
        case "+": correctAnswer = num1 + num2; break;
        case "-": correctAnswer = num1 - num2; break;
        case "*": correctAnswer = num1 * num2; break;
        case "/": correctAnswer = Math.floor(num1 / num2); break;
    }

    console.log(`New Question: ${num1} ${operator} ${num2}, Answer: ${correctAnswer}`);

    // Generate and shuffle answer options
    const options = [correctAnswer, correctAnswer + 3, correctAnswer - 3, correctAnswer + 1];
    options.sort(() => Math.random() - 0.5);

    // Update radio button labels and values
    const labels = document.querySelectorAll("label");
    const radios = document.querySelectorAll('input[name="option"]');
    for (let i = 0; i < options.length; i++) {
        labels[i].textContent = options[i];
        radios[i].value = options[i];
        radios[i].checked = false;
    }

    resetTimer();
}

function resetTimer() {
    const timerDisplay = document.querySelector(".timer");
    let countdown = 10; // 10 seconds per question

    if (countdownInterval) {
        clearInterval(countdownInterval);
    }

    timerDisplay.textContent = `Timer: ${countdown} seconds`;

    countdownInterval = setInterval(() => {
        countdown--;
        timerDisplay.textContent = `Timer: ${countdown} seconds`;

        if (countdown <= 0) {
            clearInterval(countdownInterval);
            alert("⏳ Time over! Generating a new question.");
            points = 0;
            updatePointsDisplay();
            generateRandomQuestion();
        }
    }, 1000);
}

function checkAnswer() {
    const radios = document.querySelectorAll('input[name="option"]');
    let selectedValue = null;

    for (const radio of radios) {
        if (radio.checked) {
            selectedValue = Number(radio.value);
            break;
        }
    }
// above part is used to fetch the value that user has selected in radio button

    if (selectedValue !== null) {
        if (selectedValue === correctAnswer) {
            alert("✅ Correct answer!");
            points++;
        } else {
            alert("❌ Wrong answer! Try again.");
            points = Math.max(0, points - 1); // Deduct points but avoid negative
        }
        updatePointsDisplay();
        generateRandomQuestion();
    } else {
        alert("⚠️ Please select an option!");
    }
}
//  below function is used to  diplay of updated points 
function updatePointsDisplay() {
    const pointsDisplay = document.querySelector(".points-display");
    pointsDisplay.textContent = `Points: ${points}`;
}


// below code is used to fetch the difficulties that user has selected
function setDifficulty(level) {
    difficulty = level.charAt(0).toUpperCase() + level.slice(1); // Capitalize to match 'Easy', 'Medium', 'Hard'
    points = 0; // Reset points on difficulty change
    updatePointsDisplay();
    console.log(`Difficulty changed to: ${difficulty}`);
    generateRandomQuestion(); // Generate a new question immediately
}
