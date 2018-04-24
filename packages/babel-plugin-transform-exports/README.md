# babel-plugin-transform-exports
A babel plugin to turn ES5 exports or module.exports call to ES6/7

## Install
`npm install --save-dev babel-plugin-transform-exports`

## Usage
```javascript
import {transform} from 'babel-core';
import transformExports from 'babel-plugin-transform-exports';

const codeES5 = 'module.exports = 123';
const codeES6 = transform(codeES5, {
  plugins: [transformExports]
})

// codeES5 => 'module.exports = 123';
// codeES6 => 'export default 123';

```
## Contributing
In case of bug or feature request, feel free to file an issue.