var fs = require('fs');

const headerData = `---
name: 快速开始
route: /
---

import './theme.scss';

# 快速开始
`;

const gitHubText = `## GitHub

[https://github.com/nanxiaobei/ant-plus](https://github.com/nanxiaobei/ant-plus)

`;

function syncReadmeToDoczIndex() {
  const readme = fs.readFileSync('./README.md', 'utf-8');

  let contentData = readme.replace(/(.+)\n/, '');
  contentData = contentData.replace(/(\[!\[npm.+)|(\[!\[GitHub.+)/g, '');
  contentData = contentData.replace(/\n{5}/g, '');
  contentData = contentData.replace(/## 文档\n{2}(.+)\n{2}/, gitHubText);

  const data = headerData + contentData;
  fs.writeFileSync('./docz/Index.mdx', data, 'utf-8');
}

syncReadmeToDoczIndex();
