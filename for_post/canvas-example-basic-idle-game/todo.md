# todo list for canvas-example-basic-idle-game


## draft_upgrade_cost.js
* (done) a method for setting upgrade cost
* (done) method for finding breakdown of cost for base, inc, and pow
* (done) use breakdown method for setting current cost

## draft_upgrade_effect.js
* (done) work out how an upgrade will effect something
* (done) main set upgrade state level function

## game.js
* (done) work draft_upgrade_effect into game.js
* (done) use UD property of state object to set effects for all upgrades in US Property

## draw.js
* (done) start a draw.js file
* (done) add a draw.debugUpgrades draw method
* draw buttonLayout

## utils.js
* (done) start a utils.js file
* (done) place get canvas relative in utils
* (done) place a bounding box method in utils
* (done) create a mkButtonLayoutHandler method that creates and returns an event hander for interacting with a game
* rename mkButtonLayoutHander to just mkButtonLayout
* mkButtonLayput returns an buttonLayputObject not a hander
* buttonLayputObject contains state of buttonLayput including buttons
* mkButtonLayout can accept an attachTo Property so event attachment happens in the method also

## main.js
* (done) handle user input for an upgrade menu
* have a functioning upgrade menu