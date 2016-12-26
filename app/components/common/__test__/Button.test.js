import React from 'react'
import 'react-native'
import Button from '../Button'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

it('renders correctly', () => {
  const tree = renderer.create(
    <Button children='Button Text'/>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
