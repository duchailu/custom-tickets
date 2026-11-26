import { UserAuth } from '@/firebase/firebaseContext'
import { useEffect, useState } from 'react'
import AdminToUserSigninModal from '../modals/AdminToUserSigninModal'
import OptionForm from './OptionForm'
import Signup from './Signup'

// Page de l'admin : créer des utilisateurs, ajouter des options, se connecter à un compte
const Admin = () => {
  const { getUsers } = UserAuth()

  const [users, setUsers] = useState(null)
  const [userEmailSignin, setUserEmailSignin] = useState('') // email choisi pour s'y connecter

  useEffect(() => {
    getUsers().then(setUsers)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const allUsers = Object.values(users ?? {})
  const itGuys = allUsers.filter((user) => user.userType === 'technicien')
  const employees = allUsers.filter((user) => user.userType === 'employé')

  const usersColumn = (title, list) => (
    <div className='flex flex-col gap-4'>
      <div className='font-bold'>{title}</div>
      <div className='users-list'>
        {list.map((user) => (
          <div key={user.email} className='users' onClick={() => setUserEmailSignin(user.email)}>
            {user.email}
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div>
      <div className='flex flex-col mb-10 text-center'>
        <div className='grid place-content-center py-2 font-bold text-xl mx-auto w-[200px]'>ADMIN PAGE</div>
        {userEmailSignin !== '' ? (
          <AdminToUserSigninModal
            userEmail={userEmailSignin}
            hideAdminToUserSigninModal={() => setUserEmailSignin('')}
          />
        ) : null}
        <div className='flex flex-row gap-16 justify-center'>
          <div>
            <Signup />
          </div>
          <OptionForm />
        </div>
        <div>
          <div className='font-bold mb-4'>Users:</div>
          {users ? (
            <div className='flex flex-row justify-evenly w-[50%] mx-auto'>
              {usersColumn('Techniciens', itGuys)}
              {usersColumn('Employés', employees)}
            </div>
          ) : (
            <div>No Users...</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Admin
