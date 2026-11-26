import { getDbErrorMessage } from '@/firebase/firebaseContext'
import { useState } from 'react'
import ErrorMessage from '../ErrorMessage'

// Confirmation de l'ajout d'une option (click() enregistre et renvoie une promesse)
const AddOptionConfirmationModal = ({ close, data, click, clear }) => {
  const [error, setError] = useState('')

  const confirm = () => {
    setError('')
    click()
      .then(() => {
        clear()
        close()
      })
      .catch((e) => setError(getDbErrorMessage(e)))
  }

  return (
    <div className='top-0 left-0 w-screen h-screen bg-slate-200/75 fixed grid place-content-center z-90 font-raleway'>
      <div className='w-[250px] bg-slate-300 shadow-xl border-2 border-slate-400 rounded-xl flex flex-col gap-6 p-6 justify-center align-middle'>
        <div className='text-center flex flex-col'>
          <span className='font-bold'>Confirmer l&apos;ajout de l&apos;option {data[0]} suivante?</span>
        </div>
        <div>{data[1]}</div>
        <div className='flex flex-row gap-4 justify-center'>
          <div className='user-type-button' onClick={confirm}>
            Confirmer
          </div>
          <div className='user-type-button' onClick={close}>
            Annuler
          </div>
        </div>
        <ErrorMessage message={error} />
      </div>
    </div>
  )
}

export default AddOptionConfirmationModal
