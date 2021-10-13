# js-filereader

The [FileReader constructor](https://dustinpfister.github.io/2020/03/24/js-filereader/) in client side javaScript is a way to read files that may be stored on a local file system but allowing the user to find and select a file to read. This can then be used as yet another way to load and save state beyond just using cookie files, and local storage.

## 1 - A basic example of File Reader

The basic example that I worked out thus far involves using the [file input element type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file), and attaching an on change event to it. It is in the body of this on chnage event that I will want to use the FileReader Constructor.

```html
<input type = "file" id = "input_files">
<div id = "out"></div>
<script>
 
var loadJSON = function (text) {
    try {
        var obj = JSON.parse(text);
        obj.message = 'loaded file';
        return obj;
    } catch (e) {
        return {
            x: 0,
            y: 0,
            message: e.message
        };
    }
};
 
var el_files = document.getElementById('input_files');
el_out = document.getElementById('out'),
el_files.addEventListener('change', function (e) {
    var files = this.files;
    console.log(files);
    var reader = new FileReader();
    reader.onload = function (e) {
        var obj = loadJSON(e.target.result);
        //console.log(obj);
        out.innerText = 'state: ' + obj.x + ',' + obj.y + ' : ' + obj.message
    };
    reader.readAsText(files[0]);
});
</script>
```