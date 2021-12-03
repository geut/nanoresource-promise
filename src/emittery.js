import Emittery from 'emittery'
import { NanoresourcePromise as Nanoresource } from './index.js'

const kNanoresource = Symbol('nanoresource')

export class NanoresourcePromise {
  constructor (opts = {}) {
    const _open = opts.open || this._open.bind(this)
    const _close = opts.close || this._close.bind(this)

    this._emitOpened = null
    this._emitClosed = null

    this[kNanoresource] = new Nanoresource({
      open: async () => {
        await this.emit('open')
        await _open()
      },
      close: async () => {
        await this.emit('close')
        await _close()
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
    await this[kNanoresource].open()
    if (!this._emitOpened) {
      this._emitOpened = this.emit('opened')
      this._emitClosed = null
    }
    await this._emitOpened
  }

  /**
   * @returns {Promise}
   */
  async close (allowActive) {
    await this[kNanoresource].close(allowActive)
    if (!this._emitClosed) {
      this._emitClosed = this.emit('closed')
      this._emitOpened = null
    }
    await this._emitClosed
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
