

function openNav() {
    if (window.screen.width > 400) {
        //    document.getElementById("exercise-sidebar").style.width = "250px";
        //    document.getElementById("main").style.marginLeft = "250px";
    } else {
        //    document.getElementById("exercise-sidebar").style.width = "100%";
    }
    //document.getElementById("exercise-sidebar").style.visibility = "visible";

}

function closeNav() {
    //  document.getElementById("exercise-sidebar").style.width = "0";
    //  document.getElementById("main").style.marginLeft= "0";
    document.getElementById("exercise-sidebar").style.visibility = "hidden";
}


async function loadSidebar() {
    await waitForElm('.title');
    var titles = document.getElementsByClassName("title");
    const sidebarContainer = document.getElementById("exercise-sidebar-btn-container")
    for (var title of titles) {
        const aLink = document.createElement("a")
        aLink.setAttribute("class", "exercise-jump")
        aLink.innerText = title.textContent;
        aLink.onclick = function () {
            var headerHeight = document.querySelector(".navigation").offsetHeight;
            var xpath = `//h1[text()='${this.innerText}']`;
            const element = document.evaluate(
                xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
            ).singleNodeValue;
            const scrollPos = element.getBoundingClientRect().top + window.scrollY - headerHeight - 30;
            window.scrollTo({top: scrollPos, behavior: 'smooth'});
        }
        sidebarContainer.appendChild(aLink)
    }
}
