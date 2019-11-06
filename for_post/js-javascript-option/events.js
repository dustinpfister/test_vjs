var sel = document.getElementById('select_modes');
// there is attaching an on change event to the select element
// and using the value property of the select element
sel.addEventListener('change', (el) => {
    var sel = el.target; // reference to the select element
    console.log(sel.value); // the current value of the select element
});

var opt = new Option('mode2', '2', true, true);
sel.add(opt);
