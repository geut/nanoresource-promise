# nanoresource-promise

[![Build Status](https://travis-ci.com/geut/nanoresource-promise.svg?branch=master)](https://travis-ci.com/geut/nanoresource-promise)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

> Promises based nanoresource

## <a name="install"></a> Install

```
$ npm install nanoresource
```

## <a name="usage"></a> Usage

```javascript
const nanoresource = require('nanoresource')

;(async () => {
  const resource = nanoresource({
    async open() {
      // open the resource
    },
    async close() {
      // close the resource
    }
  })

  await resource.open()
  await resource.close()
})()
```

## <a name="issues"></a> Issues

:bug: If you found an issue we encourage you to report it on [github](https://github.com/geut/nanoresource-promise/issues). Please specify your OS and the actions to reproduce it.

## <a name="contribute"></a> Contributing

:busts_in_silhouette: Ideas and contributions to the project are welcome. You must follow this [guideline](https://github.com/geut/nanoresource-promise/blob/master/CONTRIBUTING.md).

## License

MIT © A [**GEUT**](http://geutstudio.com/) project
