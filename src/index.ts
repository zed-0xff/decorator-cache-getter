export interface CachePropertyDescriptor<T, R> extends PropertyDescriptor {
  get?: (this: T) => R
};

export function cache<T, R> (
  target: any,
  name: PropertyKey,
  descriptor: CachePropertyDescriptor<T, R>
): void {
  const getter = descriptor.get

  if (getter === undefined) {
    throw new TypeError('Getter property descriptor expected')
  }

  descriptor.get = function (this: T) {
    const value = getter.call(this)

    Object.defineProperty(this, name, {
      configurable: descriptor.configurable,
      enumerable: descriptor.enumerable,
      writable: false,
      value
    })

    return value
  }
}
