
process.on('uncaughtException', (e) => {
  console.log('An Error has happend: ' + e.message);
  process.exit(1);
});

throw new Error('Throwing an error outside of any try');
