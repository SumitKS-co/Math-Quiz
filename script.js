let quiz_form = document.querySelector(".quiz_form");
let ques = document.querySelector(".question");
let input = document.querySelector("#input");
let result = document.querySelector(".result");
let score = document.querySelector(".score");
let nextQ = document.querySelector(".nextQ");
let btns = document.querySelector(".btns");

let final_ans = 0;
let score_v = 0;
nextQ.style.display = "none";
btns.style.display = "block";

function genQ() {
  let a, b, ans, question;

  let option = Math.floor(Math.random() * 3);

  switch (option) {
    case 0: // Addition
      a = Math.floor(Math.random() * 10) + 1;
      b = Math.floor(Math.random() * 10) + 1;
      ans = a + b;
      question = `What is ${a} + ${b} ?`;
      break;

    case 1: // Subtraction
      a = Math.floor(Math.random() * 10) + 1;
      b = Math.floor(Math.random() * 10) + 1;
      if (b > a) [a, b] = [b, a]; // non-negative - [a,b] = [b,a] is a way to swap a number
      ans = a - b;
      question = `What is ${a} - ${b} ?`;
      break;

    case 2: // Multiplication
      a = Math.floor(Math.random() * 10) + 1;
      b = Math.floor(Math.random() * 10) + 1;
      ans = a * b;
      question = `What is ${a} X ${b} ?`;
      break;
  }

  ques.textContent = question;
  final_ans = ans;
}

genQ();

// Prevent Enter from submitting the form
input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();

    Toastify({
      text: "Press the Submit button instead! 🚀",
      gravity: "top",
      position: "center",
      style: {
        background: "linear-gradient(to right, #ff5f6d, #ffc371)",
      },
      offset: { y: 30 },
    }).showToast();
  }
});


quiz_form.addEventListener("submit", (e) => {
  e.preventDefault(); // prevent page default reload

  if (input.value == final_ans) {
    score_v += 1;
    score.textContent = `Score : ${score_v}`;
    nextQ.style.display = "block";
    btns.style.display = "none";
    Toastify({
      text: "You are right",
      className: "info",
      gravity: "top", // `top` or `bottom`
      position: "center",
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
      offset: {
        y: 30, // vertical axis - can be a number or a string indicating unity. eg: '2em'
      },
    }).showToast();
  } 
  else {
    Toastify({
      text: `Final Score : ${score_v}, Next game in 5 sec`,
      className: "info",
      gravity: "top", // `top` or `bottom`
      position: "center",
      style: {
        background: "linear-gradient(to right, #ff5f6d, #ffc371)",
      },
    }).showToast();

    input.value = "";
    Toastify({
      text: "❌",
      className: "info",
      gravity: "top", // `top` or `bottom`
      position: "center",
      style: {
        background: "linear-gradient(to right, #ff5f6d, #ffc371)",
      },
    }).showToast();

    

    setTimeout(() => {
      input.value = "";
      btns.style.display = "block";
      nextQ.style.display = "none";
      score_v = 0;
      score.textContent = "";
      
      genQ();
    }, 5000);
  }
});

nextQ.addEventListener("click", () => {
  input.value = "";
  btns.style.display = "block";
  nextQ.style.display = "none";
  genQ();
});
