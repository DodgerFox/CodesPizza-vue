const USERS_KEY = 'codespizza_users'
const SESSION_UID_KEY = 'codespizza_session_uid'

const listeners = new Set()

function parseJSON(value, fallback) {
  try {
    return value ? JSON.parse(value) : fallback
  } catch (e) {
    return fallback
  }
}

function readUsers() {
  return parseJSON(localStorage.getItem(USERS_KEY), [])
}

function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function getSessionUid() {
  return localStorage.getItem(SESSION_UID_KEY)
}

function setSessionUid(uid) {
  if (uid) {
    localStorage.setItem(SESSION_UID_KEY, uid)
  } else {
    localStorage.removeItem(SESSION_UID_KEY)
  }
}

function createUid() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return `${Date.now()}_${Math.random().toString(16).slice(2)}`
}

function makeAuthError(code, message) {
  const error = new Error(message)
  error.code = code
  return error
}

function notifyAuthChange() {
  listeners.forEach((cb) => cb(auth.currentUser))
}

function normalizeUser(user) {
  if (!user) return null
  return {
    uid: user.uid,
    email: user.email
  }
}

function findUserByUid(uid) {
  return readUsers().find((user) => user.uid === uid)
}

function ensureAuthFromStorage() {
  const sessionUid = getSessionUid()
  const user = sessionUid ? findUserByUid(sessionUid) : null
  auth.currentUser = normalizeUser(user)
  if (!user) {
    setSessionUid(null)
  }
}

const auth = {
  currentUser: null
}

const db = {}

ensureAuthFromStorage()

async function createUserWithEmailAndPassword(_auth, email, password) {
  const users = readUsers()
  const exists = users.some((user) => user.email.toLowerCase() === email.toLowerCase())

  if (exists) {
    throw makeAuthError('auth/email-already-in-use', 'Email already in use')
  }

  const newUser = {
    uid: createUid(),
    email,
    password,
    info: null,
    codes: {}
  }

  users.push(newUser)
  writeUsers(users)
  setSessionUid(newUser.uid)
  auth.currentUser = normalizeUser(newUser)
  notifyAuthChange()

  return { user: auth.currentUser }
}

async function signInWithEmailAndPassword(_auth, email, password) {
  const users = readUsers()
  const user = users.find((item) => item.email.toLowerCase() === email.toLowerCase())

  if (!user) {
    throw makeAuthError('auth/user-not-found', 'User not found')
  }

  if (user.password !== password) {
    throw makeAuthError('auth/wrong-password', 'Wrong password')
  }

  setSessionUid(user.uid)
  auth.currentUser = normalizeUser(user)
  notifyAuthChange()

  return { user: auth.currentUser }
}

async function signOut() {
  setSessionUid(null)
  auth.currentUser = null
  notifyAuthChange()
}

function onAuthStateChanged(_auth, callback) {
  listeners.add(callback)
  callback(auth.currentUser)
  return () => listeners.delete(callback)
}

function updateUser(uid, updater) {
  const users = readUsers()
  const index = users.findIndex((user) => user.uid === uid)
  if (index === -1) return null
  const updated = updater(users[index])
  users[index] = updated
  writeUsers(users)
  return updated
}

function getUserInfo(uid) {
  const user = findUserByUid(uid)
  return user?.info || {}
}

function setUserInfo(uid, info) {
  updateUser(uid, (user) => ({
    ...user,
    info
  }))
}

function getUserCodes(uid) {
  const user = findUserByUid(uid)
  return user?.codes || {}
}

function addUserCodes(uid, date, codes) {
  updateUser(uid, (user) => {
    const prevCodes = user.codes || {}
    const dateCodes = prevCodes[date] || {}
    const key = createUid()

    return {
      ...user,
      codes: {
        ...prevCodes,
        [date]: {
          ...dateCodes,
          [key]: codes
        }
      }
    }
  })
}

function setUserCodes(uid, codes) {
  updateUser(uid, (user) => ({
    ...user,
    codes: codes || {}
  }))
}

export {
  auth,
  db,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  getUserInfo,
  setUserInfo,
  getUserCodes,
  addUserCodes,
  setUserCodes
}
