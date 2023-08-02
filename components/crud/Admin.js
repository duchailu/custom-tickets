import { UserAuth } from '@/firebase/firebaseContext'
import { useEffect, useState } from 'react'
import AdminToUserSigninModal from '../modals/AdminToUserSigninModal'
import OptionForm from './OptionForm'
import Signup from './Signup'

const Admin = () => {
  const { getUsers } = UserAuth()

  const [users, setUsers] = useState(null)
  const [employees, setEmployees] = useState([])
  const [itGuys, setItGuys] = useState([])
  const [adminToUserSigninModal, setAdminToUserSigninModal] = useState(false)
  const [userEmailSignin, setUserEmailSignin] = useState('')

  const hideAdminToUserSigninModal = () => {
    resetUserEmailSignin()
    setAdminToUserSigninModal(false)
  }
  const showAdminToUserSigninModal = (temp) => {
    setUserEmailSignin(temp)
  }

  const resetUserEmailSignin = () => {
    setUserEmailSignin('')
  }

  useEffect(() => {
    if (userEmailSignin !== '') {
      setAdminToUserSigninModal(true)
    }
  }, [userEmailSignin])

  useEffect(() => {
    getUsers().then((response) => setUsers(response))
  }, [getUsers])

  useEffect(() => {
    if (users !== null) {
      let itGuysTemp = []
      let employeesTemp = []
      Object.entries(users).forEach(([userId, user]) => {
        if (user.userType === 'technicien') {
          itGuysTemp.push(user)
          // setItGuys((prev) => [...prev, user])
        }
        if (user.userType === 'employé') {
          employeesTemp.push(user)
          // setEmployees((prev) => [...prev, user])
        }
      })
      setItGuys(itGuysTemp)
      setEmployees(employeesTemp)
    }
  }, [users])

  return (
    <div>
      <div className='flex flex-col mb-10 text-center'>
        <div className='grid place-content-center py-2 font-bold text-xl mx-auto w-[200px]'>ADMIN PAGE</div>
        {adminToUserSigninModal ? (
          <AdminToUserSigninModal
            userEmail={userEmailSignin}
            hideAdminToUserSigninModal={hideAdminToUserSigninModal}
            resetUserEmailSignin={resetUserEmailSignin}
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
              <div className='flex flex-col gap-4'>
                <div className='font-bold'>Techniciens</div>
                <div className='users-list'>
                  {itGuys.map((element, elementId) => {
                    return (
                      <div key={elementId} className='users' onClick={() => showAdminToUserSigninModal(element.email)}>
                        {element.email}
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className='flex flex-col gap-4'>
                <div className='font-bold'>Employés</div>
                <div className='users-list'>
                  {employees.map((element, elementId) => {
                    return (
                      <div key={elementId} className='users' onClick={() => showAdminToUserSigninModal(element.email)}>
                        {element.email}
                      </div>
                    )
                  })}
                </div>
              </div>
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
