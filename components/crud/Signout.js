import { UserAuth } from '@/firebase/firebaseContext'

const Signout = () => {
  const { signout } = UserAuth()

  return (
    <div className='styled-button w-[200px] mx-auto my-4' onClick={() => signout()}>
      Déconnecter
    </div>
  )
}

export default Signout
