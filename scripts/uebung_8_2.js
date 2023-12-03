async function readTextFiles() {
    const fetchA = fetch('http://localhost:8000/resources/A.txt')
        .then(res => res.text())
        .catch(error => console.error('Error fetching A.txt:', error));

    const fetchB = fetch('http://localhost:8000/resources/B.txt')
        .then(res => res.text())
        .catch(error => console.error('Error fetching B.txt:', error));


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
