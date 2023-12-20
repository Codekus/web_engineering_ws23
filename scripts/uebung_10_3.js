renderData()
async function renderData() {
    const res = await fetch("http://localhost:8080")
    const data = await res.json()
    const content = document.querySelector("#content")
    for (const art in data) {

        const max = data[art]["max"]
        const min = data[art]["min"]
        const sum = data[art]["sum"]
        const avg = data[art]["avg"]

        const tr = document.createElement("tr")
        const inner = `
            <td>${art}</td>
            <td>${max}</td>
            <td>${min}</td>
            <td>${sum}</td>
            <td>${avg}</td>
        `
        tr.innerHTML = inner
        content.appendChild(tr)
    }
}