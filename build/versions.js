var fs = require('fs')
var path = require('path')
var colors = require('colors')

var configFile =  path.join(path.resolve('.'), './version.config.js')

var versionFiles = null

try {
  versionFiles = require(configFile);
} catch (err) {
  if (err.code === 'MODULE_NOT_FOUND') {
    versionFiles = {
      entryFile: path.join(path.resolve('.'), './package.json'),
      outputFile: path.join(path.resolve('.'), './version.json')
    }
  }
}

var packageJson = require(versionFiles.entryFile)

if (!packageJson.version) {
  console.error('The version attribute in package.json is not configured'.red)
  process.exit(1)
}



function splitVersion(version) {
  var v = version.split('.')
  return v.slice(0, v.length - 1).join('.')
}

function createV(version = null) {
  var VERSION = version || process.env.VERSION || packageJson.version || process.argv[2]
  var VERSION_PATH = versionFiles.outputFile
  // 读取verson.js
  fs.access(VERSION_PATH, fs.constants.F_OK | fs.constants.W_OK, function(err) {
    // 若不存在，则直接写入
    if (err) {
      fs.writeFile(VERSION_PATH, 
        JSON.stringify({
          [VERSION]: splitVersion(VERSION)
        }),
        function(err) {
          if (err) throw err
          console.log('写入 \'/versons.json\' 成功！')
        }
      )
    } else {
      // 若存在
      fs.readFile(VERSION_PATH, function(err, data) {
        if (err) throw err

        if (!data.toString('utf-8')) return

        var jsonArray = JSON.parse(data.toString('utf-8'))
        var lastVersion = Object.values(jsonArray).find(item => splitVersion(VERSION) === item)
        var newVersion = Object.create(null)
        if (!lastVersion) {
          // 若大版本不存在
          jsonArray[VERSION] = splitVersion(VERSION)
          newVersion = jsonArray

        } else {
          // 若大版本存在
          var lastSubVersion = Object.keys(jsonArray)

          lastSubVersion.map(item => {
            if (jsonArray[item] === splitVersion(VERSION)) {
              newVersion[VERSION] = splitVersion(VERSION)
            } else {
              newVersion[item] = jsonArray[item]
            }
          })
        }
        fs.writeFile(VERSION_PATH, JSON.stringify(newVersion),
          function(err) {
            if (err) throw err
            console.log('写入 \'/versons.json\' 成功！')
          }
        )

      })
    }
  })
}

module.exports = createV