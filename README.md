# Get Installed Browsers
Get a list of installed browsers

## Usage

```js
const getInstalledBrowsers = require('get-installed-browsers');
console.log(getInstalledBrowsers());
```

```js
[
  {
    name: 'Chrome',
    type: 'chrome',
    path: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  },
  {
    name: 'Vivaldi',
    type: 'chrome',
    path: '/Applications/Vivaldi.app/Contents/MacOS/Vivaldi'
  },
  {
    name: 'Firefox',
    type: 'firefox',
    path: '/Applications/Firefox.app/Contents/MacOS/firefox'
  },
  {
    name: 'Safari',
    type: 'safari',
    path: '/Applications/Safari.app/Contents/MacOS/Safari'
  },
  {
    name: 'Orion',
    type: 'safari',
    path: '/Applications/Orion.app/Contents/MacOS/Orion'
  }
]
```