import { db } from '@/firebase/Firebase'
import { UserAuth } from '@/firebase/firebaseContext'
import { onValue, ref } from 'firebase/database'
import { useEffect, useState } from 'react'
import { BsArrowDown, BsArrowUp } from 'react-icons/bs'
import { HiOutlineRefresh } from 'react-icons/hi'
import { RiCheckboxCircleLine, RiTimerLine } from 'react-icons/ri'
import CustomDatalist from '../CustomDatalist'
import Ticket from './Ticket'

const Tickets = () => {
  const { getUsers } = UserAuth()

  const [tickets, setTickets] = useState([]) // tous les tickets, mis à jour en temps réel
  const [usersEmails, setUsersEmails] = useState({}) // { uid: email }
  const [sortKey, setSortKey] = useState('date') // tri en cours : 'date' ou 'priority'
  const [dateOrder, setDateOrder] = useState('desc')
  const [priorityOrder, setPriorityOrder] = useState('desc')
  const [selectedUser, setSelectedUser] = useState(null) // uid filtré, ou null pour tous
  // true => tickets en cours ; false => tickets clos
  const [showOpenTickets, setShowOpenTickets] = useState(true)

  // Une seule écoute en temps réel des tickets (fermée quand la liste disparaît)
  useEffect(() => {
    const unsubscribe = onValue(ref(db, 'tickets/'), (snapshot) => {
      const data = snapshot.val() ?? {}
      setTickets(Object.entries(data).map(([ticketId, ticket]) => ({ ...ticket, ticketId })))
    })
    return unsubscribe
  }, [])

  // Emails des utilisateurs, lus une fois
  useEffect(() => {
    getUsers().then((users) => {
      const emails = {}
      Object.entries(users ?? {}).forEach(([uid, user]) => (emails[uid] = user.email))
      setUsersEmails(emails)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Utilisateurs ayant créé au moins un ticket : [[uid, email], …] (pour la recherche)
  const activeUsers = [...new Set(tickets.map((ticket) => ticket.user))]
    .filter((uid) => usersEmails[uid])
    .map((uid) => [uid, usersEmails[uid]])

  // Tickets affichés : filtrés par utilisateur, puis triés
  const order = sortKey === 'date' ? dateOrder : priorityOrder
  const displayedTickets = tickets
    .filter((ticket) => !selectedUser || ticket.user === selectedUser)
    .sort((a, b) => (order === 'asc' ? a[sortKey] - b[sortKey] : b[sortKey] - a[sortKey]))

  const toggle = (value) => (value === 'asc' ? 'desc' : 'asc')

  const handleDateOrder = () => {
    setSortKey('date')
    setDateOrder(toggle)
  }

  const handlePriorityOrder = () => {
    setSortKey('priority')
    setPriorityOrder(toggle)
  }

  // Bouton "actualiser" : tous les utilisateurs, tri par date
  const reset = () => {
    setSelectedUser(null)
    setSortKey('date')
  }

  return (
    <>
      <div className='flex flex-col'>
        <div className='flex flex-row gap-4 justify-center mb-4 items-center'>
          <div className='styled-button w-auto' onClick={reset}>
            <HiOutlineRefresh size={29} />
          </div>
          <div className='styled-button w-auto' onClick={handleDateOrder}>
            <div className='flex flex-row items-center justify-center'>
              <span>Date:&nbsp;&nbsp;</span>
              {dateOrder === 'desc' ? <BsArrowDown size={20} /> : <BsArrowUp size={20} />}
            </div>
          </div>
          <div className='styled-button w-auto' onClick={handlePriorityOrder}>
            <div className='flex flex-row items-center justify-center'>
              <span>Priority:&nbsp;&nbsp;</span>
              {priorityOrder === 'desc' ? <BsArrowDown size={20} /> : <BsArrowUp size={20} />}
            </div>
          </div>
          <CustomDatalist data={activeUsers} click={setSelectedUser} reset={() => setSelectedUser(null)} />
        </div>
        <span className='text-md mb-1 italic text-center'>(cliquer sur une ligne pour editer un ticket)</span>
        <div className='border flex flex-row max-h-7 overflow-hidden bg-gray-100'>
          <div
            onClick={() => setShowOpenTickets((prev) => !prev)}
            className='w-1/12 border border-gray-300 text-center hover:bg-gray-200 hover:cursor-pointer'>
            <div className='flex flex-row gap-2 justify-center items-center'>
              <span>Status</span>
              {showOpenTickets ? <RiTimerLine size={15} /> : <RiCheckboxCircleLine size={15} />}
            </div>
          </div>
          <div className='w-1/12 border border-gray-300 text-center '>Date</div>
          <div className='w-2/12 border border-gray-300 text-center '>User</div>
          <div className='w-1/12 border border-gray-300 text-center '>Option 1</div>
          <div className='w-1/12 border border-gray-300 text-center '>Option 2</div>
          <div className='w-1/12 border border-gray-300 text-center '>Option 3</div>

          <div className='w-5/12 border border-gray-300 text-center'>Contenu du ticket</div>
        </div>
        {displayedTickets
          // status 1 = en cours, 0 = clos
          .filter((ticket) => Boolean(ticket.status) === showOpenTickets)
          .map((ticket) => (
            <Ticket
              key={ticket.ticketId}
              id={ticket.ticketId}
              priority={ticket.priority}
              status={ticket.status}
              ticket={ticket.ticket}
              user={ticket.user}
              userEmail={usersEmails[ticket.user]}
              date={ticket.date}
              choices={[ticket.choice1, ticket.choice2, ticket.choice3]}
            />
          ))}
      </div>
    </>
  )
}

export default Tickets
