try {
    throw Error('this is a custom error object');
} catch (e) {
    console.log('name: ', e.name);
    console.log('message: ', e.message);
}
// name: Error
// message:  this is a custom error object
