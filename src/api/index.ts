import { API_URL } from './constants'

export async function loadUsers() {
  try {
    const response = await fetch(API_URL)
    const newItems = await response.json()

    return newItems?.results

  } catch (e) {
    console.error('error', e)
  }
}
