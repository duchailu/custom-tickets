import { UserAuth } from '@/firebase/firebaseContext'

const DeleteConfirmationModal = ({ close, ticketId }) => {
  const { removeTicket } = UserAuth()

  return (
    <div className='top-0 left-0 w-screen h-screen bg-slate-200/75 fixed grid place-content-center z-90 font-raleway'>
      <div className='w-[250px] bg-slate-300 shadow-xl border-2 border-slate-400 rounded-xl flex flex-col gap-6 p-6 justify-center align-middle'>
        <div className='text-center flex flex-col'>
          <span className='font-bold'>Supprimer le ticket:</span>
          <span>{ticketId}</span>
        </div>
        <div className='flex flex-row gap-4 justify-evenly'>
          <div
            className='styled-button-light'
            onClick={() => {
              removeTicket(ticketId)
            }}>
            Confirmer
          </div>
          <div
            className='styled-button-light'
            onClick={() => {
              close()
            }}>
            Annuler
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirmationModal
