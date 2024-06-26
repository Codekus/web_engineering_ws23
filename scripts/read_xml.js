/**
 * will read XML File based on query Parameter, fetch nodes and generate
 * HTML code for exercise page
 */
async function loadXMLFile() {
    const urlParams = new URLSearchParams(window.location.search);

    var filePath = urlParams.get("exercise");

    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(data, 'text/xml');

            // immediately-invoked function expression IIFE
            document.getElementById("main").appendChild((() => {
                const header = document.createElement("h1");
                const title = xmlDoc.querySelector('exercise').textContent;
                document.title = title;
                header.innerHTML =title
                return header;
            })());


            var textTasks = xmlDoc.querySelectorAll("task")

            var titleCount = 0;
            for (var task of textTasks) {
                const textSection = createTaskSection(task.getAttribute("type"));
                const title = createH1Title(task.querySelector("title"), "title-" + titleCount++)
                const questions = task.querySelectorAll("question")
                textSection.appendChild(title)

                // für jede Frage subtitel bei unterfragen und Lösung auslesen und HTML Element für erstellen
                for (var ques of questions) {
                    const question = createQuestionAndSolution(
                        ques.querySelector("subtitle"),
                        ques.querySelector("solution")
                    )
                    textSection.appendChild(question)
                    textSection.appendChild(document.createElement("br"))
                    document.getElementById("main").appendChild(textSection)
                }


            }
    }).catch(() => {
        // Falls Übung XML nicht vorhanden ist
        const content = document.getElementById("content")
        content.innerHTML = `
            <section id="error-container">
                <p>
                    Diese Übung wurde nicht gefunden
                </p> 
                <button onclick="window.location.href = 'index.html';">
                    Zurück zur Startseite
                </button>
             </section>
        `
    });
}

/**
 *
 * @returns
 * <section class="task-text"> </section>
 */
function createTaskSection(classValue) {
    const section = document.createElement("section")
    section.setAttribute("class", classValue)
    return section;
}



/**
 *
 * @param text
 * @param id
 * @returns
 * <h1 class="title"> text </h1>
 */
function createH1Title(text, id) {
    const title = document.createElement("h1")

    title.setAttribute("class", "title")
    title.setAttribute("id", id)
    title.innerHTML = text.textContent

    return title;
}

/**
 *
 * @param  subTitleText - An HTML element containing the text for the subtitle.
 * @param solutionText - An HTML element containing the text or URL for the solution,
 *                       with an attribute specifying the solution type (e.g., wireframe, language-js, language-php).
 * <div class="question">
 *     <div class="subtitle"> subTitleText </div>
 *     <div class="solution"> solutionText </div>
 * </div>
 */
function createQuestionAndSolution(subTitleText, solutionText) {
    const question = document.createElement("div")
    question.setAttribute("class", "question")

    const subtitle = document.createElement("div")
    subtitle.setAttribute("class", "subtitle")
    subtitle.innerHTML = subTitleText.textContent


    let solution;
    // wireframe / iframe lösung wird eingebettet
    if (solutionText.getAttribute("type") === "wireframe") {
        solution = document.createElement("iframe")
        solution.setAttribute("src", solutionText.textContent)

        // link zum iframe
        const link = document.createElement("a")
        link.setAttribute("class", "wireframe-link")
        link.onclick = function () {
            window.location = solutionText.textContent
        }
        link.innerHTML = `
            <br>
            <br>
            Zum iFrame
        `
        subtitle.appendChild(link)

    // Javascript bzw source code lösung -> content wird in <pre><code> gewrapped damit highlight.js benutzt werden kann
    } else if (solutionText.getAttribute("type") === "language-js" || solutionText.getAttribute("type") === "language-php") {
        solution = document.createElement("div")
        solution.setAttribute("class", "solution")

        const pre = document.createElement("pre")
        const code = document.createElement("code")
        code.setAttribute("class", "language-js")
        fetch(solutionText.textContent)
            .then(response => response.text())
            .then(data => {
               code.textContent = data;
            });
        pre.appendChild(code)
        solution.appendChild(pre)

    } else {
        solution = document.createElement("div")
        solution.setAttribute("class", "solution")
        solution.innerHTML = solutionText.textContent
    }


    question.appendChild(subtitle)
    question.appendChild(solution)
    return question
}
