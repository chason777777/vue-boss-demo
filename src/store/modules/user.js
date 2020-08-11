import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken, getLevel, getPermission, getUserName, setUuid, setLevel, setUserName, setPermission, removeLevel, removePermission, removeUserName, removeUuid } from '@/utils/auth'
import { resetRouter } from '@/router'
import store from '@/store'

const avatar = 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_UID: (state, uid) => {
    state.uid = uid
  },
  SET_LEVEL: (state, level) => {
    state.level = level
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_PERMISSION: (state, permission) => {
    state.permission = permission
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ userName: username.trim(), password: password }).then(response => {
        const { data } = response
        // alert(JSON.stringify(data))
        commit('SET_TOKEN', data.token)
        commit('SET_UID', data.uuid)
        commit('SET_LEVEL', data.level)
        commit('SET_NAME', data.userName)
        commit('SET_INTRODUCTION', data.userName)
        setToken(data.token)
        setUuid(data.uuid)
        setLevel(data.level)
        setUserName(data.userName)
        setPermission(data.permissionUrlList)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取用户信息
  GetRoles({ commit, state }) {
    return new Promise((resolve, reject) => {
      if (getLevel() === '1') {
        const permit = '["admin"]'
        commit('SET_ROLES', permit)
      } else {
        const permit = getPermission()
        commit('SET_ROLES', permit)
      }
      commit('SET_AVATAR', avatar)
      commit('SET_NAME', getUserName())
      const res = store.getters.roles
      resolve(res)
    })
  },
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        removeUuid()
        removeLevel()
        removeUserName()
        removePermission()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

