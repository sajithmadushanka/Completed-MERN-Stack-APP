import inspector from '../inspector'
import { Development, Production } from '../modes.enum'

describe('env', () => {
  const devEnv = Object.keys(Development)
  const prodEnv = Object.keys(Production)

  describe.each(devEnv)('NODE_ENV=%s', (nodeEnv) => {
    beforeAll(() => {
      jest.resetModules()
      process.env.NODE_ENV = nodeEnv
    })

    it.each(devEnv)('return true for %s', (dev) => {
      expect(inspector(dev)).toBe(true)
    })

    it.each(prodEnv)('return false for %s', (prod) => {
      expect(inspector(prod)).toBe(false)
    })

    it('return false for non dev values', () => {
      expect(inspector('FAKE_ENV')).toBe(false)
    })

    it(`return true for uppercased ${nodeEnv}`, () => {
      expect(inspector(nodeEnv.toUpperCase())).toBe(true)
    })
  })

  describe.each(prodEnv)('NODE_ENV is %s', (nodeEnv) => {
    beforeAll(() => {
      jest.resetModules()
      process.env.NODE_ENV = nodeEnv
    })

    it.each(prodEnv)('return true for %s', (prod) => {
      expect(inspector(prod)).toBe(true)
    })

    it.each(devEnv)('return false for %s', (dev) => {
      expect(inspector(dev)).toBe(false)
    })

    it('return false for non-prod values', () => {
      expect(inspector('another value')).toBe(false)
    })

    it(`return true for uppercased ${nodeEnv}`, () => {
      expect(inspector(nodeEnv.toUpperCase())).toBe(true)
    })
  })

  describe('NODE_ENV is some other value', () => {
    const env = 'TEST'

    beforeEach(() => {
      jest.resetModules()
      process.env.NODE_ENV = env
    })

    describe('return false when', () => {
      it.each(devEnv.concat(prodEnv))('env is %s', (env) => {
        expect(inspector(env)).toBe(false)
      })

      it("env isn't NODE_ENV", () => {
        expect(inspector(env + 'gibirish')).toBe(false)
      })

      it('neither of multiple values is specified', () => {
        expect(inspector('a', 'b', 'c')).toBe(false)
      })
    })

    describe('return true for', () => {
      it('first of multiple values is correct', () => {
        expect(inspector(env, 'b', 'c', 'd')).toBe(true)
      })

      it('the middle of multiple values is correct', () => {
        expect(inspector('b', env, 'd')).toBe(true)
      })

      it('last of multiple values is correct', () => {
        expect(inspector('a', 'b', 'c', 'd', env)).toBe(true)
      })

      it('env is NODE_ENV', () => {
        expect(inspector(env)).toBe(true)
      })

      it('env is lower cased', () => {
        expect(inspector(env.toLowerCase())).toBe(true)
      })
    })
  })

  describe('env argument is missing', () => {
    beforeEach(jest.resetModules)

    it('return NODE_ENV env var', () => {
      const env = 'FAKE_ENV'
      process.env.NODE_ENV = env

      expect(inspector()).toBe(env)
    })

    it("return 'development' when NODE_ENV is empty", () => {
      delete process.env.NODE_ENV
      expect(inspector()).toBe('development')
    })
  })
})
