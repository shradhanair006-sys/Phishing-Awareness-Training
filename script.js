

const questions = [
    {
        question: "1. What is phishing?",
        options: [
            "A type of online game",
            "A cyberattack to steal information",
            "A computer update",
            "A search engine"
        ],
        answer: 1
    },
    {
        question: "2. What should you do with a suspicious email link?",
        options: [
            "Click it immediately",
            "Forward it to everyone",
            "Verify it before clicking",
            "Ignore all security warnings"
        ],
        answer: 2
    },
    {
        question: "3. What is a common sign of phishing?",
        options: [
            "Urgent messages asking for personal details",
            "Official announcements",
            "Normal newsletters",
            "Saved contacts"
        ],
        answer: 0
    },
    {
        question: "4. Should you share your OTP with anyone?",
        options: [
            "Yes",
            "Only with friends",
            "Only through email",
            "Never"
        ],
        answer: 3
    },
    {
        question: "5. What makes a password secure?",
        options: [
            "Your name",
            "123456",
            "A strong and unique password",
            "Your birthdate"
        ],
        answer: 2
    }
];

const quizContainer = document.getElementById("quizQuestions");
const quizForm = document.getElementById("quizForm");
const result = document.getElementById("quizResult");

questions.forEach((q, index) => {
    let html = `<div class="question">
        <h3>${q.question}</h3>`;

    q.options.forEach((option, i) => {
        html += `
            <label>
                <input type="radio" name="q${index}" value="${i}">
                ${option}
            </label><br>`;
    });

    html += `</div>`;
    quizContainer.innerHTML += html;
});

quizForm.addEventListener("submit", function(event) {
    event.preventDefault();

    let score = 0;

    questions.forEach((q, index) => {
        const selected = document.querySelector(
            `input[name="q${index}"]:checked`
        );

        if (selected && Number(selected.value) === q.answer) {
            score++;
        }
    });

    result.textContent =
        `Your Score: ${score}/5`;

    if (score === 5) {
        result.textContent += " Excellent! You are phishing aware!";
    } else {
        result.textContent += " Keep learning and stay safe online!";
    }
});

// PHISHING EMAIL DETECTION ACTIVITY

const emailSamples = [
    {
        subject: "URGENT! Your Bank Account Will Be Blocked!",
        sender: "security@bank-verify-example.com",
        message: "Your account will be suspended today. Click the link below immediately to verify your banking details.",
        answer: "phishing",
        explanation: "This email uses urgency and asks for sensitive banking information."
    },
    {
        subject: "Your College Assignment Submission",
        sender: "faculty@example.edu",
        message: "Dear Student, your assignment submission has been received. Please check your college portal for updates.",
        answer: "legitimate",
        explanation: "This is a normal informational message without suspicious requests."
    }
];

let currentEmail = 0;

const emailContainer = document.getElementById("email-container");
const checkEmailBtn = document.getElementById("checkEmailBtn");
const emailResult = document.getElementById("emailResult");

function displayEmail() {
    const email = emailSamples[currentEmail];

    emailContainer.innerHTML = `
        <h3>${email.subject}</h3>
        <p><strong>From:</strong> ${email.sender}</p>
        <p>${email.message}</p>

        <h4>Is this email phishing or legitimate?</h4>

        <label>
            <input type="radio" name="emailAnswer" value="phishing">
            Phishing
        </label>

        <label>
            <input type="radio" name="emailAnswer" value="legitimate">
            Legitimate
        </label>
    `;

    emailResult.textContent = "";
}

displayEmail();

checkEmailBtn.addEventListener("click", function() {
    const selected = document.querySelector(
        'input[name="emailAnswer"]:checked'
    );

    if (!selected) {
        emailResult.textContent = "Please select an answer first!";
        return;
    }

    const email = emailSamples[currentEmail];

    if (selected.value === email.answer) {
        emailResult.textContent = "Correct! " + email.explanation;
    } else {
        emailResult.textContent = "Incorrect! " + email.explanation;
    }

    if (currentEmail < emailSamples.length - 1) {
        checkEmailBtn.textContent = "Next Email";
        checkEmailBtn.onclick = function() {
            currentEmail++;
            checkEmailBtn.textContent = "Check My Answer";
            checkEmailBtn.onclick = null;
            displayEmail();
        };
    } else {
        checkEmailBtn.textContent = "Activity Completed!";
        checkEmailBtn.disabled = true;
    }
});
