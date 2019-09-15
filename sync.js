var fs = require('fs');

const headerData = `---
name: 快速开始
route: /
---

import './theme.scss';

# 快速开始
`;

const licenseText = '## 协议';

const gitHubText = `## GitHub

[https://github.com/nanxiaobei/ant-plus](https://github.com/nanxiaobei/ant-plus)

`;

function syncReadmeToDoczIndex() {
  const readme = fs.readFileSync('./README.md', 'utf-8');

  let contentData = readme.replace(/.+\n/, '');
  contentData = contentData.replace(/(\[!\[npm.+)|(\[!\[GitHub.+)/g, '');
  contentData = contentData.replace(/\n{5}/g, '');

  const licenseIndex = contentData.indexOf(licenseText);
  contentData = contentData.slice(0, licenseIndex) + gitHubText + contentData.slice(licenseIndex);

  const data = headerData + contentData;
  fs.writeFileSync('./docz/Index.mdx', data, 'utf-8');
}

syncReadmeToDoczIndex();
