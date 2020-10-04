
type IndexedObject = { [key: string]: unknown }

export const serialize = (obj: unknown): string => JSON.stringify(obj)

export function deserialize<T> (Ctor: new (...args: any[]) => T, fromStr: string): T {
  const from = JSON.parse(fromStr)
  if (!isNotNullObject(from)) {
    throw new Error('<from> not an object')
  }
  const instance = new Ctor()
  return deepDeserialize(from, instance) as T
}

const isNotNullObject = (obj: unknown): obj is IndexedObject =>
  typeof obj === 'object' && obj !== null

const deepDeserialize = (from: unknown, to: unknown): unknown => {
  if (Array.isArray(from)) {
    if (!Array.isArray(to)) {
      throw new Error(tryStringify(to) + ' not an array')
    }
    return from.map((obj) => deepDeserialize(obj, to?.[0]?.constructor ? new to[0].constructor() : {}))
  } else if (isNotNullObject(from)) {
    if (!isNotNullObject(to)) {
      throw new Error(tryStringify(to) + ' not an object')
    }
    for (const key in from) {
      to[key] = deepDeserialize(from[key], to[key])
    }
    return to
  } else {
    return from
  }
}

const tryStringify = (obj: unknown): string => {
  try {
    return JSON.stringify(obj)
  } catch (e) {
    console.error(e)
    return ''
  }
}