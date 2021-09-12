randomNumberOne = Math.floor(Math.random() * 6) + 1;
randomNumberTwo = Math.floor(Math.random() * 6) + 1;

document.querySelector(".img1").src = `images/dice${randomNumberOne}.png`;

document.querySelector(".img2").src = `images/dice${randomNumberTwo}.png`;

if (randomNumberOne > randomNumberTwo) {
  document.querySelector("h1").innerHTML = `🚩 Player One Wins!`;
} else if (randomNumberOne < randomNumberTwo) {
  document.querySelector("h1").innerHTML = `Player Two Wins! 🚩`;
} else {
  document.querySelector("h1").innerHTML = `It's a Draw!`;
}
