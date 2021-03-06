# babel-plugin-transform-require
A babel plugin to turn ES5 require call to ES6/7

## Install
`npm install --save-dev babel-plugin-transform-require`

## Usage

##### Note: For using this package as standalone, you must install `babel-cli` using `npm i --save-dev babel-cli`

```javascript
import {transform} from 'babel-core';
import transformRequire from 'babel-plugin-transform-require';

const codeES5 = 'var a = require("a")';
const codeES6 = transform(codeES5, {
  plugins: [transformRequire]
}).code

// codeES5 => 'var a = require("a")';
// codeES6 => 'import a from "a"';

```
## Contributing
In case of bug or feature request, feel free to file an issue.
