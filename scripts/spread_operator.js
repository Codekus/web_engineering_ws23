// Aus einer Map eine 2-Dimensionale Liste erstellen
const map = new Map();
map.set("key1", "val1")
map.set("key2", "val2")
map.set("key3", "val3")

const list2D = [...map]
/*
[
    [ 'key1', 'val1' ],
    [ 'key2', 'val2' ],
    [ 'key3', 'val3' ]
]
*/

// JS Objekt um weitere Eigenschaften erweitern
const person = {
    vorname: 'Ford',
    nachname: 'Mustang',
    alter: 'red'
}

const updateToPerson = {
    ort: 'car',
    strasse: 2021
}

const updatedPerson = {...person, ...updateToPerson}
/*
    {
      vorname: 'Ford',
      nachname: 'Mustang',
      alter: 'red',
      ort: 'car',
      strasse: 2021
    }

 */
