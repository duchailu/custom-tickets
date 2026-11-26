import { getDbErrorMessage, UserAuth } from '@/firebase/firebaseContext'
import { useState } from 'react'
import { RiCloseCircleLine } from 'react-icons/ri'
import ErrorMessage from '../ErrorMessage'
import { useSelectOptions } from '../hooks/useSelectOptions'
import Select from '../Select'
import EditPriorityChoice from './EditPriorityChoice'

// Fenêtre de création d'un ticket
const CreateTicketModal = ({ handleHideModal }) => {
  const { addTicket } = UserAuth()
  const [select1, select2, select3] = useSelectOptions()

  const [ticket, setTicket] = useState('')
  const [priority, setPriority] = useState(null)
  const [option1, setOption1] = useState('')
  const [option2, setOption2] = useState('')
  const [option3, setOption3] = useState('')
  const [alerts, setAlerts] = useState(false)
  const [saveError, setSaveError] = useState('')

  const createTicket = () => {
    if (ticket.trim() === '' || priority === null) {
      setAlerts(true)
      return
    }
    // Un nouveau ticket est "ouvert" (status 1)
    setSaveError('')
    addTicket(ticket, priority, 1, option1, option2, option3)
      .then(handleHideModal)
      .catch((error) => setSaveError(getDbErrorMessage(error)))
  }

  return (
    <div className='top-0 left-0 w-screen h-screen bg-slate-200/75 fixed grid place-content-center z-50 font-raleway'>
      <div className='w-[337px] sm:w-[576px] md:w-[691px] bg-slate-300 shadow-xl border-2 border-slate-400 rounded-xl flex flex-col gap-6 p-6 justify-center align-middle'>
        <div className='flex flex-row relative justify-center'>
          <div className='text-center font-bold text-2xl'>Create Ticket</div>
          <div onClick={handleHideModal} className='absolute right-2'>
            <RiCloseCircleLine size={30} className='hover:text-blue-400 scale-animation-small cursor-pointer' />
          </div>
        </div>
        <div className='w-[90%] flex flex-row justify-center mx-auto'>
          <input
            type='text'
            className='text-center rounded-lg w-full shadow-md border border-slate-400 h-[30px]'
            value={ticket}
            placeholder='...'
            onChange={(e) => setTicket(e.target.value)}
          />
        </div>
        <div className='flex flex-col gap-3'>
          <div className='text-center font-bold text-2xl'>
            <span>Priority</span>
          </div>
          <div className='flex flex-row gap-6 justify-center'>
            <EditPriorityChoice click={setPriority} priority={1} current={priority} />
            <EditPriorityChoice click={setPriority} priority={2} current={priority} />
            <EditPriorityChoice click={setPriority} priority={3} current={priority} />
          </div>
        </div>

        <div className='flex flex-row gap-2 justify-center'>
          <Select data={select1} title={'Option 1'} click={setOption1} selectedValue={option1} />
          <Select data={select2} title={'Option 2'} click={setOption2} selectedValue={option2} />
          <Select data={select3} title={'Option 3'} click={setOption3} selectedValue={option3} />
        </div>

        <div className='button w-[150px] mx-auto mt-8' onClick={createTicket}>
          Create Ticket
        </div>
        {alerts && (
          <div className='flex flex-col gap-2 text-red-400 text-xl italic w-[300px] mx-auto text-center p-1'>
            {ticket.trim() === '' && (
              <div className='p-1 border-2 border-red-400 rounded-lg'>The ticket is still empty!!</div>
            )}
            {priority === null && (
              <div className='p-1 border-2 border-red-400 rounded-lg'>You must choose a priority!!</div>
            )}
          </div>
        )}
        <ErrorMessage message={saveError} />
      </div>
    </div>
  )
}

export default CreateTicketModal
