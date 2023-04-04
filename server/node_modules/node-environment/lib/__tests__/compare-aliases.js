import compare from '../compare-aliases'

describe('compare-aliases', () => {
  const env = 'TEST'

  describe('return false when', () => {
    it('no aliases provided', () => {
      expect(compare(env)).toBeFalse()
    })

    it('no alias has the exact match', () => {
      expect(compare(env, 'testing', 'tested')).toBeFalse()
    })
  })

  describe('return true when', () => {
    it('given exact matched lowercased alias', () => {
      expect(compare(env, 'test')).toBeTrue()
    })

    it('given exact matched uppercased alias', () => {
      expect(compare(env, 'TEST')).toBeTrue()
    })

    it('given several aliases in the list', () => {
      console.log('compare', compare)
      expect(compare(env, 'a', 'b', 'test', 'd', 'test')).toBeTrue()
    })
  })
})
