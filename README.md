#### 自动更新package.json 的version版本号，每次版本号向上递增，并创建version.json将大版本号记录到该文件内

##### 全局安装

```sh

npm i npx-version -g

```

##### 根目录创建version.config.js配置文件

**entryFile**: package.json 文件地址
**outputFile**：记录大版本号的version.json 文件地址

```js

  const path = require('path')

  module.exports = {
    entryFile: path.resolve(__dirname, './package.json'),
    outputFile: path.resolve(__dirname, './build/version.json')
  }

```

> 若未配置 **version.config.js** ,则 **entryFile** 默认读取根目录的 **package.json** , **outputFile** 默认将 **version.json** 保存至根目录

##### 本地运行命令

```sh

npx-version create 1.0.0

```


###### 例：

package.json

```json

{
  "name": "npx-version",
  "version": "1.1.3",
  "description": "The version of the package.json",
  "main": "index.js",
}

```

version.json

```json

{"1.0.7":"1.0", "1.1.0":"1.1","1.2.0":"1.2"}

```



> 若写入版本号写入错误，请手动在package.json 或 version.json 手动修改版本号，暂不支持自动修复错误的版本号