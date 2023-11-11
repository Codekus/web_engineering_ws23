async function loadHeader() {
    fetch('header.html')
        .then(response => response.text())
        .then(data => document.querySelector('.header').innerHTML = data)
        .catch(error => console.error('Error:', error));

    fetch('mobileMenu.html')
        .then(response => response.text())
        .then(data => document.querySelector('#mobile-menu').innerHTML = data)
        .catch(error => console.error('Error:', error));
}

function changeSearchbarVisibility() {
    document.getElementById("searchbar").style.setProperty("visibility", "visible");
    document.getElementById("search-icon-mobile").style.setProperty("visibility", "hidden");
    document.getElementById("search-button-mobile").style.setProperty("visibility", "hidden");
}

function openMenu() {
    const mobileMenu = document.getElementById("mobile-menu");
  //  document.getElementById("mobile-menu").style.display = "block";
    mobileMenu.style.width = "100%";
    // overflow: hidden;
    document.body.style.overflow = "hidden";

}

function closeMenu() {
  //  document.getElementById("mobile-menu").style.display = "none";

    const mobileMenu = document.getElementById("mobile-menu");

    mobileMenu.style.width = "0";
    document.body.style.overflow = "scroll";
}

