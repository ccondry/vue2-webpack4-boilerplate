import * as types from '../mutation-types'
// import axios from 'axios'
// import {addUrlQueryParams} from '../../utils'

const state = {
  users: []
}

const getters = {
  users: state => state.users,
  // is this an admin currently logged in as another user?
  isSwitchUser: (state, getters) => {
    return getters.user.tat === 'su'
  }
}

const mutations = {
  [types.SET_USERS_LIST] (state, data) {
    state.users = data
  }
}

const actions = {
  async getUsers ({getters, commit, dispatch}) {
    // get list of all users
    console.log('loading users list...')
    // turn on loading icon
    dispatch('setLoading', {group: 'app', type: 'users', value: true})
    try {
      const response = await fetch(getters.endpoints.users, {
        headers: {
          Authorization: 'Bearer ' + getters.jwt
        }
      })
      const text = await response.text()
      if (response.ok) {
        const json = JSON.parse(text)
        commit(types.SET_USERS_LIST, json)
      } else {
        throw Error(`${response.status} ${response.statusText} - ${text}`)
      }
    } catch (e) {
      // throw e
      console.log('failed to get users list:', e)
    } finally {
      // turn off loading icon
      dispatch('setLoading', {group: 'app', type: 'users', value: false})
    }
  },
  // get a new JWT with another user's details
  async switchUser ({getters, commit, dispatch}, user) {
    console.log('switching user from', getters.user.email, 'to', user.email)
    // turn on loading icon
    dispatch('setWorking', {group: 'app', type: 'switchUser', value: true})
    try {
      window.location = 'https://demo-toolbox.com/identity/?su=' + user.email
      // const response = await fetch(`${getters.endpoints.switchUser}?email=${user.email}`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: 'Bearer ' + getters.jwt
      //   }
      // })
      // const text = await response.text()
      // if (response.ok) {
      //   const json = JSON.parse(text)
      //   // set new JWT
      //   dispatch('setJwt', json.jwt)
      // } else {
      //   throw Error(`${response.status} ${response.statusText} - ${text}`)
      // }
    } catch (e) {
      // throw e
      console.log('failed to switch user:', e)
      // display error
      dispatch('createAlert', {
        title:'Error Switching User',
        message: e.message,
        type: 'error',
        expires: 8000
      })
    } finally {
      // turn off loading icon
      dispatch('setWorking', {group: 'app', type: 'switchUser', value: false})
    }
  },
  async addUserToRoom({ getters, dispatch }, userEmail) {
    console.log('addUserToRoom userEmail...', userEmail)
    dispatch('setWorking', { group: 'app', type: 'teamsSupport', value: true })
    try {
        // do REST call
        // await axios({
        //     method: 'post',
        //     url: getters.endpoints.teamsSupport,
        //     headers: getters.restOptions.headers,
        //     userEmail
        //   })
        // notify user
        dispatch('createAlert', {
          title: 'Success',
          message: 'Successfully added ' + userEmail + ' to Demo-Toolbox Support space ',
          type: 'success'
        })
        console.log('addUserToRoom success')
    } catch (e) {
        console.log('addUserToRoom failed:', e.message)
        if (e.message === 'Request failed with status code 409'){
           // notify user
           dispatch('createAlert', {
               title: userEmail + ' is already a participant in the Demo-Toolbox Support space.',
               type: 'success',
               expires: 12000
           })
       } else if (e.message === 'Request failed with status code 401'){
         // notify user
         dispatch('createAlert', {
          title: 'Please log in before requesting membership to the Demo-Toolbox Support space.',
          type: 'success',
          expires: 12000
      })
        } else {
        // notify user
        dispatch('createAlert', {
            title: 'Failed to addUserToRoom',
            message: e.message,
            type: 'error',
            expires: 12000
        })
      }
    } finally {
        dispatch('setWorking', { group: 'app', type: 'teamsSupport', value: false })
    }
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
