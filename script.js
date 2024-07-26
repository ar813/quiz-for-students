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
let timeLeft = 30;
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

    document.getElementById('next').style.display = currentQuestionIndex === questions.length - 1 ? 'none' : 'inline-block';
    document.getElementById('restart').style.display = currentQuestionIndex === questions.length - 1 ? 'inline-block' : 'none';
    document.getElementById('generate-pdf').style.display = currentQuestionIndex === questions.length - 1 ? 'inline-block' : 'none';
    document.getElementById('current-question').textContent = currentQuestionIndex + 1;
    document.getElementById('total-questions').textContent = questions.length;
    resetTimer();
    startTimer();
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
    clearInterval(timer);
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
        alert(`You have completed the quiz! Your score is ${score} out of ${questions.length}.`);
        document.getElementById('generate-pdf').style.display = 'inline-block';
    }
    // Disable the Next Question button
    document.getElementById('next').disabled = true;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    loadQuestion();
}

function startTimer() {
    timeLeft = 10; // Set initial time (30 seconds as per your setup)
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('time').textContent = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timer);
            alert('Time is up!');
            checkAnswer(); // Show the correct answer
            setTimeout(nextQuestion, 2000); // Move to next question after 2 seconds delay
        }
    }, 1000);
}


function resetTimer() {
    clearInterval(timer);
    document.getElementById('time').textContent = 10;
}

function updateScore() {
    document.getElementById('current-score').textContent = score;
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

function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.setFont("Arial", "bold");
    doc.text("TypeScript Quiz Results", 20, 20);

    // Reset font for content
    doc.setFontSize(12);
    doc.setFont("Arial", "normal");

    let y = 30; // Y position for text

    // Loop through user answers and add them to the PDF
    userAnswers.forEach((answer, index) => {
        doc.setFontSize(12);
        // doc.text(Question ${index + 1}:, 20, y);
        y += 10; // Spacing

        doc.setFont("Arial", "bold");
        doc.text(`Q${index + 1}: ${answer.question}`, 20, y);
        y += 10; // Spacing

        doc.setFont("Arial", "normal");
        doc.text(`Your Answer: ${answer.selected}`, 20, y);
        y += 10; // Spacing

        doc.text(`Is Correct: ${answer.correct ? "Yes" : "No"}`, 20, y);
        y += 15; // Extra spacing after each question
    });

    // Add a summary
    doc.setFont("Arial", "bold");
    doc.text(`Total Score: ${score} out of ${questions.length}`, 20, y);

    // Save the PDF
    doc.save("quiz_results.pdf");
}

window.onload = loadQuestion;