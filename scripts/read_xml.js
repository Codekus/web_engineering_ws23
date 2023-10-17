function loadXMLFile() {
    const urlParams = new URLSearchParams(window.location.search);

    var filePath = urlParams.get("exercise");

    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(data, 'text/xml');

            var uebungTitel = xmlDoc.querySelector('exercise').textContent;

            var titleVariable = uebungTitel;

            // Display the extracted text in the HTML element
            document.getElementById('textid').innerHTML = titleVariable;
    })
}


function createTextSection(resultSet) {

}

function another(text) {
    alert(text)
}

function fun() {
    alert("function fun")
}