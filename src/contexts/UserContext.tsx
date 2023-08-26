import { User, UserContextType } from '../types/userTypes'
import { createContext } from 'react'
import React from 'react'

export const UserContext = createContext<UserContextType>({
  user: undefined,
  setUser: (value: React.SetStateAction<User | undefined>): void => {
    throw new Error('Function not implemented.')
  }
})
