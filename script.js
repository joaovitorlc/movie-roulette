const button = document.getElementById('buttonsurprise');
const display = document.getElementById('result');
const movies = ["Matrix", "Interstellar", "O Poderoso Chefão"];

function surprisemovie() {
  const randomnumber = Math.floor(Math.random() * movies.length);
  const chosenmovie = movies[randomnumber];
  display.innerText = "Your should watch: " + chosenmovie;
}

button.addEventListener('click', surprisemovie);