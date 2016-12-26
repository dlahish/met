import React from 'react'
import 'react-native'
import renderer from 'react-test-renderer'
import ItemRow from '../ItemRow'

describe('Item Row Test', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <ItemRow />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('render in edit mode', () => {
    const tree = renderer.create(
      <ItemRow editMode={true} />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
