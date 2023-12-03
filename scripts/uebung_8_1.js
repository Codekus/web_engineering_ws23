function readTextFiles() {
    const fetchA = fetch('http://localhost:8000/resources/A.txt')
        .then(res => res.text())
        .catch(error => console.error('Error fetching A.txt:', error));

    const fetchB = fetch('http://localhost:8000/resources/B.txt')
        .then(res => res.text())
        .catch(error => console.error('Error fetching B.txt:', error));


    const main = document.querySelector("main")
    Promise.all([fetchA, fetchB])
        .then(([dataA, dataB]) => {
            const linesA = dataA.trim().split(/\r?\n/);
            const linesB = dataB.trim().split(/\r?\n/);

            for (let i = 0; i < linesA.length; i++) {
                const el = document.createElement("div")
                el.textContent = linesA[i] + " " + linesB[i]
                main.appendChild(el)
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });


}


readTextFiles();
