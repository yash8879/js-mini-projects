const slides = document.querySelectorAll(".slide");

let currentSlide = 0;

slides[currentSlide].classList.add("active");

const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

function showNextSlide() {
  slides[currentSlide].classList.remove("active");
  currentSlide++;

  if (currentSlide >= slides.length) {
    currentSlide = 0;
  }
  slides[currentSlide].classList.add("active");
    updateDots(); //  keep dots in sync
}

function showPrevSlide() {
  slides[currentSlide].classList.remove("active");

  currentSlide--;

  if (currentSlide < 0) {
    currentSlide = slides.length - 1;
  }
  slides[currentSlide].classList.add("active");
    updateDots(); // keep dots in sync
}

nextBtn.addEventListener("click", showNextSlide);
prevBtn.addEventListener("click", showPrevSlide);

let autoSlide = setInterval(showNextSlide, 3000);
const slider = document.querySelector(".slides");


slider.addEventListener("mouseenter", () => {
  clearInterval(autoSlide);
});

slider.addEventListener("mouseleave", () => {
  autoSlide = setInterval(showNextSlide, 3000);
});

const dotContainer = document.querySelector(".dot-container");

slides.forEach((_, index) => {
  const dot = document.createElement("span");
  dot.classList.add("dot");
  if (index === currentSlide) {
    dot.classList.add("active-dot"); // mark the current one as active
  }
  dot.dataset.index = index; // custom data to store slide index
  dotContainer.appendChild(dot);
});
const dots = document.querySelectorAll(".dot");

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    // Remove active class from current slide and dot
    slides[currentSlide].classList.remove("active");
    dots[currentSlide].classList.remove("active-dot");

    // Set currentSlide to the clicked dot's index
    currentSlide = Number(dot.dataset.index);

    // Add active class to the new slide and dot
    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active-dot");
  });
});

function updateDots() {
  document.querySelectorAll(".dot").forEach((dot, index) => {
    dot.classList.toggle("active-dot", index === currentSlide);
  });
}
