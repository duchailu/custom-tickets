import Admin from '@/components/crud/Admin'
import AdminSignin from '@/components/crud/AdminSignin'
import Signin from '@/components/crud/Signin'
import Signout from '@/components/crud/Signout'
import User from '@/components/crud/User'
import UserSignin from '@/components/crud/UserSignin'
import { UserAuth } from '@/firebase/firebaseContext'
import Head from 'next/head'
import Link from 'next/link'

// Compte administrateur de la démo
const ADMIN_EMAIL = 'admin@test.com'

// Page d'accueil commune à / et à /testmode.
// En mode test, les formulaires sont pré-remplis avec les comptes de démonstration.
const HomePage = ({ testMode = false }) => {
  const { user } = UserAuth()

  return (
    <>
      <Head>
        <title>Ticket Management</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      {user ? (
        <div className='flex flex-col w-full'>
          <Signout />
          {user.email === ADMIN_EMAIL ? <Admin /> : <User />}
        </div>
      ) : (
        <div className='flex flex-col'>
          <div className='flex flex-row w-[50%] justify-between mx-auto gap-6'>
            {testMode ? (
              <>
                <AdminSignin />
                <UserSignin />
              </>
            ) : (
              <Signin />
            )}
          </div>
          <div className='mx-auto mt-10'>
            <Link className='styled-button' href={testMode ? '/' : '/testmode'}>
              {testMode ? 'Home' : 'Test Mode'}
            </Link>
          </div>
        </div>
      )}
    </>
  )
}

export default HomePage
