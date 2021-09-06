# todo list for server-demo script

## () - createIndexHTML helper
* start a createIndexHTML helper that will create and return an index of links for a given uri
* update createPathInfoObject to use createIndexHTML for any uri that does not have an index.html file.

## () - createPathInfoObject helper
* have a createPathInfoObject helper that will return a custom path object
* the custom path object will contain the origional req.url property as pInfo.url
* the pInfo.uri will then be the location to actually use to send a resource

## ( done 09/06/2021 ) - use promises
* (done) use promises for fs methods