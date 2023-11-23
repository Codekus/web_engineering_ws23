/**
 * offene Klammer zählen und addieren -> bei geschlossener Klammer dann counter subtrahieren
 */


function bracketCheck(str) {
    let toCheck = "";
    let closeStack = []
    const symbols = [')', ']', '}'];
    for (let i = 0; i < str.length; i++) {
        if(!symbols.includes(str[i])) {
            continue;
        }
        if (str[i] === closeStack[0]) {
            closeStack
            console.log("geschlossene Klammer gefunden")
            continue;
        }
        if(str[i] === "(") {
            closeStack.push(")")
        } else if(str[i] === ")") {
            closeStack.shift()
            break
        }
    }
}

function checkString(rest, pattern) {
    let map;
    if (pattern === undefined) {
         map = {
            "(": ")",
            "[": "]",
            "{": "}"
        }
        rest = filterString(rest, Object.entries(map)
            .map(([key, value]) => key + value)
            .join(''))
    } else {
        map = pattern
        rest = filterString(rest, pattern)
        // regex hier rein
    }

    // Alles außer die Klammern entfernen
    //let regex = /[a-zA-Z0-9]*/g;
    //rest = rest.replaceAll(regex, "");
    if(rest === "") {
        return true;
    }

    let stack = []
    for(let i = 0; i < rest.length; i++) {
        if(map.hasOwnProperty(rest[i])){
            stack.push(rest[i])
        } else {
            if (rest[i] === map[stack[stack.length-1]] || stack.length === 0) {
                stack.pop()
            } else {
                return false
            }
        }
    }
    return true
}

//bracketCheck("[(abc)]")
//let str = "abcdef";
//console.log(str.substring(0+1, str.length))
console.log(checkString("(a)(b)[]{([()])}"))
const map = {
    "(": ")",
    "[": "]",
    "{": "}"
}
//let curr = map[rest[i]]

//console.log("()([])".replace(/[)\]}]/g, ""))

function filterString(inputString, allowedCharacters) {
    for(inputString) // mit schleife chars entfernen
}


console.log(filterString("xabcyx8812y", "xy12"));