#!/usr/bin/env node
// 读取packgaejson
const packageConfig = require('./package.json')
const push = require('./build/versions.js')

const { program } = require('commander');

// 这样输出-V或--version就能看到版本号了
program.version(packageConfig.version)

// 使用zhizu init my
program
  .command('')
  .action(() => {
    push()
  });

// program.option('-ig,--initgit', 'init git');

program.parse(process.argv);
