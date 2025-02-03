const questions = [
         { question: "ما هي أول سورة في القرآن؟", answer: "الفاتحة" },
         { question: "ما هي أقصر سورة في القرآن؟", answer: "الكوثر" },
         { question: "ما هي أطول سورة في القرآن؟", answer: "البقرة" },
         { question: "ما هي السورة التي تسمى قلب القرآن؟", answer: "يس" },
         { question: "من هو أول نبي؟", answer: "آدم" },
         { question: "ما هي السورة التي تسمى عروس القرآن؟", answer: "الرحمن" },
         { question: "ما هي السورة التي تبدأ ب 'المر'؟", answer: "الرعد" },
         { question: "ما هي السورة التي تسمى سورة التوديع؟", answer: "النصر" },
         { question: "ما هي السورة التي تسمى سورة الحواريين؟", answer: "الصف" },
         { question: "ما هي السورة التي تسمى سورة النساء الصغرى؟", answer: "الطلاق" },
         { question: "من هو الصحابي الذي لقب بترجمان القرآن؟", answer: "عبد الله بن عباس" },
         { question: "من هو الصحابي الذي لقب بأسد الله؟", answer: "حمزة بن عبد المطلب" },
         { question: "من هو الصحابي الذي لقب بذو النورين؟", answer: "عثمان بن عفان" },
         { question: "من هو الصحابي الذي لقب بالفاروق؟", answer: "عمر بن الخطاب" },
         { question: "من هو الصحابي الذي لقب بأبو هريرة؟", answer: "عبد الرحمن بن صخر" }
     ];

     let currentQuestionIndex = 0;
     let score = 0;
     let timer;
     let timeLeft = 20;
     let results = [];

     const homePage = document.getElementById("home-page");
     const quizPage = document.getElementById("quiz-page");
     const resultsPage = document.getElementById("results-page");
     const startBtn = document.getElementById("start-btn");
     const resultsBtn = document.getElementById("results-btn");
     const questionElement = document.getElementById("question");
     const timerElement = document.getElementById("timer");
     const answerInput = document.getElementById("answer-input");
     const submitAnswerBtn = document.getElementById("submit-answer");
     const resultsList = document.getElementById("results-list");
     const backToHomeBtn = document.getElementById("back-to-home");

     // بدء الجولة
     startBtn.addEventListener("click", startQuiz);

     // عرض النتائج السابقة
     resultsBtn.addEventListener("click", showResults);

     // إرسال الإجابة
     submitAnswerBtn.addEventListener("click", checkAnswer);

     // العودة للصفحة الرئيسية
     backToHomeBtn.addEventListener("click", () => {
         resultsPage.classList.remove("active");
         homePage.classList.add("active");
     });

     function startQuiz() {
         homePage.classList.remove("active");
         quizPage.classList.add("active");
         currentQuestionIndex = 0;
         score = 0;
         loadQuestion();
     }

     function loadQuestion() {
         if (currentQuestionIndex < 15) {
             questionElement.textContent = questions[currentQuestionIndex].question;
             timeLeft = 20;
             timerElement.textContent = timeLeft;
             startTimer();
         } else {
             endQuiz();
         }
     }

     function startTimer() {
         timer = setInterval(() => {
             timeLeft--;
             timerElement.textContent = timeLeft;
             if (timeLeft <= 0) {
                 clearInterval(timer);
                 currentQuestionIndex++;
                 loadQuestion();
             }
         }, 1000);
     }

     function checkAnswer() {
         const userAnswer = answerInput.value.trim().toLowerCase();
         const correctAnswer = questions[currentQuestionIndex].answer.toLowerCase();

         if (correctAnswer.split(" ").some(word => userAnswer.includes(word))) {
             score++;
         }

         answerInput.value = "";
         clearInterval(timer);
         currentQuestionIndex++;
         loadQuestion();
     }

     function endQuiz() {
         quizPage.classList.remove("active");
         resultsPage.classList.add("active");
         results.push(score);
         displayResults();
     }

     function displayResults() {
         resultsList.innerHTML = results.map((result, index) => `
             <li>الجولة ${index + 1}: ${result} نقطة</li>
         `).join("");
     }

     function showResults() {
         homePage.classList.remove("active");
         resultsPage.classList.add("active");
         displayResults();
     }