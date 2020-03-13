const nanoresource = require('../emitter')

test('default', async () => {
  const open = jest.fn(() => Promise.resolve())
  const close = jest.fn(() => Promise.resolve())
  const event = jest.fn()

  const resource = nanoresource({
    open,
    close
  })

  await resource.open()
  await resource.close()

  expect(open).toHaveBeenCalledTimes(1)
  expect(close).toHaveBeenCalledTimes(1)
  expect(resource.open()).rejects.toThrow('Resource is closed')

  resource.on('foo', event)
  resource.emit('foo')
  expect(event).toHaveBeenCalledTimes(1)
})

test('extended', async () => {
  const open = jest.fn(() => Promise.resolve())
  const close = jest.fn(() => Promise.resolve())
  const event = jest.fn()

  class Resource extends nanoresource.NanoresourcePromise {
    _open () {
      return open()
    }

    _close () {
      return close()
    }
  }

  const resource = new Resource()
  await resource.open()
  await resource.close()

  expect(open).toHaveBeenCalledTimes(1)
  expect(close).toHaveBeenCalledTimes(1)
  expect(resource.open()).rejects.toThrow('Resource is closed')

  resource.on('foo', event)
  resource.emit('foo')
  expect(event).toHaveBeenCalledTimes(1)
})
