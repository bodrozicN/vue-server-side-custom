import { inject, onMounted, onServerPrefetch, ref } from 'vue'

export const useFetch = ({ key, callback }) => {
  const addPreFetchedData = inject('addPreFetchedData')
  const data = ref(null)

  const doFetch = async () => {
    const res = await callback()
    data.value = res
  }

  onServerPrefetch(async () => {
    await doFetch()
    addPreFetchedData({ key, newVal: data.value })
  })

  onMounted(async () => {
    const preFetchedData = (window.__INITIAL_STATE__ || {})[key]
    if (preFetchedData) {
      data.value = preFetchedData
      return
    }
    await doFetch()
  })

  return {
    data
  }
}
