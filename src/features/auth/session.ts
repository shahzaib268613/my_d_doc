const ADMIN_SESSION_KEY = 'my-ddoc-admin-session'

/** Placeholder session until real auth is wired. */
export function isAdminAuthenticated() {
  try {
    return sessionStorage.getItem(ADMIN_SESSION_KEY) === '1'
  } catch {
    return false
  }
}

export function setAdminSession() {
  try {
    sessionStorage.setItem(ADMIN_SESSION_KEY, '1')
  } catch {
    /* ignore */
  }
}

export function clearAdminSession() {
  try {
    sessionStorage.removeItem(ADMIN_SESSION_KEY)
  } catch {
    /* ignore */
  }
}
