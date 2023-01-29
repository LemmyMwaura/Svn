// React-Query hook to prefetch and cache data
import { axiosInstance } from '@/lib/axios.util'
import { useQuery } from '@tanstack/react-query'

const fetchUserData = (url: string) => {
  return axiosInstance.get(url)
}

const useJsonPlaceholderFetcher = (key: string, url: string, options?: any) => {
  return useQuery({
    queryKey: [key],
    queryFn: () => fetchUserData(url),
    ...options,
  })
}

export { useJsonPlaceholderFetcher }
