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
    document.getElementById('searchform').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevents the form from submitting traditionally

        this.submit();

        // redirect to search_page.html with
        // Call your search function here
        search().then(result => {
            if (result) {
                // The search was successful, you can continue with additional logic here

            } else {
                console.log("Search failed.");
            }
        });
    });
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



function search() {
    const urlParams = new URLSearchParams(window.location.search);
    let keyword
    try {
        keyword = urlParams.get("search").toLowerCase();
    } catch (e) {
        keyword = null
    }

    if (keyword === null) return Promise.reject("No search keyword provided");

    const exercisesFound = new Map();
    const fetchPromises = [];
    const exercises = [
        "exercises/uebung_1.xml",
        "exercises/uebung_2.xml",
        "exercises/uebung_3.xml",
        "exercises/uebung_4.xml",
        "exercises/uebung_5.xml",
        "exercises/uebung_6.xml"
    ]
    for (const ex of exercises) {
        const promise = fetch(ex, { mode: "cors" })
            .then(response => response.text())
            .then(data => {
                var xmlDoc = new DOMParser().parseFromString(data, 'text/xml');
                console.log(xmlDoc.querySelector("root").textContent.toLowerCase())
                if (xmlDoc.querySelector("root").textContent.toLowerCase().includes(keyword)) {
                    exercisesFound.set(ex, xmlDoc.querySelector("exercise").textContent);
                }
            });

        fetchPromises.push(promise);
    }

    // Wait for all fetch operations to complete
    return Promise.all(fetchPromises).then(() => {
        const container = document.querySelector("ul");
        console.log(exercisesFound)
        exercisesFound.forEach((exercise, title) => {
            const liElement = document.createElement("li");
            const aLink = document.createElement("a");
            aLink.setAttribute("data-content", title);
            aLink.textContent = title;
            aLink.onclick = function () {
                redirectToExercise(this.getAttribute('data-content'));
            };
            liElement.appendChild(aLink);
            container.appendChild(liElement);
        });

        console.log("All fetch operations completed.");
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

