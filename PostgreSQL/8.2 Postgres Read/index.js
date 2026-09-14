import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const db=new pg.Client({
  user : "postgres",
  host:"localhost",
  database:"world",
  password:"normie",
  port:5432,
});

const app = express();
const port = 3000;

let quiz=[];
let totalCorrect = 0;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


db.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err.stack);
    return;
  }
  console.log("Connected to PostgreSQL");

    db.query("SELECT * FROM flags", (err, res) => {
    if (err) {
      console.error("Error executing query:", err.stack);
      return;
    }

    quiz = res.rows;

    console.log("Columns:", Object.keys(quiz[0]));
    console.log("First row:", quiz[0]);

    console.log(`Loaded ${quiz.length} questions`);

    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  });
});

let currentQuestion = {};

// GET home page
app.get("/", (req, res) => {
  totalCorrect = 0;
  nextQuestion();
  console.log(currentQuestion);
  res.render("index.ejs", { question: currentQuestion });
});

// POST a new post
app.post("/submit", (req, res) => {
  let answer = req.body.answer.trim();
  let isCorrect = false;
  if (currentQuestion.capital_city.toLowerCase() === answer.toLowerCase()) {
    totalCorrect++;
    console.log(totalCorrect);
    isCorrect = true;
  }

  nextQuestion();
  res.render("index.ejs", {
    question: currentQuestion,
    wasCorrect: isCorrect,
    totalScore: totalCorrect,
  });
});

async function nextQuestion() {
  if (quiz.length === 0) {
    console.log("Quiz is empty!");
    return;
  }

  const randomCountry =
    quiz[Math.floor(Math.random() * quiz.length)];

  currentQuestion = randomCountry;

  console.log("Current question:", currentQuestion);
}