function loadXMLFile() {
    const urlParams = new URLSearchParams(window.location.search);

    var filePath = urlParams.get("exercise");

    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(data, 'text/xml');
            document.getElementById('textid').innerHTML = xmlDoc.querySelector('exercise').textContent;
            var i = 0;
            var textTasks = xmlDoc.querySelectorAll("task[type='text']")
            for(var task of textTasks) {
                const textSection = createTaskTextSection();
                const title = createH1Title(task.querySelector("title").textContent)
                const questions = task.querySelectorAll("question")
                textSection.appendChild(title)
                for(var ques of questions) {
                    const question = document.createElement("div")
                    question.setAttribute("class", "question")

                    const subtitle = document.createElement("div")
                    subtitle.setAttribute("class", "subtitle")
                    subtitle.innerHTML = ques.querySelector("subtitle").textContent

                    const solution = document.createElement("div")
                    solution.setAttribute("class", "solution")
                    solution.innerHTML = ques.querySelector("solution").textContent

                    question.appendChild(subtitle)
                    question.appendChild(solution)

                    textSection.appendChild(question)
                    document.getElementById("content").appendChild(textSection)
                }


            }
    });
}


function createTaskTextSection() {
    const section = document.createElement("section")
    section.setAttribute("class", "task-text")
    return section;
}

function createCodeTextSection() {
    const section = document.createElement("section")
    section.setAttribute("class", "task-code")
    return section;
}

function createH1Title(text) {
    const title = document.createElement("h1")
    title.setAttribute("class", "title")
    title.innerHTML = text
    return title;
}

function another(text) {
    alert(text)
}

function fun() {
    alert("function fun")
}