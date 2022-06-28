import { Nanoresource } from './nanoresource-cb.js'

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

const kNanoresource = Symbol('nanoresource')

export class NanoresourcePromise {
  constructor (opts = {}) {
    const open = opts.open || this._open.bind(this)
    const close = opts.close || this._close.bind(this)

    this[kNanoresource] = new Nanoresource({
      open: (cb) => processPromise(open, cb),
      close: (cb) => processPromise(close, cb),
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
  open () {
    const callback = callbackPromise()
    this[kNanoresource].open(callback)
    return callback.promise
  }

  /**
   * @returns {Promise}
   */
  close (allowActive = false) {
    const callback = callbackPromise()
    this[kNanoresource].close(allowActive, callback)
    return callback.promise
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

async function processPromise (fnPromise, cb) {
  try {
    await fnPromise()
    cb()
  } catch (err) {
    cb(err)
  }
}
