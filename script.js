const questions = [
    {
        question: "What is TypeScript?",
        options: [
            "A programming language",
            "A superset of JavaScript",
            "A type of coffee",
            "A CSS framework"
        ],
        correctAnswer: "A superset of JavaScript"
    },
    {
        question: "Which company developed TypeScript?",
        options: [
            "Google",
            "Microsoft",
            "Facebook",
            "Apple"
        ],
        correctAnswer: "Microsoft"
    },
    {
        question: "What file extension is used for TypeScript files?",
        options: [
            ".java",
            ".ts",
            ".py",
            ".js"
        ],
        correctAnswer: ".ts"
    },
    {
        question: "Which of the following is a feature of TypeScript?",
        options: [
            "Dynamic Typing",
            "Strong Typing",
            "No Typing",
            "Weak Typing"
        ],
        correctAnswer: "Strong Typing"
    },
    {
        question: "Can TypeScript code be directly executed in the browser?",
        options: [
            "Yes",
            "No"
        ],
        correctAnswer: "No"
    }
];

let currentQuestionIndex = 0;
let selectedOption = '';
let score = 0;
let timer;
let timeLeft = 30; // Set the total quiz time in seconds (e.g., 300 seconds = 5 minutes)
let userAnswers = [];

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById('question').textContent = currentQuestion.question;
    const optionsElement = document.getElementById('options');
    optionsElement.innerHTML = '';
    currentQuestion.options.forEach(option => {
        const li = document.createElement('li');
        li.textContent = option;
        li.onclick = () => selectOption(option);
        optionsElement.appendChild(li);
    });
    document.getElementById('result').textContent = '';
    selectedOption = '';

    // Initially disable the Next Question button
    document.getElementById('next').disabled = true;

    document.getElementById('next').style.display = 'inline-block';
    document.getElementById('current-question').textContent = currentQuestionIndex + 1;
    document.getElementById('total-questions').textContent = questions.length;
    updateScore();
}

function selectOption(option) {
    selectedOption = option;
    const items = document.getElementById('options').getElementsByTagName('li');
    for (let item of items) {
        item.style.backgroundColor = item.textContent === option ? '#e0e0e0' : '#f9f9f9';
    }
    // Enable the Submit button when an option is selected
    document.getElementById('submit').disabled = false;
}

function checkAnswer() {
    const resultElement = document.getElementById('result');
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedOption === currentQuestion.correctAnswer) {
        resultElement.textContent = 'Correct!';
        resultElement.style.color = 'green';
        score++;
    } else {
        resultElement.textContent = `Wrong! The correct answer is ${currentQuestion.correctAnswer}.`;
        resultElement.style.color = 'red';
    }
    userAnswers.push({
        question: currentQuestion.question,
        selected: selectedOption,
        correct: selectedOption === currentQuestion.correctAnswer
    });
    updateScore();

    // Disable the Submit button after submission
    document.getElementById('submit').disabled = true;
    // Enable the Next Question button after answer is checked
    document.getElementById('next').disabled = false;
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        finishQuiz();
    }
    // Disable the Next Question button
    document.getElementById('next').disabled = true;
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('time').textContent = formatTime(timeLeft);
        if (timeLeft === 0) {
            clearInterval(timer);
            finishQuiz(); // End the quiz when time is up
        }
    }, 1000);
}

function finishQuiz() {
    localStorage.setItem('quizScore', score); // Store the score in localStorage
    if (timeLeft === 0) {
        alert("Time is up")
        window.location.href = 'final.html'; // Redirect to the final page
    } else {
        window.location.href = 'final.html'; // Redirect to the final page
    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

function updateScore() {
    document.getElementById('current-score').textContent = score;
}

window.onload = function () {
    loadQuestion();
    startTimer();
};
