const fs = require('fs');
const path = require('path');
const dts = require('react-to-typescript-definitions');

const data = dts.generateFromFile('antx', path.resolve(__dirname, 'lib/index.jsx'), {
  babylonPlugins: ['optionalChaining'],
});

fs.writeFile('index.d.ts', data, (err) => {
  if (err) console.log(err);
});
