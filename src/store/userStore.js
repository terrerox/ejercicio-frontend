import create from 'zustand'
import { persist } from "zustand/middleware"
import userService from '../services/userService'
import { mapUsersData } from '../helpers'

const OK_STATUS_CODE = 200

export const useUserStore = create(persist((set, get) => (
    {
      status: {}, 
      users: [],
      loading: true,

      setUsers : (users) => set({ users: users }),
      usersRequest : () => set({ loading: true }),
      usersSuccess : () => set({ loading: false }),

      loginRequest : (user) => set({ status: { loggingIn: true }, user }),
      loginSuccess : (user) => set({ status: { loggedIn: true }, user }),
      loginFailure : () => set({ status: { loggedIn: false }, user: {} }),

      logoutSuccess : () => set({ status: { loggedIn: false }, user: {}, users: [] }),

      registerRequest : (user) => set({ status: { registering: true }, user }),
      registerSuccess : (user) => set({ status: { loggedIn: true }, user }),
      registerFailure : () => set({ status: { loggedIn: false }, user: {} }),

      logout: () => {
          const logoutSuccess = get().logoutSuccess
          userService.logout()
          logoutSuccess()
      },

      login: loginCredentials => {
          const loginRequest = get().loginRequest
          const loginSuccess = get().loginSuccess
          const loginFailure = get().loginFailure
          loginRequest(loginCredentials.email)
          return userService.login(loginCredentials)
            .then(res => {
              const { status } = res
              if(status === OK_STATUS_CODE) {
                loginSuccess(res)
                return { success: true }
              }
              loginFailure()
              const { message } = res.data.errors
              return {
                success: false,
                message
              }
            })
          },

        register: registerCredentials => {
          const registerRequest = get().registerRequest
          const registerSuccess = get().registerSuccess
          const registerFailure = get().registerFailure

          registerRequest(registerCredentials)
          return userService.register(registerCredentials)
            .then(res => {
              const { status } = res
              if(status === OK_STATUS_CODE) {
                const {
                  id,
                  firstname,
                  lastname,
                  email,
                  displayname
                } = res.data.user
                registerSuccess({
                  id,
                  firstname,
                  lastname,
                  email,
                  displayname
                })
                return { success: true }
              }
              registerFailure()
              const { message } = res.data.errors
              return {
                success: false,
                message
              }
            })
        },

        getUsers: () => {
          const usersRequest = get().usersRequest
          const usersSuccess = get().usersSuccess
          const setUsers = get().setUsers
          usersRequest()
          return userService.getAll()
            .then(mapUsersData)
            .then(users => {
              setUsers(users)
              usersSuccess()
              return users
            })
        },
    }
  ),
  {
    name: "user-storage"
  }
))