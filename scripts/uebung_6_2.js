

class Vorrang {
    constructor(deps) {
        this.length = new Set(deps.flat()).size;
        this.graph = deps;
    }

    #findFirstDependency() {

        if(this.graph.length === 1) {
            let toReturn = this.graph[0][0];
            this.graph[0][0] = this.graph[0][1]
            this.graph[0][1] = ""
            return toReturn
        }
        const indegree = new Map();
        const adjacencyList = new Map();

        for (const [from, to] of this.graph) {
            if (!adjacencyList.has(from)) {
                adjacencyList.set(from, []);
            }
            adjacencyList.get(from).push(to);

            indegree.set(to, (indegree.get(to) || 0) + 1);
            indegree.set(from, indegree.get(from) || 0);
        }

        // Find the nodes with an indegree of 0
        const queue = [];
        for (const [node, degree] of indegree) {
            if (degree === 0) {
                queue.push(node);
            }
        }


        while (queue.length > 0) {
            const current = queue.shift();
            const neighbors = adjacencyList.get(current) || [];

            for (const neighbor of neighbors) {
                indegree.set(neighbor, indegree.get(neighbor) - 1);

                if (indegree.get(neighbor) === 0) {
                    queue.push(neighbor);
                }
            }
            this.#removeFromGraph(current)
            return current;
        }
        return null;
    }


    #removeFromGraph(toRemove) {
        this.graph = this.graph.filter(([from, to]) => from !== toRemove);
    }

    [Symbol.iterator]() {
        let index = 0;
        // erste Task finden und dann von graph entfernen, somit wird immer nach der näcsten Task gesucht
        return {
            next: () => {
                if (index < this.length) {
                    const value = this.#findFirstDependency();
                    index++;
                    return { value, done: false };
                } else {
                    return { done: true };
                }
            },
        };
    }

    * next() {
        for(let i = 0; i < this.length; i++) {
            yield this.#findFirstDependency()
        }
    }
}

const studentenLeben = new Vorrang([
    ["schlafen", "studieren"],
    ["zocken", "studieren"],
    ["essen", "studieren"],
    ["studieren", "prüfen"],
]);

for (const x of studentenLeben) {
    console.log(x)
}

const studentenLeben2 = new Vorrang([
    ["schlafen", "studieren"],
    ["zocken", "studieren"],
    ["essen", "studieren"],
    ["studieren", "prüfen"],
]);

