let scrollbarTimeout;
const scrollContainer = document.body;

function showScrollbar() {
  scrollContainer.classList.add("show-scrollbar");
  clearTimeout(scrollbarTimeout);
  scrollbarTimeout = setTimeout(() => {
    scrollContainer.classList.remove("show-scrollbar");
  }, 2000); // Hide after 2s
}

// Show only when scrolling
window.addEventListener("scroll", showScrollbar);

// Show when mouse is near right edge (20px zone)
window.addEventListener("mousemove", (e) => {
  const nearRightEdge = window.innerWidth - e.clientX < 20;
  if (nearRightEdge) {
    showScrollbar();
  }
});
