import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'react-hot-toast'
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <Toaster position="top-right" />
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </SessionProvider>
    </QueryClientProvider>
  )
}
