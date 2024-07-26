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

function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    let y = 30; // Y position for text

    // Title
    doc.setFontSize(24);
    doc.setFont("Arial", "bold");
    doc.setTextColor(0, 51, 102); // Dark blue color
    doc.text("TypeScript Quiz Results", 20, 20);

    y += 10; // Spacing after question


    // Set general font for content
    doc.setFontSize(12);
    doc.setFont("Arial", "normal");
    doc.setTextColor(0, 0, 0); // Black color


    // Define margins
    const marginLeft = 20;
    const marginRight = 20;
    const contentWidth = 170; // Page width minus margins

    // Add border style for the content area
    const borderColor = [0, 51, 102]; // Dark blue
    const fillColor = [245, 245, 245]; // Light gray background

    // Loop through user answers and add them to the PDF
    userAnswers.forEach((answer, index) => {
        // Draw question background
        doc.setDrawColor(...borderColor);
        doc.setFillColor(...fillColor);
        doc.rect(marginLeft, y - 10, contentWidth, 20, 'F'); // Background with padding

        // Add question text
        doc.setTextColor(...borderColor);
        doc.setFont("Arial", "bold");
        doc.text(`Q${index + 1}: ${answer.question}`, marginLeft + 2, y);

        y += 20; // Spacing after question

        // Add answer text
        doc.setFont("Arial", "normal");
        doc.setTextColor(0, 0, 0); // Black color
        doc.text(`Your Answer: ${answer.selected}`, marginLeft, y);
        y += 10;

        doc.text(`Is Correct: ${answer.correct ? "Yes" : "No"}`, marginLeft, y);
        y += 20; // Extra spacing after each question
    });

    // Add summary
    y += 10; // Spacing before summary
    doc.setFont("Arial", "bold");
    doc.setTextColor(0, 51, 102); // Dark blue color
    doc.text(`Total Score: ${score} out of ${questions.length}`, marginLeft, y);

    // Add footer
    y += 10; // Spacing before footer
    doc.setFontSize(10);
    doc.setFont("Arial", "italic");
    doc.setTextColor(100, 100, 100); // Gray color
    doc.text("Thank you for taking the quiz!", marginLeft, y);

    // Save the PDF
    doc.save("quiz_results.pdf");
}


window.onload = loadQuestion;