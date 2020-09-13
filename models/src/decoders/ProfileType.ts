import * as t from 'io-ts'

export const ProfileType = t.type({
  _id: t.string,
  firstName: t.string,
  lastName: t.string,
  venmoId: t.string,
  venmoHandle: t.string,
})