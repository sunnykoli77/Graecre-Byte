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

const track = document.querySelector('.imageTrack');
const images = track.querySelectorAll('picture');
let currentIndex = 0;

function showNextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    const offset = -currentIndex * 150;
    track.style.transform = `translateX(${offset}px)`;
}
setInterval(showNextImage, 3000);
