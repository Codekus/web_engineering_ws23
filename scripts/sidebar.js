function loadSidebar() {
    generateSideBar()

    //  document.getElementById("exercise-sidebar").style.height = "100vh";
}

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


function generateSideBar() {
    var titles = document.getElementsByClassName("title");
    const sidebarContainer = document.getElementById("exercise-sidebar-btn-container")
    for (var title of titles) {
        const aLink = document.createElement("a")
        aLink.setAttribute("class", "exercise-jump")

        aLink.innerText = title.textContent;
        aLink.onclick = function () {
            var xpath = `//h1[text()='${this.innerText}']`;
            const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            element.scrollIntoView();
        }
        sidebarContainer.appendChild(aLink)
    }
}
