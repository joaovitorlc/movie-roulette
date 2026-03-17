const button = document.getElementById('buttonsurprise');
const display = document.getElementById('result');
const API_KEY = 'e004b2fab558d15191ae4ab97b1c6599';

async function surprisemovie() {
  // --- PARTE 1: PEGAR OS GÊNEROS MARCADOS ---
  // Buscamos todos os inputs que são do tipo checkbox e estão marcados (:checked)
  const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
  
  // Criamos uma lista com os números (IDs) dos gêneros, separados por vírgula
  const genreIds = Array.from(checkboxes).map(cb => cb.value).join(',');

  // --- PARTE 2: MONTAR A URL ---
  // Usamos o "discover" para que o filtro de gênero funcione
  let url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=pt-BR&sort_by=popularity.desc&page=1`;

  // Se o usuário marcou algum gênero, adicionamos ele na URL
  if (genreIds) {
    url += `&with_genres=${genreIds}`;
  }

  // --- PARTE 3: BUSCAR OS DADOS ---
  const response = await fetch(url);
  const info = await response.json();
  const movies = info.results;

  // Se não encontrar nenhum filme com esses filtros, avisamos o usuário
  if (movies.length === 0) {
    display.innerText = "Nenhum filme encontrado com esses filtros!";
    return;
  }

  // Sorteio
  const randomnumber = Math.floor(Math.random() * movies.length);
  const chosenmovie = movies[randomnumber];


  // 1. Pegar apenas os 4 primeiros dígitos da data (o ano)
const releaseYear = chosenmovie.release_date ? chosenmovie.release_date.split('-')[0] : "N/A";

// 2. Pegar a nota (vote_average)
const rating = chosenmovie.vote_average ? chosenmovie.vote_average.toFixed(1) : "N/A";

// 3. Exibir no novo elemento que criamos
const infoElement = document.getElementById('movie-info');
infoElement.innerHTML = `<span>📅 ${releaseYear}</span> | <span>⭐ ${rating}/10</span>`;

  // --- PARTE 4: EXIBIR E ANIMAR ---
  display.innerText = "You should watch: " + chosenmovie.title;
  document.getElementById('overview').innerText = chosenmovie.overview;

  const image = document.getElementById('moviephoto');
  
  // Reset da animação (aquele truque que você já aprendeu)
  image.classList.remove('animar-foto');
  void image.offsetWidth; 

  const pathphoto = "https://image.tmdb.org/t/p/w500" + chosenmovie.poster_path;
  image.src = pathphoto;
  image.style.display = "block";
  image.classList.add('animar-foto');
}

button.addEventListener('click', surprisemovie);