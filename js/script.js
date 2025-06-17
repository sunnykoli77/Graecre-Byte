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