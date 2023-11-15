
function perfomanceLoad() {



    let timerMap = new Map([
        ["innerHTML", 0.0],
        ["innerText", 0.0],
        ["textContent", 0.0],
        ["outerHTML", 0.0]
    ]);

    if(document.querySelector("#outerHTML") === null) {
        document.querySelector("#textContainer").innerHTML = ""
        timerMap.forEach((value, key) => {
                const outerHTMLElement = document.createElement("div");
                outerHTMLElement.setAttribute("id", key)
                document.querySelector("#textContainer").appendChild(outerHTMLElement)
        })

    }

    timerMap.forEach(
        (value, key) => {
            let t0 = performance.now();
            document.getElementById(key)[key] = "text";
            let t1 = performance.now();
            timerMap.set(key, t1 - t0)
            document.getElementById("td" + key).textContent = timerMap.get(key).toString()
            console.log(`${key}: ${timerMap.get(key)}`)
        });

    let min = 9999;
    let mapKey = ""
    timerMap.forEach((value, key) => {
        if (value < min ) {
            min = value;
            mapKey = key;
        }
    });


    document.getElementById("result").textContent = `Fastest method: ${mapKey} -> ${min} ms`
    console.log("------")

}