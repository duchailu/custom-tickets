import { UserAuth } from '@/firebase/firebaseContext'
import { useEffect, useState } from 'react'

const Signup = () => {
  const { signup, errorMessage, setErrorMessage } = UserAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [userType, setUserType] = useState('')

  const handleChangeUserType = (temp) => {
    setUserType(temp)
  }

  const handleEmail = (temp) => {
    setEmail(temp)
  }

  const handlePassword = (temp) => {
    setPassword(temp)
  }

  const handleSubmit = (event) => {
    if (email === '' || password === '' || userType === '') {
      event.preventDefault()
      setErrorMessage('Vous devez choisir toutes les options')
    } else {
      signup(email, password, userType)
      event.preventDefault()
      setEmail('')
      setPassword('')
    }
  }

  useEffect(() => {}, [])

  return (
    <div className='authentification-container my-4'>
      <h1 className='authentification-title'>Créer utilisateur</h1>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col gap-6 my-6'>
          <div>
            <input
              className='text-input'
              type={'email'}
              placeholder='Email...'
              value={email}
              onChange={(e) => {
                handleEmail(e.target.value)
              }}
            />
          </div>
          <div>
            <input
              className='text-input'
              type={'password'}
              placeholder='Password...'
              value={password}
              onChange={(e) => {
                handlePassword(e.target.value)
              }}
            />
          </div>
          <div className='flex flex-col'>
            <div>type d&apos;utilisateur</div>
            <div className='flex flex-row gap-2 justify-evenly mt-4'>
              <div
                className={`user-type-button ${userType === 'employé' && 'border-green-400'}`}
                onClick={() => handleChangeUserType('employé')}>
                Employé
              </div>
              <div
                className={`user-type-button ${userType === 'technicien' && 'border-green-400'}`}
                onClick={() => handleChangeUserType('technicien')}>
                Technicien
              </div>
            </div>
          </div>
          <div>
            <button className='styled-button-light' type='submit'>
              créer
            </button>
          </div>
        </div>
      </form>
      {errorMessage === '' ? '' : <div className='error-message'>{errorMessage}</div>}
    </div>
  )
}

export default Signup
