
var stackMod = (function () {
    var api = {};
    api.create = function (opt) {
        opt = opt || {};
        return {
            work: opt.work || [],
            updater: opt.updater || function (unit, secs) {
                return true;
            },
            onPurge: opt.onPurge || function (unit) {},
            onNoWork: opt.onNoWork || function (stack, secs) {}
        };
    };
    api.push = function (stack, work) {
        stack.work.push(work);
    };
    var update = function (unit, stack, secs) {

        if (typeof unit === 'object' && unit != null) {
            return stack.updater(unit, stack, secs);
        }
        return true;

    }
    api.update = function (stack, secs) {
        if (stack.work.length > 0) {
            var unit = stack.work[0];
            // call stack updater
            if (update(unit, stack, secs)) {
                // if updater returns true remove unit from stack
                stack.onPurge(unit, stack);
                stack.work.shift();
            }
        } else {
            if (stack.onNoWork) {
                stack.onNoWork(stack, secs);
            }
        }
    };
    return api;
}
    ());

var stack = stackMod.create({
        work: [null, {}, {
                secs: 0,
                secsMax: 3
            }
        ],
        updater: function (unit, stack, secs) {
            if (unit.secs === undefined || unit.secsMax === undefined) {
                return true;
            }
            unit.secs += secs;
            unit.secs = unit.secs > unit.secsMax ? unit.secsMax : unit.secs;
            if (unit.secs >= unit.secsMax) {
                return true;
            }
            return false;
        },
        onPurge: function (unit, stack) {
            console.log('unit purged: ');
            console.log(unit);
            console.log('');
        },
        onNoWork: function (stack, secs) {
            console.log('no work');
        }
    });

stackMod.update(stack, 1);
stackMod.update(stack, 1);
stackMod.update(stack, 4);
stackMod.update(stack, 1);
