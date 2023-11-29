const stopwords = require('stopwords-de'); // array of stopwords
const { JSDOM } = require('jsdom');
function textAnalyzer() {
    fetch('https://kaul.inf.h-brs.de/ccm/we/ws23/resources/assets/Plagiatsresolution.html')
        .then(res => res.text())
        .then(data => {
            const dom = new JSDOM(data).window.document;
            console.log(dom.body.textContent);

            // todo: filter den text: wenn wort nicht in liste, dann setze wort als key und counter als value++, dann am ende top 3 wählen
    })
}

textAnalyzer()