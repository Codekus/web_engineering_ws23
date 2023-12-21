


async function loadSidebar() {
    await waitForElm('.title'); // wait until title is rendered
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
