const nanoresource = require('..')

test('default', async () => {
  const open = jest.fn(() => Promise.resolve())
  const close = jest.fn(() => Promise.resolve())

  const resource = nanoresource({
    open,
    close
  })

  await resource.open()
  await resource.close()

  expect(open).toHaveBeenCalledTimes(1)
  expect(close).toHaveBeenCalledTimes(1)
  expect(resource.open()).rejects.toThrow('Resource is closed')
})

test('class', async () => {
  const open = jest.fn(() => Promise.resolve())
  const close = jest.fn(() => Promise.resolve())

  class Custom extends nanoresource.NanoresourcePromise {
    async _open () {
      return open()
    }

    async _close () {
      return close()
    }
  }

  const resource = new Custom()

  await resource.open()
  await resource.close()

  expect(open).toHaveBeenCalledTimes(1)
  expect(close).toHaveBeenCalledTimes(1)
  expect(resource.open()).rejects.toThrow('Resource is closed')
})

test('preclosing', async () => {
  const open = jest.fn(() => Promise.resolve())
  const close = jest.fn(() => Promise.resolve())

  const resource = nanoresource({
    open,
    close
  })

  resource.open()
  await resource.close()

  expect(open).toHaveBeenCalledTimes(1)
  expect(close).toHaveBeenCalledTimes(1)
})
