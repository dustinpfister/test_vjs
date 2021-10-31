
var state = {
    onChange: function (e) {
        state[e.target.className] = e.target.value;
        state.figure();
    },
    figure: function () {
        this.money = this.rpm * (this.pageviews / 1000);
        document.getElementById('out').innerText = 'money: ' + this.money;
    }
};

[].forEach.call(document.getElementById('controls').children, function (el) {
    if (el.nodeName == 'INPUT') {
        el.addEventListener('change', state.onChange);
        state[el.className] = el.placeholder;
    }
});

state.figure();
