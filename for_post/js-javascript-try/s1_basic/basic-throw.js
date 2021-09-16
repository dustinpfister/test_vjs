try {
    throw new Error('User Error')
} catch (e) {
    console.log(e.message); // 'User Error'
}
