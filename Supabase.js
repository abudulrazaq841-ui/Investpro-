// assets/js/supabase.js
const SUPABASE_URL = 'https://YOUR-PROJECT.supabase.co'
const SUPABASE_KEY = 'YOUR-ANON-KEY-HERE' // PUT YOUR ANON KEY

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY)

// SIGN UP
export async function signUp(fullName, email, password) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName } // saves to user_metadata
    }
  })
  if(error) throw error
  return data
}

// LOGIN
export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if(error) throw error
  return data
}

// LOGOUT
export async function logout() {
  const { error } = await supabase.auth.signOut()
  if(error) throw error
  window.location.href = 'login.html'
}

// CHECK IF LOGGED IN
export async function requireAuth() {
  const { data: { session } = await supabase.auth.getSession()
  if(!session) {
    window.location.href = 'login.html'
    return null
  }
  return session.user
}

// GET USER PROFILE
export async function getProfile() {
  const user = await requireAuth()
  const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
  return data
}

// CHECK IF USER IS LOGGED IN
export async function requireAuth(redirect = 'login.html') {
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) {
    alert('You must login to access this page')
    window.location.href = redirect
    return null
  }
  return session.user // returns the logged in user
}

// GET USER PROFILE - ONLY FOR LOGGED IN USERS
export async function getProfile() {
  const user = await requireAuth()
  if(!user) return null
  
  const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).single()
  if(error) throw error
  return data
}