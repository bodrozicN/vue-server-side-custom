import { inject, ref } from 'vue'

export const useFetch = async ({ key, callback }) => {
  const addPreFetchedData = inject('addPreFetchedData')
  const data = ref(null)

  const doFetch = async () => {
    const res = await callback()
    data.value = res
  }

  const isServer = import.meta.env.SSR

  if (isServer) {
    await doFetch()
    addPreFetchedData({ key, newVal: data.value })
  } else {
    const preFetchedData = (window.__INITIAL_STATE__ || {})[key]
    if (preFetchedData) {
      data.value = preFetchedData
      window.__INITIAL_STATE__[key] = undefined
    } else {
      await doFetch()
    }
  }

  return {
    data
  }
}
