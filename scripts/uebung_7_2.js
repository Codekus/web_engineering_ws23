const stopwords = require('stopwords-de'); // array of stopwords
const { JSDOM } = require('jsdom');
async function textAnalyzer() {
    const map = new Map();

    const text = await (await fetch('https://kaul.inf.h-brs.de/ccm/we/ws23/resources/assets/Plagiatsresolution.html')).text();
    const bodyText = new JSDOM(text).window.document.body.textContent;


    bodyText.split(/\s+/)
        .map(word => word.replace(/\n/g, ""))
        .filter(word => !stopwords.includes(word) && word.length > 0)
        .forEach(word => {
            if (!map.has(word)) {
                map.set(word, 1);
            } else {
                map.set(word, map.get(word) + 1);
            }
        });
    const sorted = [...map.entries()].sort((a, b) => b[1] - a[1]);
    return new Map(sorted.slice(0, 3));

}
textAnalyzer().then(result => console.log(result));
