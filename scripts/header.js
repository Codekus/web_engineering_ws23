async function loadHeader() {
    fetch('header.html')
        .then(response => response.text())
        .then(data => document.querySelector('.header').innerHTML = data)
        .catch(error => console.error('Error:', error));

    fetch('mobileMenu.html')
        .then(response => response.text())
        .then(data => document.querySelector('#mobile-menu').innerHTML = data)
        .catch(error => console.error('Error:', error));

    await waitForElm("#searchform")

    document
        .getElementById('searchform')
        .addEventListener('submit', function(event) {
            event.preventDefault(); // Prevents the form from submitting traditionally
            const searchbar = document.getElementById("searchbar")
            if (searchbar.value === "") {
                searchbar.style.background = "#ffe6e6"
                searchbar.setAttribute("placeholder", "Leere Suche nicht möglich")
                return
            }
            this.submit();
    });

}

function changeSearchbarVisibility() {
    document.getElementById("searchbar").style.setProperty("visibility", "visible");
    document.getElementById("search-icon-mobile").style.setProperty("visibility", "hidden");
    document.getElementById("search-button-mobile").style.setProperty("visibility", "hidden");
}

function openMenu() {
    const mobileMenu = document.getElementById("mobile-menu");
    mobileMenu.style.width = "100%";
    document.body.style.overflow = "hidden";

}

function closeMenu() {

    const mobileMenu = document.getElementById("mobile-menu");

    mobileMenu.style.width = "0";
    document.body.style.overflow = "scroll";
}



function search() {
    const urlParams = new URLSearchParams(window.location.search);
    const keyword = (urlParams.get("search") || "").toLowerCase();

    if (!keyword) {
        window.location = "/";
        return Promise.reject("No search keyword provided");
    }

    const exercisesFound = new Map();
    const fetchPromises = [];
    const exercises = [
        "exercises/uebung_1.xml",
        "exercises/uebung_2.xml",
        "exercises/uebung_3.xml",
        "exercises/uebung_4.xml",
        "exercises/uebung_5.xml",
        "exercises/uebung_6.xml",
        "exercises/uebung_7.xml"
    ]
    for (const ex of exercises) {
        const promise = fetch(ex, { mode: "cors" })
            .then(response => response.text())
            .then(data => {
                var xmlDoc = new DOMParser().parseFromString(data, 'text/xml');
                if (xmlDoc.querySelector("root").textContent.toLowerCase().includes(keyword)) {
                    exercisesFound.set(ex, xmlDoc.querySelector("exercise").textContent);
                }
            });
        fetchPromises.push(promise);
    }



    // Wait for all fetch operations to complete
    return Promise.all(fetchPromises).then(() => {
        if (exercisesFound.size === 0) {
            const main = document.getElementById("main")
            main.innerHTML += (`
            <p id="no-result"> Es wurden keine Ergebnisse für den Suchbegriff <b>"${keyword}"</b> gefunden </p>
        `)
            return true
        }
        const container = document.querySelector("ul");
        exercisesFound.forEach((exercise, title) => {
            const liElement = document.createElement("li");
            const aLink = document.createElement("a");
            aLink.setAttribute("data-content", title);
            aLink.textContent = exercise;
            aLink.onclick = function () {
                redirectToExercise(this.getAttribute('data-content'));
            };
            liElement.appendChild(aLink);
            container.appendChild(liElement);
        });

        return true;
    });
}

function getTime() {
    var currentdate = new Date();
    var datetime = "Last Sync: " + currentdate.getDate() + "/"
        + (currentdate.getMonth()+1)  + "/"
        + currentdate.getFullYear() + " @ "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds() + ":"
        + currentdate.getMilliseconds();
    return datetime
}

function redirectToExercise(exercise) {
    window.location.href = 'uebung_template.html?exercise=' + exercise;
}

