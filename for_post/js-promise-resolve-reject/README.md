# js-promise-resolve-reject

These are some source code examples that have to do with the blog post that I have written, and edit on occasion on the topic of [resolve and reject](https://dustinpfister.github.io/2019/09/18/js-promise-resolve-reject/) when working with Promises. Mainly the Promise.resolve and Promise.reject static methods as well as the resolve and reject methods called inside the body of functions that are passed to the Promise Constructor. I am also taking a moment to go over promises in general in this post, as well as any and all other topics that are closely related to the use of promises.

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

## Advanced sections

After the basics section of the post I of course often like to have at least one, if not more advanced sections where I am getting into more complex topics that should often stick to the central over all theme of the post. AFter that basics of resolve and reject when it comes to Promises there is just getting into other related topics such as the Event Loop and how to create more of them by way of WebWorker and the child process. There ar also other related topics that could prove to be an advanced topic such as file io, http, and error handling in both a client side and nodejs environment.

### The Event loop

After the basics section I think a first more advanced section should at least touch base on the topic of what and Event loop is, and how this relates to the topic of Promises. That is that there is not just thinking in terms of what a Promise is, but also what it is not. A promise is a way to start doing something that may not delay the rest of a script, but in some cases it will, becuase when using a Promise one is still working within a single event loop. So then in this section the focus should still be the topic of resolving and rejecting, but also what kinds of things one can do in a promise that will and will not hold up the rest of the event loop. There is also looking into things that help to resolve issues that might cope up that will hold up the event loop such as WebWorker, and the child process module.

### File IO

Another good advanced section might have to do with file io in general by way of the file system and util modules in nodejs, and using the FileReader constructor maybe when it comes to Client side javaScript.

### Scripting http

There could be a whole section that is some promise examples that have to do with scripting http by way of the fetch api for example. There is also using the XMLHttprequest method with the Promise constructor when in comes to client side javaScript. When it comes to nodejs there is of course the http module and using that with the util module to make sure that the methods will return promises in older versions of node.

### Error handing

Error handing is of course another major part of promises, and the whole resolve and reject thing. This is yet another topics that deserves a whole section where I can get into depth with this topic.

## FULL Examples

After a basics section, and advanced sections The only thing that remains after that is to just start making one or more simple project examples using what was outlined in the post. These can be full applications, but often it is best to keep these as striped down and basic as possible. Often I might not get this far with a post if there is not much intensive to do so, posts that get more traffic of course get more attention when it comes to editing an expansion. So if this post never takes off I might not even get to this point.

