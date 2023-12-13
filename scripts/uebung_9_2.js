loadChart()
async function loadChart() {
    const response = await fetch("../resources/uebung_9_2.json");
    const jsonData = await response.json();

    const map = new Map();

    jsonData["kategorie"]["bausteine"].forEach((baustein) => {
        const name = baustein["baustein_name"];
        let sum = 0;
        let amount = baustein["werte"].length;
        baustein["werte"].forEach((wert) => {
            let value = wert["wert"];
            let floatValue = parseFloat(value.replace(".", "").replace(",", ".")) || 0;
            console.log(floatValue)
            sum += floatValue;
        });

        const avg = (sum / amount) / 1000;
        map.set(name, avg);
    });

    console.log(map)

    const maxBar = Math.max(...map.values());
    const maxHeight = map.size * 25
    document.body.innerHTML = `
            <svg height="${map.size * 25}" width="${maxBar + 200}">
                <line x1="0" y1="0" x2="0" y2="${maxBar}" stroke="black" stroke-width="1"></line>
                <line x1="0" y1="${map.size * 25}" x2="${maxBar + 200}" y2="${(map.size * 25)}" stroke="black" stroke-width="1"></line>
            </svg>
        `
    let startHeight = 10
    let barOffset = 125

    map.forEach((value, key) => {
        document.querySelector("svg").innerHTML +=`
            <text x="${5}" y="${startHeight}" font-size="10" fill="black">${key}</text>
            <line x1="${barOffset}" y1="${startHeight-3}" x2="${value+barOffset}" y2="${startHeight-3}" stroke="black" stroke-width="5"/>
            <text x="${value+barOffset + 15}" y="${startHeight}" font-size="10" fill="black">${Math.round(value * 100) / 100
        }</text>
        `
        startHeight += 25
    })



}