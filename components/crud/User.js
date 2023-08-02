import { auth } from '@/firebase/Firebase'
import { UserAuth } from '@/firebase/firebaseContext'
import { useEffect, useState } from 'react'
import CreateTicketModal from '../modals/CreateTicketModal'
import Tickets from '../tickets/Tickets'
const User = () => {
  const { removeUser, getUser } = UserAuth()
  const [showModal, setShowModal] = useState(false)
  const [userData, setUserData] = useState(null)

  const handleShowModal = () => {
    setShowModal(true)
  }
  const handleHideModal = () => {
    setShowModal(false)
  }

  useEffect(() => {
    getUser(auth.currentUser?.uid).then((response) => {
      setUserData(response)
    })
  }, [getUser])

  return (
    <div className='flex flex-col w-2/3 mx-auto my-10'>
      <div className='font-bold mb-4 text-center'>User:</div>
      <div className='font-bold text-center'>{userData?.email}</div>
      <div className='text-center'>({userData?.userType})</div>
      {/* <div
        className='test-button'
        onClick={() => removeUser(auth.currentUser?.uid)}
      >
        remove this user
      </div> */}
      <div className='styled-button w-[200px] mx-auto my-6' onClick={() => handleShowModal()}>
        créer ticket
      </div>
      <Tickets />
      <div>{showModal ? <CreateTicketModal handleHideModal={handleHideModal} /> : null}</div>
    </div>
  )
}

export default User
