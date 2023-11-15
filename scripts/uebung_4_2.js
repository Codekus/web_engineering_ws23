function conflict(personList) {
    for (let i = 0; i < personList.length; i++) {
        for (let j = 0; j < personList.length; j++) {
            if (i === j) {
                continue;
            }
            if(personList[i].Auto === personList[j].Auto) {
                console.log(`${personList[i].toString()} und ${personList[j]} haben das gleiche auto: ${personList[i].Auto.toString()}`)
            }
        }
    }
}

function run_4_2() {
    var a1 = {
        __proto__: Auto,
        marke: "audi"
    }

    var p1 = {
        __proto__: Person,
        name: "p1",
        Auto: a1
    }

    var a2 = {
        __proto__: Auto,
        marke: "bmw"
    }

    var p2 = {
        __proto__: Person,
        name: "p2",
        Auto: a2
    }

    var a3 = {
        __proto__: Auto,
        marke: "merc"
    }

    var p3 = {
        __proto__: Person,
        name: "p3",
        Auto: a2
    }

    const personList = [p1, p2, p3]
    conflict(personList)
}
