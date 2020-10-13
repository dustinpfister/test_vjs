try {
    try {
        throw new Error('My custom Error');
    }
    finally {
        console.log('finally');
    }
} catch (e) {
    console.log(e.message);
}

// 'finally'
// 'My custom Error'