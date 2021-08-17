import { EventEmitter } from 'events'
import { NanoresourcePromise as Nanoresource } from './index.js'

const kNanoresource = Symbol('nanoresource')

export class NanoresourcePromise extends EventEmitter {
  constructor (opts = {}) {
    super()

    const _open = opts.open || this._open.bind(this)
    const _close = opts.close || this._close.bind(this)

    this[kNanoresource] = new Nanoresource({
      open: async () => {
        this.emit('open')
        await _open()
      },
      close: async () => {
        this.emit('close')
        await _close()
      },
      reopen: opts.reopen
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
  async open () {
    await this[kNanoresource].open()
    this.emit('opened')
  }

  /**
   * @returns {Promise}
   */
  async close (allowActive) {
    await this[kNanoresource].close(allowActive)
    this.emit('closed')
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
