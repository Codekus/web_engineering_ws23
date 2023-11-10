async function loadHeader() {
    fetch('header.html')
        .then(response => response.text())
        .then(data => document.querySelector('.header').innerHTML = data)
        .catch(error => console.error('Error:', error));
}

function changeSearchbarVisibility() {
    document.getElementById("searchbar").style.setProperty("visibility", "visible");
    document.getElementById("search-icon-mobile").style.setProperty("visibility", "hidden");
    document.getElementById("search-button-mobile").style.setProperty("visibility", "hidden");
}