//FETCH DATA
const apiKey = "83bf4c4ed5fcffe946729d0a15c01d3b";
// const moviesContainer = document.getElementById("movie-content");

async function fetchMovieDetails(movieId) {
  const apiOneUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;
  try {
    const response = await fetch(apiOneUrl);
    const data = await response.json();
    // console.log(data);
    document.getElementById(
      "m-backdrop"
    ).src = `https://image.tmdb.org/t/p/original/${data.backdrop_path}`;
    document.getElementById("m-title").textContent = `${data.title}`;
    document.getElementById("m-title-2").textContent = `${data.title}`;
    document.getElementById("m-desc").textContent = `${data.overview}`;
    data.genres.forEach((element) => {
      const t = document.createElement("span");
      t.textContent = `${element.name}`;
      document.getElementById("m-tags").appendChild(t);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
window.onload = fetchMovieDetails(sessionStorage.getItem("loadedMovie"));
// Show Video
let playButton = document.querySelector(".play-movie");
let videoContainer = document.querySelector(".video-container");
let video = document.querySelector("#myVideo");
let closeButton = document.querySelector(".close-video");

playButton.onclick = () => {
  videoContainer.classList.add("show-video");
  // Auto Play
  video.play();
};

closeButton.onclick = () => {
  videoContainer.classList.remove("show-video");
  // Auto Play
  video.pause();
};
