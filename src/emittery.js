import Emittery from 'emittery'
import { NanoresourcePromise as Nanoresource } from './index.js'

const kNanoresource = Symbol('nanoresource')

export class NanoresourcePromise {
  constructor (opts = {}) {
    const _open = opts.open || this._open.bind(this)
    const _close = opts.close || this._close.bind(this)

    this[kNanoresource] = new Nanoresource({
      open: async () => {
        await this.emit('open')
        await _open()
        await this.emit('opened')
      },
      close: async () => {
        await this.emit('close')
        await _close()
        await this.emit('closed')
      },
      reopen: opts.reopen
    })

    new Emittery().bindMethods(this)
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
  async open () {
    return this[kNanoresource].open()
  }

  /**
   * @returns {Promise}
   */
  async close (allowActive) {
    return this[kNanoresource].close(allowActive)
  }

  /**
   * @returns {boolean}
   */
  active (cb) {
    return this[kNanoresource].active(cb)
  }

  /**
   * @returns {boolean}
   */
  inactive (cb, err, value) {
    return this[kNanoresource].inactive(cb, err, value)
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
