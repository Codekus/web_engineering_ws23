/**
 * will read XML File based on query Parameter, fetch nodes and generate
 * HTML code for exercise page
 */
function loadXMLFile() {
    const urlParams = new URLSearchParams(window.location.search);

    var filePath = urlParams.get("exercise");

    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(data, 'text/xml');
            document.getElementById('textid').innerHTML = xmlDoc.querySelector('exercise').textContent;
            var textTasks = xmlDoc.querySelectorAll("task[type='text']")
            for (var task of textTasks) {
                const textSection = createTaskTextSection();
                const title = createH1Title(task.querySelector("title").textContent)
                const questions = task.querySelectorAll("question")
                textSection.appendChild(title)
                for (var ques of questions) {
                    const question = createQuestionAndSolution(
                        ques.querySelector("subtitle").textContent,
                        ques.querySelector("solution").textContent
                    )
                    textSection.appendChild(question)
                    textSection.appendChild(document.createElement("br"))
                    document.getElementById("content").appendChild(textSection)
                }


            }
    });
}

/**
 *
 * @returns
 * <section class="task-text"> </section>
 */
function createTaskTextSection() {
    const section = document.createElement("section")
    section.setAttribute("class", "task-text")
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
function createH1Title(text) {
    const title = document.createElement("h1")
    title.setAttribute("class", "title")
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
    subtitle.innerHTML = subTitleText

    const solution = document.createElement("div")
    solution.setAttribute("class", "solution")
    solution.innerHTML = solutionText

    question.appendChild(subtitle)
    question.appendChild(solution)
    return question
}

function another(text) {
    alert(text)
}

function fun() {
    alert("function fun")
}