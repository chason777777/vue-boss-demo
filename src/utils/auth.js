import Cookies from 'js-cookie'

const TokenKey = 'token'
const LevelKey = 'level'
const PermissionKey = 'permission'
const UserNameKey = 'userName'
const UuidKey = 'uuid'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getLevel() {
  return Cookies.get(LevelKey)
}

export function setLevel(level) {
  return Cookies.set(LevelKey, level)
}

export function removeLevel() {
  return Cookies.remove(LevelKey)
}

export function getPermission() {
  return Cookies.get(PermissionKey)
}

export function setPermission(permission) {
  return Cookies.set(PermissionKey, permission)
}

export function removePermission() {
  return Cookies.remove(PermissionKey)
}

export function getUserName() {
  return Cookies.get(UserNameKey)
}

export function setUserName(userName) {
  return Cookies.set(UserNameKey, userName)
}

export function removeUserName() {
  return Cookies.remove(UserNameKey)
}

export function getUuid() {
  return Cookies.get(UuidKey)
}

export function setUuid(uuid) {
  return Cookies.set(UuidKey, uuid)
}

export function removeUuid() {
  return Cookies.remove(UuidKey)
}
