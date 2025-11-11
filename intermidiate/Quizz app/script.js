/* const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "London", "Paris", "Madrid"],
    answer: "Paris",
  },
  {
    question: "Which language runs in web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: "JavaScript",
  },
  {
    question: "What does CSS stands for?",
    options: [
      "Central Style Sheets",
      "Cascading Style Sheets",
      "Colorful Style Sgeets",
      "Computer Style Sheets",
    ],
    answer: "Cascading Style Sheets",
  },
  {
    question: "Which HTML tag is used to define a hyperlink",
    options: ["<a>", "<link>", "<href>", "<url>"],
    answer: "<a>",
  },
]; */
function decodeHTML(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

// using api

let questions = [];

let CurrentQuestionIndex = 0;
let score = 0;
let selectedOption = null;
let isAnswered = false;

const questionE1 = document.querySelector(".question");
const optionE1 = document.querySelector(".options");

// Fetch 5 Computer Science MCQs
fetch(
  "https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple"
)
  .then((res) => res.json())
  .then((data) => {
    // Process and store the questions
    questions = data.results.map((q) => {
      // Combine correct + incorrect options
      const allOptions = [...q.incorrect_answers, q.correct_answer];

      // Shuffle options randomly
      for (let i = allOptions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allOptions[i], allOptions[j]] = [allOptions[j], allOptions[i]];
      }

      return {
        question: decodeHTML(q.question),
        options: allOptions.map(decodeHTML),
        answer: decodeHTML(q.correct_answer),
      };
    });

    console.log("✅ Processed Questions", questions);

    // Show the first question
    showQuestion();
  });

function showQuestion() {
  isAnswered = false;
  const currentQ = questions[CurrentQuestionIndex];
  questionE1.textContent = currentQ.question;

  // Clear old buttons BEFORE adding new ones
  optionE1.innerHTML = "";

  currentQ.options.forEach((option) => {
    const button = document.createElement("button");
    button.textContent = option;
    optionE1.appendChild(button);

    
    button.addEventListener("click", function () {
      const userAns = button.textContent;
      const correctAns = questions[CurrentQuestionIndex].answer;

      if (userAns === correctAns) {
        score++;
        console.log("Correct");
        button.style.backgroundColor = "green";
      } else {
        button.style.backgroundColor = "red";
      }
      // Inside button.addEventListener after setting color
      document.querySelectorAll(".options button").forEach((btn) => {
        btn.disabled = true;
      });

      isAnswered = true;

      console.log("Score:", score);
    });
  });
}

document.getElementById("nextBtn").addEventListener("click", function () {
  if (!isAnswered) {
    alert("Please select an answer first!");
    return;
  }

  CurrentQuestionIndex++;

  if (CurrentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    document.querySelector(".quiz-box").style.display = "none";
    document.querySelector(".result-box").style.display = "block";
    document.getElementById(
      "score"
    ).textContent = `Your score: ${score} / ${questions.length}`;
  }
});
