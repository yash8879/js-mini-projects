document.getElementById("search-btn").addEventListener("click", function () {
  const movieName = document.getElementById("movie-search").value;

  const apiKey = "f91f3f9";
  const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(
    movieName
  )}`;

  console.log(url);
  const loader = document.getElementById("loader");
  loader.style.display = "flex";
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      loader.style.display = "none";

      console.log(data);
      const resultDiv = document.getElementById("result");
      resultDiv.innerHTML = "";

      if (data.Response === "True") {
        data.Search.forEach((movie) => {
          const poster =
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://dummyimage.com/300x450/cccccc/000000&text=No+Image";
          const card = `

         <div class="movie-card">

        <img 
         src="${poster}" 
         alt="${movie.Title}" 
         onerror="this.onerror=null;this.src='https://dummyimage.com/300x450/cccccc/000000&text=No+Image';"
        />
       <h2>${movie.Title}</h2>
       <p>${movie.Year}</p>
       </div>
       `;

          resultDiv.innerHTML += card;
        });
      } else {
        resultDiv.innerHTML = `<p>No movies found.</p>`;
      }
    });
});
