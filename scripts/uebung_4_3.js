function fibonacci(n) {
    if (n === 0 || n === 1) {
        return n;
    }

    const table = new Map();
    table.set(0, (0));
    table.set(1, (1));

    for (let i = 2; i <= n; i++) {
        const next = table.get(i - 1) + table.get(i - 2);
        table.set(i, next);

    }

    for (let [key, value] of table) {
        if(value >= Number.MAX_VALUE) {
            console.log(key + " = " + value);
            break
        }
    }
}
