import { test } from 'uvu'
import * as assert from 'uvu/assert'

import { NanoresourcePromise } from '../src/emitter2.js'

test('basic', async () => {
  const calls = {
    open: 0,
    opened: 0,
    close: 0,
    closed: 0,
    event: 0
  }

  class Resource extends NanoresourcePromise {
    _open () {
      calls.open++
    }

    _close () {
      calls.close++
    }
  }

  const resource = new Resource()
  resource.on('open', () => {
    calls.open++
  })

  resource.on('opened', () => {
    calls.opened++
  })

  resource.on('close', () => {
    calls.close++
  })

  resource.on('closed', () => {
    calls.closed++
  })

  resource.on('foo', () => {
    calls.event++
  })

  await Promise.all([resource.open(), resource.open()])
  await resource.close()

  try {
    await resource.open()
    assert.unreachable()
  } catch (err) {
    assert.is(err.message, 'Resource is closed')
  }

  await resource.emitAsync('foo')

  assert.is(calls.open, 2)
  assert.is(calls.close, 2)
  assert.is(calls.opened, 1)
  assert.is(calls.closed, 1)
  assert.is(calls.event, 1)
})

test.run()
