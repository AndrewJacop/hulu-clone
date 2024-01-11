// FETCHING DATA
const apiKey = "83bf4c4ed5fcffe946729d0a15c01d3b";
const moviesContainer = document.getElementById("movie-content");
// HOME MOVIE
async function fetchHomeMovie() {
  const apiHomeUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`;
  try {
    const response = await fetch(apiHomeUrl);
    const res = await response.json();
    const data = res.results[0];

    document.getElementById(
      "h-backdrop"
    ).src = `https://image.tmdb.org/t/p/original/${data.backdrop_path}`;
    document.getElementById("h-title").textContent = `${data.title}`;
    document.getElementById("h-date").textContent = `Releasing Soon`;
    document.getElementById("h-btn").addEventListener("click", () => {
      setLoadedMovie(data.id);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
// POPULAR MOVIES
async function fetchPopMovie() {
  const apiAllUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`;
  const sliderContainer = document.getElementById("swiper-wrapper");
  try {
    const response = await fetch(apiAllUrl);
    const data = await response.json();

    data.results.forEach((media) => {
      const slide = createSwiperSlide(media);
      sliderContainer.appendChild(slide);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
function createSwiperSlide(media) {
  const { title, name, poster_path, vote_average, id } = media;

  const swiperSlide = document.createElement("div");
  swiperSlide.classList.add("swiper-slide");

  swiperSlide.innerHTML = `
              <div class="movie-box">
                <img
                  src="https://image.tmdb.org/t/p/original/${poster_path}"
                  alt=""
                  class="movie-box-img"
                />
                <div class="box-text">
                  <h2 class="movie-title">${title || name}</h2>
                  <span class="movie-type">rating: ${vote_average}/10</span>
                  <a href="#" class="watch-btn play-btn">
                    <i class="bx bx-right-arrow" onclick="setLoadedMovie(${id})"></i>
                  </a>
                </div>
              </div>
    `;
  return swiperSlide;
}
// MAIN MOVIES
async function fetchMovies() {
  const apiAllUrl = `https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}`;
  try {
    const response = await fetch(apiAllUrl);
    const data = await response.json();

    data.results.forEach((media) => {
      const movieBox = createMovieBox(media);
      moviesContainer.appendChild(movieBox);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
function createMovieBox(media) {
  const { title, name, poster_path, vote_average, id } = media;

  const movieBox = document.createElement("div");
  movieBox.classList.add("movie-box");

  movieBox.innerHTML = `
        <img
          src="https://image.tmdb.org/t/p/original/${poster_path}"
          class="movie-box-img"
        />
        <div class="box-text">
          <h2 class="movie-title">${title || name}</h2>
          <span class="movie-type">rating: ${vote_average}/10</span>
          <a href="./movie-page.html" class="watch-btn play-btn">
            <i class="bx bx-right-arrow" onclick="setLoadedMovie(${id})"></i>
          </a>
        </div>
    `;
  return movieBox;
}
// NAVIGATION TO DETAILS PAGE
function setLoadedMovie(id) {
  sessionStorage.setItem("loadedMovie", id);
  location.href = "./movie-page.html";
}

fetchHomeMovie();
fetchPopMovie();
fetchMovies();

// Swiper
var swiper = new Swiper(".popular-content", {
  slidesPerView: 1,
  spaceBetween: 10,
  autoplay: {
    delay: 5500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    280: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    320: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    510: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    758: {
      slidesPerView: 3,
      spaceBetween: 15,
    },
    900: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
  },
});
