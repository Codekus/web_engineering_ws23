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
            textTasks.forEach(x => x)
            var titleCount = 0;
            for (var task of textTasks) {
                const textSection = createTaskSection(task.getAttribute("type"));
                const title = createH1Title(task.querySelector("title").textContent, "title-" + titleCount++)
                const questions = task.querySelectorAll("question")
                textSection.appendChild(title)
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
        const content = document.getElementById("content")
        content.innerHTML = `
            <section id="error-container">
                <p>
                    Diese Übung wurde nicht gefunden
                </p> 
                <button onclick="window.location.href = '/';">
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
 * @returns
 * <section class="task-code"> </section>
 */
function createCodeTextSection() {
    const section = document.createElement("section")
    section.setAttribute("class", "task-code")
    return section;
}

/**
 *
 * @param text
 * @returns
 * <h1 class="title"> text </h1>
 */
function createH1Title(text, id) {
    const title = document.createElement("h1")
    title.setAttribute("class", "title")
    title.setAttribute("id", id)
    title.innerHTML = text
    return title;
}

/**
 *
 * @param subTitleText
 * @param solutionText
 * @returns
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
    if (solutionText.getAttribute("type") === "wireframe") {
        solution = document.createElement("iframe")
        solution.setAttribute("src", solutionText.textContent)
    } else if (solutionText.getAttribute("type") === "language-js" || solutionText.getAttribute("type") === "language-php") {
        solution = document.createElement("div")
        solution.setAttribute("class", "solution")

        const pre = document.createElement("pre")
        const code = document.createElement("code")
        code.setAttribute("class", "language-js")
        console.log("lmao")
        fetch(solutionText.textContent)
            .then(response => response.text())
            .then(data => {
               code.textContent = data;
            });
        pre.appendChild(code)
        solution.appendChild(pre)

    }
    else {
        solution = document.createElement("div")
        solution.setAttribute("class", "solution")
        solution.innerHTML = solutionText.textContent
    }


    question.appendChild(subtitle)
    question.appendChild(solution)
    return question
}
