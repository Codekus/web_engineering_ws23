function identify(type) {
    return type
}

function identity_function(type) {
    return function () {
        return identify(type)
    }
}

function add(x, y) {
    return x + y
}

function mul(x, y) {
    return x * y
}

var addf = function(x) {
        return function addY(y) {
            return add(x,y)
        }
}

function applyf(fun) {
    return function (x) {
        return function (y) {
            return fun(x,y)
        }
    }
}

function run_4_1() {
    let x = identity_function(5)

    console.log(identify(5))
    console.log(x())

    console.log(addf(5)(3))
    console.log(addf(5))

    var y = applyf(mul)
    console.log(applyf(mul))
    console.log(applyf(mul)(6)(6))
}

const Auto = {
    marke: this.marke,
    toString: function() {
        return this.marke
    }

}

const Person = {
    name: this.name,
    toString: function() {
        return this.name
    }
}