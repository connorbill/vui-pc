var fs = require('fs');
var path = require('path');
var version = process.env.VERSION || require('../../package.json').version;
var content = { '0.9.9': '0.9', '1.0.1': '1.0', '1.1.4': '1.1'};
if (!content[version]) content[version] = '1.1';
fs.writeFileSync(path.resolve(__dirname, '../../examples/versions.json'), JSON.stringify(content));
