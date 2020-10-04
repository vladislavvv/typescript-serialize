
import { serialize, deserialize } from '../serialisation'

class ComplexObject {
  private id: number
  private values: string[]

  constructor (id?: number, values?: string[]) {
    this.id = id ?? 0
    this.values = values ?? []
  }

  public compute () {
    return `${this.id}: ${this.values.join(', ')}`
  }
}

class VeryComplexObject {
  public box: {
    cs: Array<ComplexObject>
    other: string[]
    smthg: number[]
  }

  constructor () {
    this.box = {
      cs: [new ComplexObject(0, [''])],
      other: [''],
      smthg: [0]
    }
  }
}

describe('Common test', () => {
  it('Complex object', () => {
    const obj = new ComplexObject(1234, ['message'])
    const json = serialize(obj)
    const des = deserialize(ComplexObject, json)
    expect(des.compute()).toEqual('1234: message')
  })

  it('Complex object with nested complex object', () => {
    const very = new VeryComplexObject()
    very.box.cs = [
      new ComplexObject(4321, ['one', 'two', 'three', 'four']),
      new ComplexObject(666, ['six', 'six', 'six'])
    ]
    very.box.other = ['other', 'message']
    very.box.smthg = [1, 2, 3, 4]
    const ser = serialize(very)
    const des = deserialize(VeryComplexObject, ser)
    expect(des.box.cs.length).toEqual(2)
    expect(des.box.cs[0].compute()).toEqual('4321: one, two, three, four')
    expect(des.box.cs[1].compute()).toEqual('666: six, six, six')
    expect(des.box.other.length).toEqual(2)
    expect(des.box.other[0]).toEqual('other')
    expect(des.box.other[1]).toEqual('message')
    expect(des.box.smthg).toEqual([1, 2, 3, 4])
  })
})