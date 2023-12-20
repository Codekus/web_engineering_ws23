const port = 8080;
import * as fs from 'node:fs';
import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.43/deno-dom-wasm.ts";
const handler = async (request: Request): Response<T> => {

    const xmlData = fs.readFileSync("./resources/marktdaten.xml", 'utf-8');
    const dom = new DOMParser().parseFromString(xmlData, "text/html")

    const map = new Map<string, Map<string, number>>();

    let bausteine = dom.querySelectorAll("baustein")
    bausteine.forEach(baustein => {
        const name = baustein.querySelector("baustein_name").textContent
        const werte = baustein.querySelectorAll("wert_detail")
        let max = -1;
        let min = 999999999;
        let sum = 0
        let avg: number
        let amount = werte.length
        werte.forEach(container => {
            const wert = container.querySelector("wert").textContent
            let zahl = parseFloat(wert.replace(".", "").replace(",", ".")) || 0
            sum += zahl
            if (zahl > max) {
                max = zahl
            }
            if(zahl < min) {
                min = zahl
            }
        })
        avg = sum / amount
        const valueMap = new Map<string, number>
        valueMap.set("max", max)
        valueMap.set("min", min)
        valueMap.set("avg", avg)
        valueMap.set("sum", sum)
        map.set(name, valueMap)
    })

    const plainObject: {
        [key: string]: {
            [key: string]: number
        }
    } = {};
    map.forEach((innerMap, outerKey) => {
        const innerObject: {
            [key: string]: number
        } = {};
        innerMap.forEach((value, innerKey) => {
            innerObject[innerKey] = value;
        });
        plainObject[outerKey] = innerObject;
    });

    const jsonString = JSON.stringify(plainObject);


    const body = `${jsonString}`;

    const headers = new Headers();
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Content-Type');

    const response = new Response(body, {
        status: 200,
        headers,
    });
    return response

};

Deno.serve({ port }, handler);
