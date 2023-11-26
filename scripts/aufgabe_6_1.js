
function checkString(inputString, pattern) {
    let map;
    if (pattern === "") {
         map = {
            "(": ")",
            "[": "]",
            "{": "}"
        }
    } else {
        map = createMapFromString(pattern)
        // regex hier rein
    }
    // Alles außer die Klammern entfernen
    inputString = filterString(inputString, Object.entries(map)
        .map(([key, value]) => key + value)
        .join(''))


    if(inputString === "") {
        return true;
    } else if (inputString.length === 1) {
        return false
    }

    let stack = []
    for(let i = 0; i < inputString.length; i++) {
        if(map.hasOwnProperty(inputString[i])){
            stack.push(inputString[i])
        } else {
            if (inputString[i] === map[stack[stack.length-1]]) {
                stack.pop()
            } else if (stack.length === 0) {
                return false
            }
        }
    }
    return stack.length === 0
}

/**
 *
 * @param inputString zb "x:y,a:b"
 * @returns key value map ->
 */
function createMapFromString(inputString) {
    const charPairs = inputString.split(',');

    const resultMap = {};
    charPairs.forEach(pair => {
        const [key, value] = pair.split(':');
        resultMap[key] = value;
    });

    return resultMap;
}

function evaluateTextField(inputString, pattern) {
    const isValid = checkString(inputString, pattern);

    console.assert(isValid, `Validation failed the String ${inputString} is not correct`);

    const inputElement = document.getElementById("input");
    inputElement.style.background = isValid ? "green" : "red";
}

function filterString(inputString, allowedCharacters) {
    const allowedSet = new Set(allowedCharacters);

    return inputString
        .split('')
        .filter(char => allowedSet.has(char))
        .join('');
}
