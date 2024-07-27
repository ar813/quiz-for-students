const allQuestions = [
    {
        question: "Which of the following is a correct sentence?",
        options: [
            "She don't like apples.",
            "She doesn't like apples.",
            "She don't likes apples.",
            "She doesn't likes apples."
        ],
        correctAnswer: "She doesn't like apples."
    },
    {
        question: "What is the past tense of 'go'?",
        options: [
            "Go",
            "Goes",
            "Went",
            "Going"
        ],
        correctAnswer: "Went"
    },
    {
        question: "Which word is a noun?",
        options: [
            "Quickly",
            "Happily",
            "Dog",
            "Beautiful"
        ],
        correctAnswer: "Dog"
    },
    {
        question: "Choose the correct form of the verb: 'She _____ to the store yesterday.'",
        options: [
            "goes",
            "going",
            "went",
            "gone"
        ],
        correctAnswer: "went"
    },
    {
        question: "Which sentence is in the passive voice?",
        options: [
            "The teacher teaches the lesson.",
            "The lesson is taught by the teacher.",
            "The teacher is teaching the lesson.",
            "The lesson was taught by the teacher."
        ],
        correctAnswer: "The lesson is taught by the teacher."
    },
    {
        question: "What is the correct comparative form of 'good'?",
        options: [
            "Gooder",
            "More good",
            "Best",
            "Better"
        ],
        correctAnswer: "Better"
    },
    {
        question: "Which of the following sentences uses an adverb correctly?",
        options: [
            "He sings beautiful.",
            "She speaks slow.",
            "They ran quickly.",
            "The cat is very soft."
        ],
        correctAnswer: "They ran quickly."
    },
    {
        question: "Select the correct sentence structure:",
        options: [
            "I will going to the party.",
            "I will go to the party.",
            "I going to the party.",
            "I go will to the party."
        ],
        correctAnswer: "I will go to the party."
    },
    {
        question: "Which of the following is a correctly punctuated sentence?",
        options: [
            "I like ice cream, I eat it every day.",
            "I like ice cream. I eat it every day.",
            "I like ice cream I eat it every day.",
            "I like ice cream; I eat it every day."
        ],
        correctAnswer: "I like ice cream. I eat it every day."
    },
    {
        question: "Which sentence contains a preposition?",
        options: [
            "She runs fast.",
            "The cat on the table.",
            "He sings beautifully.",
            "They are happy."
        ],
        correctAnswer: "The cat on the table."
    },
    {
        question: "Choose the correct article: 'This is _____ apple.'",
        options: [
            "a",
            "an",
            "the",
            "no article"
        ],
        correctAnswer: "an"
    },
    {
        question: "Identify the correct sentence:",
        options: [
            "He don't has any money.",
            "He doesn't have any money.",
            "He doesn't has any money.",
            "He don't have any money."
        ],
        correctAnswer: "He doesn't have any money."
    },
    {
        question: "Which sentence is in the future tense?",
        options: [
            "I will go to the market tomorrow.",
            "I went to the market yesterday.",
            "I am going to the market now.",
            "I go to the market every day."
        ],
        correctAnswer: "I will go to the market tomorrow."
    },
    {
        question: "Which of the following sentences is correct?",
        options: [
            "She can sings very well.",
            "She can sing very well.",
            "She can singing very well.",
            "She can to sing very well."
        ],
        correctAnswer: "She can sing very well."
    },
    {
        question: "What is the plural form of 'child'?",
        options: [
            "Childs",
            "Childes",
            "Children",
            "Childrens"
        ],
        correctAnswer: "Children"
    },
    {
        question: "Choose the correct form of the verb: 'They _____ finished their homework.'",
        options: [
            "have",
            "has",
            "having",
            "had"
        ],
        correctAnswer: "have"
    },
    {
        question: "Which of the following is a correct sentence?",
        options: [
            "She not is at home.",
            "She is not at home.",
            "She is not home.",
            "She not at home."
        ],
        correctAnswer: "She is not at home."
    },
    {
        question: "Identify the correct sentence:",
        options: [
            "Do you knows the answer?",
            "Do you know the answer?",
            "Does you know the answer?",
            "Does you knows the answer?"
        ],
        correctAnswer: "Do you know the answer?"
    },
    {
        question: "Which sentence uses an adjective correctly?",
        options: [
            "She is a very beauty girl.",
            "She is a very beautiful girl.",
            "She is a very beautifully girl.",
            "She is a very beautify girl."
        ],
        correctAnswer: "She is a very beautiful girl."
    },
    {
        question: "What is the correct past tense of 'eat'?",
        options: [
            "Ate",
            "Eaten",
            "Eat",
            "Eating"
        ],
        correctAnswer: "Ate"
    }
];


let questions = [];
const numberOfQuestions = 10; // Set how many questions to show in the quiz

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Shuffle all questions and select the first 'numberOfQuestions'
shuffle(allQuestions);
questions = allQuestions.slice(0, numberOfQuestions);

let currentQuestionIndex = 0;
let selectedOption = '';
let score = 0;
let timer;
let timeLeft = 120; // Set the total quiz time in seconds (e.g., 300 seconds = 5 minutes)
let userAnswers = [];

function loadQuestion() {
    const questionElement = document.getElementById('question');
    questionElement.classList.add('fade-in');
    setTimeout(() => questionElement.classList.remove('fade-in'), 1000);

    document.getElementById('options').classList.add('slide-in');
    setTimeout(() => document.getElementById('options').classList.remove('slide-in'), 500);

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

let answerSubmitted = false; // New variable to track if answer has been submitted

function selectOption(option) {
    if (answerSubmitted) return; // Prevent selection if the answer has already been submitted

    selectedOption = option;
    const items = document.getElementById('options').getElementsByTagName('li');
    for (let item of items) {
        item.style.backgroundColor = item.textContent === option ? '#e0e0e0' : '#f9f9f9';
    }
    // Enable the Submit button when an option is selected
    document.getElementById('submit').disabled = false;
}

function checkAnswer() {
    if (answerSubmitted) return; // Prevent checking answer if it has already been submitted

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

    answerSubmitted = true; // Mark the answer as submitted

    // Disable the Submit button after submission
    document.getElementById('submit').disabled = true;
    // Enable the Next Question button after answer is checked
    document.getElementById('next').disabled = false;
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
        answerSubmitted = false; // Reset the answer submitted flag for the next question
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
        alert("Time is up");
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
