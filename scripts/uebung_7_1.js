

function curry(binaryFunction, param1) {
    return function(param2) {
        return binaryFunction(param1, param2)
    }
}

function add(one, two) {
    return one + two
}

function mul(one, two) {
    return one * two
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

function incAddf(x) {
    return addf(x)(1)
}

function incCurry(x) {
    return curry(add,x)(1)
}

function incApplyf(x) {
    return applyf(add)(x)(1)
}


function methodize(binaryFunction) {
    return function (x) {
        return binaryFunction(x, this)
    }
}

function demethodize(unaryFunction) {
    return function (x, y) {
        return unaryFunction.call(x, y);
    };
}

function twice(binaryFunction) {
    return function (x) {
        return binaryFunction(x,x)
    }
}

function composeu(fun1, fun2) {
    return function (x) {
        return fun2(fun1(x))
    }
}

function composeb(fun1, fun2) {
    return function (x,y,z) {
        return fun2(fun1(x,y),z)
    }
}

function once(fun) {
    let sum = null;
    return function (x,y) {
        if(sum === null) {
            sum = fun(x,y)
            return sum
        } else {
            throw new Error("already called once")
        }
    }
}

function counterf(x) {
    let num = x;
    return  {
        inc() {
            return ++num
        },
        dec() {
            return --num
        }
    }
}

function revocable(fun) {
    let revoked = false;
    return {
        invoke(x) {
            if(revoked) throw new Error("Its revoked")
            return fun(x)
        },
        revoke() {
            revoked = true;
        }
    }
}

function id(x) {
    return x
}

function vector() {
   const array = []

    return {
       get() {
           return array
       },
        append(x) {
           array.push(x)
        },
        store(...args) {
           args.forEach(el => {
               this.append(el)
           })
        }
    }
}


