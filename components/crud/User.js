import { UserAuth } from '@/firebase/firebaseContext'
import { useEffect, useState } from 'react'
import CreateTicketModal from '../modals/CreateTicketModal'
import Tickets from '../tickets/Tickets'

// Page d'un utilisateur (employé ou technicien) : créer un ticket, voir et modifier les tickets
const User = () => {
  const { user, getUser } = UserAuth()
  const [showModal, setShowModal] = useState(false)
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    if (user) getUser(user.uid).then(setUserData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return (
    <div className='flex flex-col w-2/3 mx-auto my-10'>
      <div className='font-bold mb-4 text-center'>User:</div>
      <div className='font-bold text-center'>{userData?.email}</div>
      <div className='text-center'>({userData?.userType})</div>
      <div className='styled-button w-[200px] mx-auto my-6' onClick={() => setShowModal(true)}>
        créer ticket
      </div>
      <Tickets />
      <div>{showModal ? <CreateTicketModal handleHideModal={() => setShowModal(false)} /> : null}</div>
    </div>
  )
}

export default User
