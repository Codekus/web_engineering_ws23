function loadTextFile() {

    const urlParams = new URLSearchParams(window.location.search);

    var filePath = urlParams.get("exercise");

    var xhr = new XMLHttpRequest();
    xhr.open('GET', filePath);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var textContent = xhr.responseText;

            // Parse the XML content
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(textContent, 'text/xml');

            // Extract the text from the "uebungtitel" node
            var uebungTitel = xmlDoc.querySelector('exercise').textContent;

            // Set the extracted text in a variable
            var titleVariable = uebungTitel;

            // Display the extracted text in the HTML element
            document.getElementById('textid').innerHTML = titleVariable;
        }
    };

    xhr.send();
}

function createTextSection(resultSet) {

}

function another(text) {
    alert(text)
}
