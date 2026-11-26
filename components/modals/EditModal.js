import { getDbErrorMessage, UserAuth } from '@/firebase/firebaseContext'
import { useState } from 'react'
import { RiCloseCircleLine } from 'react-icons/ri'
import ErrorMessage from '../ErrorMessage'
import { useSelectOptions } from '../hooks/useSelectOptions'
import Select from '../Select'
import DeleteConfirmationModal from './DeleteConfirmationModal'
import EditPriorityChoice from './EditPriorityChoice'

// Fenêtre de modification d'un ticket (contenu, priorité, options, statut) et de suppression
const EditModal = ({ closeModal, ticketId, priority, status, ticket, user, userEmail, date, choices }) => {
  const { updateTicket } = UserAuth()
  const [select1, select2, select3] = useSelectOptions()

  const [ticketPriority, setTicketPriority] = useState(priority)
  const [ticketStatus, setTicketStatus] = useState(status)
  const [ticketContent, setTicketContent] = useState(ticket)
  const [option1, setOption1] = useState(choices[0])
  const [option2, setOption2] = useState(choices[1])
  const [option3, setOption3] = useState(choices[2])
  const [displayConfirmation, setDisplayConfirmation] = useState(false)
  const [saveError, setSaveError] = useState('')

  const handleUpdateTicket = () => {
    setSaveError('')
    updateTicket(ticketId, ticketPriority, ticketStatus, ticketContent, user, date, option1, option2, option3)
      .then(closeModal)
      .catch((error) => setSaveError(getDbErrorMessage(error)))
  }

  // Bouton de statut (Ouvert = 1, Clos = 0)
  const statusButton = (value, label) => (
    <div
      className={`button shadow-gray-700 shadow-xs ${
        ticketStatus === value ? 'text-gray-700 border-2 border-gray-700 font-bold' : ''
      }`}
      onClick={() => setTicketStatus(value)}>
      {label}
    </div>
  )

  return (
    <div className='top-0 left-0 w-screen h-screen bg-slate-200/75 fixed grid place-content-center z-50 font-raleway'>
      <div className='w-[337px] sm:w-[576px] md:w-[691px] bg-slate-300 shadow-xl border-2 border-slate-400 rounded-xl flex flex-col gap-6 p-6 justify-center align-middle'>
        {displayConfirmation ? (
          <DeleteConfirmationModal close={() => setDisplayConfirmation(false)} ticketId={ticketId} />
        ) : null}
        <div onClick={closeModal} className='flex flex-row justify-end'>
          <RiCloseCircleLine size={30} className='hover:text-blue-400 scale-animation-small cursor-pointer' />
        </div>
        <div className='w-[90%] flex flex-row justify-center mx-auto text-center'>
          <div className='text-2xl'>
            <span className='font-bold'>Ticket créé par: </span>
            {userEmail}
          </div>
        </div>
        <div className='w-[90%] flex flex-col justify-center mx-auto'>
          <div className='text-center font-bold text-2xl mb-2'>
            <span>Contenu:</span>
          </div>
          <input
            type={'text'}
            className='text-center rounded-lg w-full shadow-md border border-slate-400 h-14'
            value={ticketContent}
            placeholder='...'
            onChange={(e) => setTicketContent(e.target.value)}
          />
        </div>

        <div className='flex flex-col gap-3'>
          <div className='text-center font-bold text-2xl'>
            <span>Priority</span>
          </div>
          <div className='flex flex-row gap-6 justify-center'>
            <EditPriorityChoice click={setTicketPriority} priority={1} current={ticketPriority} />
            <EditPriorityChoice click={setTicketPriority} priority={2} current={ticketPriority} />
            <EditPriorityChoice click={setTicketPriority} priority={3} current={ticketPriority} />
          </div>
        </div>

        <div className='flex flex-row gap-2 justify-center'>
          <Select data={select1} title={'Option 1'} selectedValue={option1} click={setOption1} />
          <Select data={select2} title={'Option 2'} selectedValue={option2} click={setOption2} />
          <Select data={select3} title={'Option 3'} selectedValue={option3} click={setOption3} />
        </div>

        <div className='flex flex-col gap-3'>
          <div className='text-center font-bold text-2xl'>
            <span>Statut</span>
          </div>
          <div className='flex flex-row gap-6 justify-center'>
            {statusButton(1, 'Ouvert')}
            {statusButton(0, 'Clos')}
          </div>
        </div>
        <div className='mx-auto styled-button-light font-bold mt-6' onClick={handleUpdateTicket}>
          <span>Mise à jour</span>
        </div>
        <ErrorMessage message={saveError} />
        <div className='mx-auto styled-button-light font-bold mt-6' onClick={() => setDisplayConfirmation(true)}>
          <span>Supprimer Ticket</span>
        </div>
      </div>
    </div>
  )
}

export default EditModal
