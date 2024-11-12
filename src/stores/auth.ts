import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import http from '@/services/http'

export const useAuth = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token'))
  const user = ref(JSON.parse(localStorage.getItem('user')|| '{}'))

  const setToken = (tokenValue: string) => {
    localStorage.setItem('token', tokenValue)
    token.value = tokenValue
  }

  const setUser = (userValue: {id: string | number, name: string}) => {
    localStorage.setItem('user', JSON.stringify(userValue))
    user.value = userValue
  }

  const hasTokenStored = computed(() => {
    const hasToken = token.value != null && token.value.length != 0
    const hasUser = user.value != null && user.value.length != 0
    return hasToken && hasUser
  })

  const checkToken = async () => {
    try {
      const tokenAuth = `Bearer ${token.value}`
      const data = await http.get('/auth/verify', {
        headers: {
          Authorization: tokenAuth
        }
      })

      return data
    } catch (error) {
      console.error(error)
    }
  }

  const clear = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    token.value = null
    user.value = null
  }

  return {
    token,
    user,
    setToken,
    setUser,
    hasTokenStored,
    checkToken,
    clear
  }
})
