const nanoresource = require('nanoresource')

function callbackPromise () {
  let callback

  const promise = new Promise((resolve, reject) => {
    callback = (err, value) => {
      if (err) reject(err)
      else resolve(value)
    }
  })

  callback.promise = promise
  return callback
}

class NanoresourcePromise extends nanoresource {
  constructor (opts) {
    super(opts)

    const _open = this._open.bind(this)
    const _close = this._close.bind(this)
    this._open = (cb) => { _open().then(() => cb()).catch(err => cb(err)) }
    this._close = (cb) => { _close().then(() => cb()).catch(err => cb(err)) }
  }

  /**
   * @returns {Promise}
   */
  open () {
    const callback = callbackPromise()
    super.open(callback)
    return callback.promise
  }

  /**
   * @returns {Promise}
   */
  close (allowActive = false) {
    const callback = callbackPromise()
    super.close(allowActive, callback)
    return callback.promise
  }

  /**
   * @returns {Promise}
   */
  active () {
    const callback = nanoresource.callbackPromise()
    super.active(callback)
    return callback.promise
  }

  /**
   * @returns {Promise}
   */
  inactive (err, val) {
    const callback = nanoresource.callbackPromise()
    super.inactive(callback, err, val)
    return callback.promise
  }

  async _open () {}
  async _close () {}
}

module.exports = (opts) => new NanoresourcePromise(opts)
module.exports.NanoresourcePromise = NanoresourcePromise
