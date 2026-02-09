const button = document.getElementById('buttonsurprise');
const display = document.getElementById('result');
const API_KEY = 'e004b2fab558d15191ae4ab97b1c6599';
const BASE_URL = 'https://api.themoviedb.org/3/movie/popular';

async function surprisemovie() {
  const response = await fetch(`${BASE_URL}?api_key=${API_KEY}&page=1`);

  const info = await response.json();

  const movies = info.results;

  const randomnumber = Math.floor(Math.random() * movies.length);
  const chosenmovie = movies[randomnumber];
  display.innerText = "Your should watch: " + chosenmovie.title;
  document.getElementById('overview').innerText = chosenmovie.overview;

const image = document.getElementById('moviephoto');
  
  // 1. Remove a classe de animação para resetar
  image.classList.remove('animar-foto');

  // 2. Truque para "resetar" o elemento no navegador
  void image.offsetWidth; 

  // 3. Troca a foto (isso acontece enquanto ela está girando ou antes)
  const pathphoto = "https://image.tmdb.org/t/p/w500" + chosenmovie.poster_path;
  image.src = pathphoto;
  image.style.display = "block";

  // 4. Adiciona a classe que faz girar
  image.classList.add('animar-foto');
}

button.addEventListener('click', surprisemovie);