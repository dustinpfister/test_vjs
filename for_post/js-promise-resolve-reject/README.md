# js-promise-resolve-reject

These are some source code examples that have to do with the [Promise.resolve and Promise.reject static methods as well as the resolve and reject methods called inside the body of functions that are passed to the Promise Constructor](https://dustinpfister.github.io/2019/09/18/js-promise-resolve-reject/). I am also taking a moment to go over promises in general while I am at it in an effort to get more into depth about what the whole resolve and reject thing is with promises.

## The Basics

When it comes to what the basic core idea of what this collection of source code is all about there are the Promise.resolve and Promise.reject methods of the Promise Global. These methods can be used to quickly return a resolved or rejected promise Object. On to of that there are also the resolve and reject methods that can be used by way of arguments inside the body of a function that is passed to the Promise constructor, which can also be used to get the same result. However If I just simple want a resolved of rejected promise object that results in code that is a little more complex then it needs to be.

So then the basic section of a blog post on this should outline just simply the use of the Promise constructor compared to the Promise.resolve and Promise.reject methods.

The Constructor:

```js
new Promise(function (resolve, reject) {
    resolve('foo');
})
.then(function (str) {
    console.log(str);
})
.catch(function (e) {
    console.warn(e);
});
// 'foo'
```

Promise.resolve and Promise.reject

```js
Promise.resolve('foo')
.then(function (str) {
    console.log(str);
});
// 'foo'
Promise.reject(new Error('No Good'))
.catch(function (e) {
    console.warn(e.message);
});
// 'No Good'
```

I do not care to make my basics sections to thin though, and also these sections are often intended for people that are still fairly new to javaScript. So the rest of the Basic section of the post should also contain basic examples of Promises in general, as well as other related topics. Still there are some things that should be expanded on in more advanced sections of the post.