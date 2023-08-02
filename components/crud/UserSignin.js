import { UserAuth } from '@/firebase/firebaseContext'
import { useEffect, useState } from 'react'

const UserSignin = () => {
  const { signin, errorMessage } = UserAuth()

  // testing email
  // =============
  // user  => user5@test.com
  // user  => user2@test.com
  // user  => user4@test.com
  // user  => user3@test.com
  // user  => user1@test.com

  // testing passwords
  // =================
  // for users: "password"

  const [email, setEmail] = useState('test1@test.com')
  const [password, setPassword] = useState('password')

  const handleEmail = (temp) => {
    setEmail(temp)
  }

  const handlePassword = (temp) => {
    setPassword(temp)
  }

  const handleSubmit = (event) => {
    signin(email, password)

    event.preventDefault()
    setEmail('')
    setPassword('')
  }

  useEffect(() => {}, [])

  return (
    <div className='authentification-container my-4'>
      <h1 className='authentification-title'>Se connecter</h1>
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
          <div>
            <button className='button scale-animation' type='submit'>
              submit
            </button>
          </div>
        </div>
      </form>
      {errorMessage === '' ? '' : <div className='error-message'>{errorMessage}</div>}
    </div>
  )
}

export default UserSignin
