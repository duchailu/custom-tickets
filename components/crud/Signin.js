import { UserAuth } from '@/firebase/firebaseContext'
import { useEffect, useState } from 'react'

const Signin = () => {
  const { signin, errorMessage } = UserAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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

export default Signin
