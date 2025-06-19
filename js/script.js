document.querySelectorAll("section[data-section-id]").forEach((section) => {
    const sectionId = section.dataset.sectionId;
    const viewDisplay = section.querySelector(".viewCount span");

    // Get existing view count or default to 0
    let views = parseInt(localStorage.getItem(sectionId)) || 0;
    viewDisplay.textContent = views;

    // Increment views on click
    section.addEventListener("click", () => {
      views += 1;
      localStorage.setItem(sectionId, views);
      viewDisplay.textContent = views;
    });
});


window.onload = function () {
  document.querySelectorAll('.imageTrack').forEach((track) => {
    const images = track.querySelectorAll('picture');
    let currentIndex = 0;

    function showNextImage() {
      currentIndex = (currentIndex + 1) % images.length;

      // Get the width of the first image (assumes all are equal width)
      const imageWidth = images[0].getBoundingClientRect().width;

      const offset = -currentIndex * imageWidth;
      track.style.transform = `translateX(${offset}px)`;
    }

    setInterval(showNextImage, 3000);
  });
};




