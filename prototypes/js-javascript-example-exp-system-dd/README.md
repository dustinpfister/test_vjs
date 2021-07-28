# js-javascript-example-exp-system-dd

The aim here is to make an experence point system based on the system used in the original Dungeons and Dragons. Just like many of my other experence point systems I have had a hard time making an inverse function for getting level when xp is known. So as of this writing I have not gotten far with this one also.


### resources

Get xp with known level functions.

```
In this post:
http://howtomakeanrpg.com/a/how-to-make-an-rpg-levels.html
An expression like this is used:
500 * Math.pow(level, 2) - 500 * level
```

```
In a post from this fourm back in 2005
https://forum.rpg.net/index.php?threads/d-d-3-3-5-xp-formula.228600/#:~:text=The%20formula%20you%20want%20is,*(N%2D1)*500.
Another expression is used like this
level * ( level - 1 ) * 500
```
