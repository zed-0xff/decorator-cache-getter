import { cache } from './index'

describe('decorator cache getter', () => {
  it('should cache result of getter', () => {
    class Test {
      i = 0

      @cache
      get incr (): number {
        return ++this.i
      }
    }

    const test = new Test()

    expect(test.incr).toEqual(1)
    expect(test.incr).toEqual(1)
    expect(test.incr).toEqual(1)

    expect(test.i).toEqual(1)
  })

  /* eslint-disable @typescript-eslint/no-extraneous-class */
  it('should cache result of static getter', () => {
    class Test {
      static i = 0

      @cache
      static get incr (): number {
        return ++this.i
      }
    }

    expect(Test.incr).toEqual(1)
    expect(Test.incr).toEqual(1)
    expect(Test.incr).toEqual(1)

    expect(Test.i).toEqual(1)
  })

  /* eslint-disable @typescript-eslint/no-unused-vars */
  it('should raise when decorating a non-getter', () => {
    expect(() => {
      class Test {
        @cache
        method (): void {
          /* Empty */
        }
      }
    }).toThrowError(TypeError)
  })
})
