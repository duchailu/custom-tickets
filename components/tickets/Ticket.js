import { getDate } from '@/Utils/utils'
import { UserAuth } from '@/firebase/firebaseContext'
import { RiCheckboxCircleLine, RiTimerLine } from 'react-icons/ri'

import { useEffect, useState } from 'react'
import EditModal from '../modals/EditModal'
const Ticket = ({ id, priority, status, ticketStatus, ticket, user, date, choices }) => {
  const { getUser } = UserAuth()

  const [ticketUser, setTicketUser] = useState(null)
  const [displayEdit, setDisplayEdit] = useState(false)
  const [ticketPriorityColor, setTicketPriorityColor] = useState(null)
  const [ticketPriorityHoverColor, setTicketPriorityHoverColor] = useState(null)
  const [ticketDisplay, setTicketDisplay] = useState(true)

  const toggleDisplayEdit = () => {
    setDisplayEdit((prev) => !prev)
  }

  useEffect(() => {
    getUser(user).then((response) => setTicketUser(response.email))
  }, [getUser, user])

  useEffect(() => {
    if (status && ticketStatus) {
      setTicketDisplay(true)
    }
    if (status && !ticketStatus) {
      setTicketDisplay(false)
    }
    if (!status && ticketStatus) {
      setTicketDisplay(false)
    }
    if (!status && !ticketStatus) {
      setTicketDisplay(true)
    }
  }, [status, ticketStatus])

  useEffect(() => {
    if (priority === 1) {
      setTicketPriorityColor('bg-red-100')
      setTicketPriorityHoverColor('hover:bg-red-200 hover:border-red-600')
    }
    if (priority === 2) {
      setTicketPriorityColor('bg-yellow-100')
      setTicketPriorityHoverColor('hover:bg-yellow-200  hover:border-yellow-600')
    }
    if (priority === 3) {
      setTicketPriorityColor('bg-green-100')
      setTicketPriorityHoverColor('hover:bg-green-200  hover:border-green-600')
    }
  }, [priority])

  return (
    <div className={ticketDisplay === true ? '' : 'hidden'}>
      {displayEdit ? (
        <EditModal
          closeModal={toggleDisplayEdit}
          ticketId={id}
          priority={priority}
          status={status}
          ticket={ticket}
          user={user}
          date={date}
          choices={choices}
        />
      ) : null}
      <div
        className={`border border-gray-300 flex flex-row max-h-7 overflow-hidden ${ticketPriorityColor} ${ticketPriorityHoverColor} hover:cursor-pointer`}
        onClick={() => {
          toggleDisplayEdit()
        }}>
        <div className='w-1/12 border-r border-gray-300 text-center flex place-items-center justify-center'>
          {status === 1 ? <RiTimerLine size={15} /> : <RiCheckboxCircleLine size={15} />}
        </div>
        <div className='w-1/12 border-r border-gray-300 text-center'>{getDate(date)}</div>
        <div className='w-2/12 border-r border-gray-300 text-center'>{ticketUser}</div>
        <div className='w-1/12 border-r border-gray-300 text-center'>{choices[0]}</div>
        <div className='w-1/12 border-r border-gray-300 text-center'>{choices[1]}</div>
        <div className='w-1/12 border-r border-gray-300 text-center'>{choices[2]}</div>
        <div className='w-5/12 border-gray-300 text-center'>{ticket}</div>
      </div>
    </div>
  )
}

export default Ticket
