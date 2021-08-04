import { test } from 'uvu'
import * as assert from 'uvu/assert'

import { NanoresourcePromise } from '../src/index.js'

test('basic', async () => {
  const calls = {
    open: 0,
    close: 0
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

  await resource.open()
  await resource.close()

  try {
    await resource.open()
    assert.unreachable()
  } catch (err) {
    assert.is(err.message, 'Resource is closed')
  }

  assert.is(calls.open, 1)
  assert.is(calls.close, 1)
})

test('preclosing', async () => {
  const calls = {
    open: 0,
    close: 0
  }

  const resource = new NanoresourcePromise({
    open: () => calls.open++,
    close: () => calls.close++
  })

  resource.open()
  await resource.close()

  assert.is(calls.open, 1)
  assert.is(calls.close, 1)
})

test('reopen', async () => {
  const calls = {
    open: 0,
    close: 0
  }

  const resource = new NanoresourcePromise({
    open: () => calls.open++,
    close: () => calls.close++,
    reopen: true
  })

  await resource.open()
  resource.close()
  await resource.open()

  assert.is(calls.open, 2)
  assert.is(calls.close, 1)
  assert.ok(resource.opened)
  assert.not.ok(resource.closed)
})

test.run()
