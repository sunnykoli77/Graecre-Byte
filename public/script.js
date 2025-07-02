document.querySelectorAll("section[data-section-id]").forEach((section) => {
  const sectionId = section.dataset.sectionId;
  const viewDisplay = section.querySelector(".viewCount span");

  fetch(`/views/${encodeURIComponent(sectionId)}`, {method: "GET"}).then(response => {
    if (response.status == 500) {
      alert(`Error: ${response.status}`);
      return;
    } else {
    return response.json()}})
    .then(data => viewDisplay.textContent = data.click);

  section.addEventListener("click", () => {
    fetch(`/views/${encodeURIComponent(sectionId)}`, {
      method: "POST"
    })
    .then(response => {
      if (response.status == 500) {
        alert(`Error: ${response.status}`)
        return;
      } else {
        return response.json()}})
      .then(data => viewDisplay.textContent = data.click);
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



