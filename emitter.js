const { EventEmitter } = require('events')
const nanoresource = require('.')

const kNanoresource = Symbol('nanosignal.nanoresource')

module.exports = class NanoresourcePromise extends EventEmitter {
  constructor () {
    super()

    this[kNanoresource] = nanoresource({
      open: this._open.bind(this),
      close: this._close.bind(this)
    })
  }

  get opened () {
    return this[kNanoresource].opened
  }

  get opening () {
    return this[kNanoresource].opening
  }

  get closed () {
    return this[kNanoresource].closed
  }

  get closing () {
    return this[kNanoresource].closing
  }

  get actives () {
    return this[kNanoresource].actives
  }

  /**
   * @returns {Promise}
   */
  open () {
    return this[kNanoresource].open()
  }

  /**
   * @returns {Promise}
   */
  close (allowActive) {
    return this[kNanoresource].close(allowActive)
  }

  /**
   * @returns {Promise}
   */
  active () {
    return this[kNanoresource].active()
  }

  /**
   * @returns {Promise}
   */
  inactive (err, value) {
    return this[kNanoresource].inactive(err, value)
  }

  /**
   * @abstract
   */
  async _open () {}

  /**
   * @abstract
   */
  async _close () {}
}
