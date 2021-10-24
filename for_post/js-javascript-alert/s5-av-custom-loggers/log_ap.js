let logger = (function () {

    let create = (opt) => {

        opt = opt || {};
        opt.typeDefault = opt.typeDefault || 'info';
        opt.modName = opt.modName || '(unknown.js)';

        return function (mess, type, condition) {

            type = type || opt.typeDefault;
            condition = condition || function () {
                return true;
            };

            if (condition()) {

                console.log(mess);

            }

        };

    };

    return create;

}
    ());
