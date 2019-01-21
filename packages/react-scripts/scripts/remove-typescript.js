'use strict';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

const inquirer = require('react-dev-utils/inquirer');
const chalk = require('chalk');
const glob = require('glob');
const paths = require('../config/paths');
const babel = require('@babel/core');
const path = require('path');
const fs = require('fs');

const green = chalk.green;
const cyan = chalk.cyan;

function transformTSFile({ filePath, filename, code } = {}) {
  const options = {
    babelrc: false,
    presets: [babel.createConfigItem(require('@babel/preset-typescript'))],
    plugins: [
      babel.createConfigItem(require('@babel/plugin-syntax-dynamic-import')),
    ],
    filename,
  };

  const result = babel.transformSync(code, options);

  const newFilePath = filePath.replace(/\.tsx?$/, '.js');

  fs.writeFileSync(filePath, result.code, { encoding: 'utf-8' });
  fs.renameSync(filePath, newFilePath);
}

function transformPackageJson() {
  const packageJson = fs.readFileSync(paths.appPackageJson, {
    encoding: 'utf-8',
  });
  const parsedPackageJson = JSON.parse(packageJson);

  // delete all types packages
  Object.keys(parsedPackageJson.dependencies).forEach(dependencyName => {
    if (dependencyName.startsWith('@types/')) {
      delete parsedPackageJson[dependencyName];
    }
  });

  // delete typescript package
  delete parsedPackageJson.typescript;

  fs.writeFileSync(
    paths.appPackageJson,
    JSON.stringify(parsedPackageJson, null, 2),
    { encoding: 'utf-8' }
  );
}

inquirer
  .prompt({
    type: 'confirm',
    name: 'shouldEject',
    message:
      'Are you sure you want to remove typescript? This action is permanent.',
    default: false,
  })
  .then(answer => {
    if (!answer.shouldEject) {
      console.log(cyan('Close one! removing typescript aborted.'));
      return;
    }

    // convert all typescript files to javascript
    glob(
      '{src,__tests__}/**/*.{ts,tsx}',
      { cwd: paths.appPath, absolute: true },
      function(error, files) {
        if (error) {
          console.log('failed processing files', error);
        }

        files
          .map(filePath => ({
            filePath,
            filename: path.basename(filePath),
            code: fs.readFileSync(filePath, { encoding: 'utf-8' }),
          }))
          .forEach(transformTSFile);
      }
    );

    // convert all snapshots files to javascript
    glob(
      '__tests__/**/*.snap',
      { cwd: paths.appPath, absolute: true },
      function(error, files) {
        if (error) {
          console.log('failed processing snapshots', error);
        }

        files.forEach(filePath => {
          const newFilePath = filePath.replace(/\.tsx?\.snap/, '.js.snap');
          fs.renameSync(filePath, newFilePath);
        });
      }
    );

    // remove tsconfig
    fs.unlinkSync(paths.appTsConfig);

    transformPackageJson();

    console.log(green('transformation complete!'));
  });
