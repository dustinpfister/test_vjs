try {
    throw new Error('user error');
} catch (e) {
    console.log(e.message); // 'user error'
}
