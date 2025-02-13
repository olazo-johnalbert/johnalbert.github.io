function onClickMenu() {
    document.getElementById("hamburger-bar").classList.toggle("bar-change");
    document.getElementById("nav").classList.toggle("show-nav-list");
}
window.onload = function () {
    window.scrollTo(0, 0); // Resets scroll position on page load
};