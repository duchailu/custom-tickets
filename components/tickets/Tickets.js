import { db } from '@/firebase/Firebase'
import { onValue, ref } from 'firebase/database'
import { BsArrowDown, BsArrowUp } from 'react-icons/bs'
import { HiOutlineRefresh } from 'react-icons/hi'
import { RiCheckboxCircleLine, RiTimerLine } from 'react-icons/ri'
import { v4 as uuidv4 } from 'uuid'
import Ticket from './Ticket'

import { UserAuth } from '@/firebase/firebaseContext'
import _ from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import CustomDatalist from '../CustomDatalist'

const Tickets = () => {
  const [updatedTickets, setUpdatedTickets] = useState(null)
  const [dateOrder, setDateOrder] = useState('desc')
  const [priorityOrder, setPriorityOrder] = useState('desc')
  const [users, setUsers] = useState([])
  const [reload, setReload] = useState(false)
  // true => en cours
  // false => clos
  const [ticketStatus, setTicketStatus] = useState(true)

  const { getUsers, getTickets, getUser } = UserAuth()

  // activeUsers => users that have created tickets
  const [activeUsers, setActiveUsers] = useState([])

  const handleChangeDateOrder = useCallback(() => {
    if (dateOrder === 'asc') {
      setDateOrder('desc')
    } else {
      setDateOrder('asc')
    }
  }, [dateOrder])

  const handleChangePriorityOrder = useCallback(() => {
    if (priorityOrder === 'asc') {
      setPriorityOrder('desc')
    } else {
      setPriorityOrder('asc')
    }
    setUpdatedTickets(_.orderBy(updatedTickets, ['priority'], [priorityOrder]))
  }, [priorityOrder, updatedTickets])

  const handleDateOrder = useCallback(() => {
    const ticketsRef = ref(db, 'tickets/')
    onValue(ticketsRef, (snapshot) => {
      const data = snapshot.val()
      var result = _(data)
        .map(function (v, k) {
          // insert the key into the object
          return _.merge({}, v, { ticketId: k })
        })
        .sortBy('date') // sort by name
        .value()

      setUpdatedTickets(_.orderBy(result, ['date'], [dateOrder]))
    })
  }, [dateOrder])

  const getTicketsFromUser = (userId) => {
    getTickets().then((response) => {
      let result = []
      Object.entries(response).forEach(([key, value]) => {
        if (value.user === userId) {
          result.push(value)
        }
      })

      setUpdatedTickets(result)
    })
  }

  const handleTicketStatus = () => {
    setTicketStatus((prev) => !prev)
  }

  useEffect(() => {
    handleDateOrder()
  }, [dateOrder, handleDateOrder])

  useEffect(() => {
    // extract unique users from the updated tickets state
    // and store the result inside active users
    // to get a list of all users that have created at least one ticket
    let uniqueUserIds = new Set() // Create a Set to store unique user IDs
    let result = []

    updatedTickets?.forEach((element) => {
      // Check if the user ID is already in the Set
      if (!uniqueUserIds.has(element.user)) {
        uniqueUserIds.add(element.user) // Add the user ID to the Set
        getUser(element.user).then((response) => {
          result.push([element.user, response.email])
        })
      }
    })
    setActiveUsers(result)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatedTickets])

  return (
    <>
      <div className='flex flex-col'>
        <div className='flex flex-row gap-4 justify-center mb-4 items-center'>
          <div className='styled-button w-auto'>
            <HiOutlineRefresh
              size={29}
              onClick={() => {
                handleDateOrder()
              }}
            />
          </div>
          <div className='styled-button w-auto' onClick={() => handleChangeDateOrder()}>
            <div className='flex flex-row items-center justify-center'>
              <span>Date:&nbsp;&nbsp;</span>
              {dateOrder === 'desc' ? <BsArrowDown size={20} /> : ''}
              {dateOrder === 'asc' ? <BsArrowUp size={20} /> : ''}
            </div>
          </div>
          <div className='styled-button w-auto' onClick={() => handleChangePriorityOrder()}>
            <div className='flex flex-row items-center justify-center'>
              <span>Priority:&nbsp;&nbsp;</span>
              {priorityOrder === 'desc' ? <BsArrowDown size={20} /> : ''}
              {priorityOrder === 'asc' ? <BsArrowUp size={20} /> : ''}
            </div>
          </div>
          <CustomDatalist data={activeUsers} click={getTicketsFromUser} reset={handleDateOrder} />
        </div>
        <span className='text-md mb-1 italic text-center'>(cliquer sur une ligne pour editer un ticket)</span>
        <div className='border flex flex-row max-h-7 overflow-hidden bg-gray-100'>
          <div
            onClick={() => {
              handleTicketStatus()
            }}
            className='w-1/12 border border-gray-300 text-center hover:bg-gray-200 hover:cursor-pointer'>
            {ticketStatus ? (
              <div className='flex flex-row gap-2 justify-center items-center'>
                <span>Status</span>
                <RiTimerLine size={15} />
              </div>
            ) : (
              <div className='flex flex-row gap-2 justify-center items-center'>
                <span>Status</span>
                <RiCheckboxCircleLine size={15} />
              </div>
            )}
          </div>
          <div className='w-1/12 border border-gray-300 text-center '>Date</div>
          <div className='w-2/12 border border-gray-300 text-center '>User</div>
          <div className='w-1/12 border border-gray-300 text-center '>Option 1</div>
          <div className='w-1/12 border border-gray-300 text-center '>Option 2</div>
          <div className='w-1/12 border border-gray-300 text-center '>Option 3</div>

          <div className='w-5/12 border border-gray-300 text-center'>Contenu du ticket</div>
        </div>
        {updatedTickets &&
          Object.entries(updatedTickets).map(([key, value]) => {
            return (
              <Ticket
                key={uuidv4()}
                id={value.ticketId}
                priority={value.priority}
                status={value.status}
                ticketStatus={ticketStatus}
                ticket={value.ticket}
                user={value.user}
                date={value.date}
                choices={[value.choice1, value.choice2, value.choice3]}
              />
            )
          })}
      </div>
    </>
  )
}

export default Tickets
