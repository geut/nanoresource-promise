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
        this.emit('opened')
      },
      close: async () => {
        this.emit('close')
        await _close()
        this.emit('closed')
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
