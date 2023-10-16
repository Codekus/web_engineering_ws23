function loadHeader() {



    var filePath = "header.html";

 //   var xhr = new XMLHttpRequest();
  //  xhr.open('GET', filePath);

    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            // Insert the content into the .header <div>
            document.querySelector('.header').innerHTML = data;
        })
        .catch(error => console.error('Error:', error));

 //   xhr.send();
}