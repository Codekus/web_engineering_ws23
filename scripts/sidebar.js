function loadSidebar() {
    fetch('sidebar.html')
        .then(response => response.text())
        .then(data => document.querySelector('#exercise-sidebar').innerHTML = data)
        .catch(error => console.error('Error:', error));

  //  document.getElementById("exercise-sidebar").style.height = "100vh";
}

function openNav() {
    if (window.screen.width > 400) {
    //    document.getElementById("exercise-sidebar").style.width = "250px";
    //    document.getElementById("main").style.marginLeft = "250px";
    } else {
    //    document.getElementById("exercise-sidebar").style.width = "100%";
    }
    //document.getElementById("exercise-sidebar").style.visibility = "visible";

}

function closeNav() {
  //  document.getElementById("exercise-sidebar").style.width = "0";
  //  document.getElementById("main").style.marginLeft= "0";
    document.getElementById("exercise-sidebar").style.visibility = "hidden";
}

