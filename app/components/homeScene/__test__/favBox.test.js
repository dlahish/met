import 'react-native'
import React from 'react'
import FavBox from '../FavBox'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

it('renders correctly', () => {
  const tree = renderer.create(
    <FavBox />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
