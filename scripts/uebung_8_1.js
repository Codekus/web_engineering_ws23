
function readTextFiles() {

    const fetchA = fetch('../resources/A.txt')
        .then(res => res.text())
    const fetchB = fetch('../resources/B.txt')
        .then(res => res.text())

    const allData = Promise.all([fetchA, fetchB]);
    allData.then((res) => console.log(res));

}

readTextFiles()
