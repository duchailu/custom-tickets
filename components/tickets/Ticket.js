import { getDate } from '@/Utils/utils'
import { useState } from 'react'
import { RiCheckboxCircleLine, RiTimerLine } from 'react-icons/ri'
import EditModal from '../modals/EditModal'

// Couleur de la ligne selon la priorité (1 = haute, 2 = moyenne, 3 = basse)
const priorityColors = {
  1: 'bg-red-100 hover:bg-red-200 hover:border-red-600',
  2: 'bg-yellow-100 hover:bg-yellow-200 hover:border-yellow-600',
  3: 'bg-green-100 hover:bg-green-200 hover:border-green-600',
}

// Une ligne du tableau des tickets ; un clic ouvre la fenêtre de modification
const Ticket = ({ id, priority, status, ticket, user, userEmail, date, choices }) => {
  const [displayEdit, setDisplayEdit] = useState(false)

  return (
    <div>
      {displayEdit ? (
        <EditModal
          closeModal={() => setDisplayEdit(false)}
          ticketId={id}
          priority={priority}
          status={status}
          ticket={ticket}
          user={user}
          userEmail={userEmail}
          date={date}
          choices={choices}
        />
      ) : null}
      <div
        className={`border border-gray-300 flex flex-row max-h-7 overflow-hidden ${priorityColors[priority] ?? ''} hover:cursor-pointer`}
        onClick={() => setDisplayEdit(true)}>
        <div className='w-1/12 border-r border-gray-300 text-center flex place-items-center justify-center'>
          {status === 1 ? <RiTimerLine size={15} /> : <RiCheckboxCircleLine size={15} />}
        </div>
        <div className='w-1/12 border-r border-gray-300 text-center'>{getDate(date)}</div>
        <div className='w-2/12 border-r border-gray-300 text-center'>{userEmail}</div>
        <div className='w-1/12 border-r border-gray-300 text-center'>{choices[0]}</div>
        <div className='w-1/12 border-r border-gray-300 text-center'>{choices[1]}</div>
        <div className='w-1/12 border-r border-gray-300 text-center'>{choices[2]}</div>
        <div className='w-5/12 border-gray-300 text-center'>{ticket}</div>
      </div>
    </div>
  )
}

export default Ticket
