const stopwords = require('stopwords-de'); // array of stopwords
const { JSDOM } = require('jsdom');
function textAnalyzer() {
    fetch('https://kaul.inf.h-brs.de/ccm/we/ws23/resources/assets/Plagiatsresolution.html')
        .then(res => res.text())
        .then(data => {
            const dom = new JSDOM(data).window.document;
            console.log(dom.body.textContent);
    })
}

textAnalyzer()