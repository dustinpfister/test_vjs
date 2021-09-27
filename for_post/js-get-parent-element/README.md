# js-get-parent-element

These are the source code examples that appear on my [post on the topic of getting parent element references in client side javaScript](https://dustinpfister.github.io/2019/02/21/js-get-parent-element/). The quick and simple way of doing this and moving on would be to use the parentElement property of the element reference of which one would like to get the parent element of. However there is a bit more to it then just that when it comes to the various other options to work with when it comes to this specific task. For example there is the parent Node property of an element object also that works more or less the same way, but will also work with various nodes that are not an html standard. So then when it comes to working with nodes that are not part of the HTML standard such as SVG the parent node property will prove to be more generic with respect to nodes in general, not just html elements.


## the quick and simple solution parentElement, and parentNode

The quick answer is generally to use the parent element, and parent node properties of an element reference. The parent element property will return null for a parent that is not an html element, wild the parent node property will only be null if there is no node at all.

```js
<html>
    <head>
        <title>parent node example</title>
    </head>
    <body>
        <script>
var el = document.getElementsByTagName('html')[0];
console.log(el.parentElement); // null
console.log(el.parentNode); // #document
        </script>
    </body>
</html>
```