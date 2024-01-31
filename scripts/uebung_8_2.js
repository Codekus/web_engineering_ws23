async function readTextFiles() {
    const resA = await fetch('http://localhost:8000/resources/A.txt');
    const fetchA = resA.text();

    const resB = await fetch('http://localhost:8000/resources/B.txt');
    const fetchB = resB.text();


    const main = document.querySelector("main")


    const linesA = (await fetchA).trim().split(/\r?\n/);
    const linesB = (await fetchB).trim().split(/\r?\n/);

    for (let i = 0; i < linesA.length; i++) {
        const el = document.createElement("div")
        el.textContent = linesA[i] + " " + linesB[i]
        main.appendChild(el)
    }


}


readTextFiles();
