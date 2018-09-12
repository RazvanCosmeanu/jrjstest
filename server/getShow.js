const https = require('https');
const fs = require('fs');

const jsonSrc =
  'https://gist.githubusercontent.com/thekiwi/ab70294c8d7ab790d9b6d70df9d3d145/raw/14513c7b841b37b2406dda4d3b9143a25700a68e/silicon-valley.json';

const filePath = __dirname + '/show.json';

https.get(jsonSrc, res => {
  res.pipe(fs.createWriteStream(filePath, { flags: 'w' }));
});
