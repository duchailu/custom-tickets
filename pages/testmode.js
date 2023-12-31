import Admin from '@/components/crud/Admin'
import AdminSignin from '@/components/crud/AdminSignin'
import Signout from '@/components/crud/Signout'
import User from '@/components/crud/User'
import UserSignin from '@/components/crud/UserSignin'
import { auth } from '@/firebase/Firebase'
import { UserAuth } from '@/firebase/firebaseContext'
import { onAuthStateChanged } from 'firebase/auth'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Home() {
  const { signout, getUsers } = UserAuth()

  const [user, setUser] = useState(null)
  const [users, setUsers] = useState(null)
  // const [userPseudo, setUserPseudo] = useState(null)

  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser) => {
      currentUser ? setUser(currentUser) : setUser(null)
    })
  }, [])

  return (
    <>
      <Head>
        <title>Ticket Management</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {/* <div
        className='border-2 border-red-600 text-center rounded-xl cursor-pointer w-[100px] flex flex-col mx-auto my-10 hover:bg-red-200'
        onClick={() => signout()}>
        signout
      </div> */}
      {user ? (
        <div className='flex flex-col w-full'>
          <Signout />
          {user.email === 'admin@test.com' ? <Admin /> : <User />}
        </div>
      ) : (
        <div className='flex flex-col'>
          <div className='flex flex-row w-[50%] justify-between mx-auto gap-6'>
            <AdminSignin />
            <UserSignin />
          </div>
          <div className='mx-auto mt-10'>
            <Link className='styled-button' href={'/'}>
              Home
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
