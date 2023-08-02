import { UserAuth } from '@/firebase/firebaseContext'
import { useState } from 'react'
import { RiCloseCircleLine } from 'react-icons/ri'

const AdminToUserSigninModal = ({ userEmail, hideAdminToUserSigninModal, resetUserEmailSignin }) => {
  const { signin } = UserAuth()

  const [userPassword, setUserPassword] = useState('')

  const handleChangePassword = (temp) => {
    setUserPassword(temp)
  }
  const handleUserSignin = () => {
    if (userPassword !== '' && userEmail) {
      signin(userEmail, userPassword)
    }
  }

  const handleConnectionToUser = (event) => {
    handleUserSignin()
    event.preventDefault()
    setUserPassword('')
    resetUserEmailSignin()
  }

  // useEffect(() => {
  //   console.log(userPassword)
  // }, [userPassword])

  return (
    <div className='top-0 left-0 w-screen h-screen bg-slate-200/75 fixed grid place-content-center z-50 font-raleway'>
      <div className='w-[337px] sm:w-[576px] md:w-[691px] bg-slate-300 shadow-xl border-2 border-slate-400 rounded-xl flex flex-col gap-6 p-6 justify-center align-middle'>
        <div className='flex flex-row relative justify-center'>
          <div className='flex flex-col gap-2'>
            <div className='text-center font-bold text-2xl'>Connecter cet utisateur</div>
            <div className='text-center text-xl'>{userEmail}</div>
          </div>
          <div onClick={() => hideAdminToUserSigninModal()} className='absolute right-2'>
            <RiCloseCircleLine size={30} className='hover:text-blue-400 scale-animation-small cursor-pointer' />
          </div>
        </div>

        <form onSubmit={handleConnectionToUser}>
          <div className='w-[90%] flex flex-row justify-center mx-auto'>
            <div className='mr-4'>password</div>
            <input
              type={'password'}
              className='text-center rounded-lg shadow-md border border-slate-400 h-[30px] w-[200px]'
              value={userPassword}
              placeholder='...'
              autoFocus
              onChange={(e) => {
                handleChangePassword(e.target.value)
              }}
            />
            <button className='button w-[150px] mx-auto mt-8' type='submit'>
              Connecter
            </button>
          </div>
        </form>

        {close === false && alerts == true ? (
          <div className='flex flex-col gap-2 text-red-400 text-xl italic w-[300px] mx-auto text-center p-1 '>
            {ticket !== '' ? null : (
              <div className='p-1 border-2 border-red-400 rounded-lg'>The ticket is still empty !!</div>
            )}
            {priority !== null ? null : (
              <div className='p-1 border-2 border-red-400 rounded-lg'>You must chose a priority !!</div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default AdminToUserSigninModal
