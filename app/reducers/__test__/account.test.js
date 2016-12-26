'use strict'

jest.dontMock('../account')
import account from '../account'
const initialState = {
  token: undefined,
  isAuthed: undefined,
  authError: ''
}

describe('account reducer', function() {

  it('is empty by default', () => {
    expect(account(undefined,{}))
    .toEqual(initialState)
  })

  it('set user token', () => {
    expect(account(initialState, {type: 'SET_TOKEN', token: '123', isAuthed: true}))
    .toEqual({
      token: '123',
      isAuthed: true,
      authError: ''
    })
  })

})
