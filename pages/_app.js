import { UserAuthProvider } from '@/firebase/firebaseContext'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <UserAuthProvider>
      <Component {...pageProps} />
    </UserAuthProvider>
  )
}
