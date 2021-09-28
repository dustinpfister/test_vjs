

## Linux

hello world
```
$ node -e "console.log('hello world', 40 + 2);"
hello world 42
```

```
$ node -e "let os=require('os');console.log(os.platform());"
linux
```

## Windows

hello world
```
C:\>node -e "console.log('hello world', 40 + 2);"
hello world 42
```

The os module
```
C:\>node -e "let os=require('os');console.log(os.platform());"
win32
```