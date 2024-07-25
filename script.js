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
    document.getElementById('back').style.display = currentQuestionIndex === 0 ? 'none' : 'inline-block';
    document.getElementById('next').style.display = currentQuestionIndex === questions.length - 1 ? 'none' : 'inline-block';
}

function selectOption(option) {
    selectedOption = option;
    const items = document.getElementById('options').getElementsByTagName('li');
    for (let item of items) {
        item.style.backgroundColor = item.textContent === option ? '#e0e0e0' : '#f9f9f9';
    }
}

function checkAnswer() {
    const resultElement = document.getElementById('result');
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedOption === currentQuestion.correctAnswer) {
        resultElement.textContent = 'Correct!';
        resultElement.style.color = 'green';
    } else {
        resultElement.textContent = `Wrong! The correct answer is ${currentQuestion.correctAnswer}.`;
        resultElement.style.color = 'red';
    }
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        alert('You have completed the quiz!');
    }
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
}

function copyLink() {
    const copyText = document.getElementById('share-link');
    copyText.style.display = 'block';
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices
    document.execCommand("copy");
    copyText.style.display = 'none';
    alert("Link copied to clipboard: " + copyText.value);
}

window.onload = loadQuestion;
