let globalJsonData;

async function readJson() {
    try {
        const res = await fetch('../resources/uebung_8_3.json');
        globalJsonData = await res.json();
    } catch (error) {
        console.error('Error fetching JSON:', error);
    }

    const headerContainer = document.getElementById("header-button-container")
    for (const btn in globalJsonData) {
        headerContainer.innerHTML += `
        <button class="header-button" onClick="load(this.textContent.toLowerCase())">${btn}</button>
       `
    }
}

async function load(text) {
    if(text === document.body.current) return
    if(globalJsonData === undefined || globalJsonData === null) {
        await readJson()
    }
    const data = globalJsonData[text]
    const leftSideContainer = document.getElementById("side-button-container")
    const sectionContent = document.getElementById("content")
    const rightSideContainer = document.getElementById('right-button-container')

    leftSideContainer.innerHTML = "";
    sectionContent.innerHTML = "";
    rightSideContainer.innerHTML = "";

    for (const topic in data) {
        if (data.hasOwnProperty(topic)) {
            const aSide = document.createElement("button");
            aSide.textContent = topic;

            aSide.onclick = function() {
                const innerData = globalJsonData[text][this.textContent]
                sectionContent.textContent = innerData.content;
                rightSideContainer.innerHTML = "";
                for(const ref of (innerData.references)) {

                    const link = document.createElement("a")
                    link.textContent = ref
                    link.setAttribute("href", ref)
                    rightSideContainer.appendChild(link)
                }
            }

            leftSideContainer.appendChild(aSide);
        }
    }

    document.querySelectorAll("#side-button-container > button").item(0).click()
    document.body.current = text
}



