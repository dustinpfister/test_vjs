# todo list for server-demo script

## () - createIndexHTML helper
* start a createIndexHTML helper that will create and return an index of links for a given uri
* update createPathInfoObject to use createIndexHTML for any uri that does not have an index.html file.

## () - get lists for dirs
* if the uri is a full path to a resource:
    * get and set the pInfo.state prop
    * set pInfo.mime, pInfo.ext, and pInfo.encoding
* if the uri is a dir
    * check for an index.html
    * if html file, update pInfo.uri, and other props for that full path
    * if no html file read dir, and gen html creating a pInfo.html prop

## () - createPathInfoObject helper
* (done) have a createPathInfoObject helper that will return a custom path object
* (done) the custom path object will contain the origional req.url property as pInfo.url
* (done) the pInfo.uri will then be the location to actually use to send a resource

## ( done 09/06/2021 ) - use promises
* (done) use promises for fs methods