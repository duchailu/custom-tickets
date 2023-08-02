import { UserAuth } from '@/firebase/firebaseContext'
import { useEffect, useState } from 'react'
import { RiCloseCircleLine } from 'react-icons/ri'
import Select from '../Select'
import DeleteConfirmationModal from './DeleteConfirmationModal'
import EditPriorityChoice from './EditPriorityChoice'

const EditModal = ({ closeModal, ticketId, priority, status, ticket, user, date, choices }) => {
  const { updateTicket, getUser, getSelect1Options, getSelect2Options, getSelect3Options } = UserAuth()

  const [ticketPriority, setTicketPriority] = useState(null)
  const [ticketStatus, setTicketStatus] = useState(null)
  const [ticketContent, setTicketContent] = useState('')
  const [ticketChoices, setTicketChoices] = useState(null)
  const [select1, setSelect1] = useState([])
  const [select2, setSelect2] = useState([])
  const [select3, setSelect3] = useState([])
  const [option1, setOption1] = useState('')
  const [option2, setOption2] = useState('')
  const [option3, setOption3] = useState('')

  const [ticketUser, setTicketUser] = useState(null)

  const [displayConfirmation, setDisplayConfirmation] = useState(false)

  const handleChangeOption1 = (data) => {
    setOption1(data)
  }
  const handleChangeOption2 = (data) => {
    setOption2(data)
  }
  const handleChangeOption3 = (data) => {
    setOption3(data)
  }

  const toggleConfirmationDisplay = () => {
    setDisplayConfirmation((prev) => !prev)
  }

  const handleChangeTicket = (temp) => {
    setTicketContent(temp)
  }

  const handleChangePriority = (temp) => {
    setTicketPriority(temp)
  }

  const handleChangeStatus = (temp) => {
    setTicketStatus(temp)
  }

  const handleUpdateTicket = () => {
    updateTicket(ticketId, ticketPriority, ticketStatus, ticketContent, user, date, option1, option2, option3).then(
      (response) => {
        closeModal()
      }
    )
  }

  const handleGetSelect1Options = () => {
    let result = []
    getSelect1Options().then((response) => {
      Object.entries(response).forEach(([key, value]) => result.push(value.content))
      setSelect1(result)
    })
  }
  const handleGetSelect2Options = () => {
    let result = []
    getSelect2Options().then((response) => {
      Object.entries(response).forEach(([key, value]) => result.push(value.content))
      setSelect2(result)
    })
  }
  const handleGetSelect3Options = () => {
    let result = []
    getSelect3Options().then((response) => {
      Object.entries(response).forEach(([key, value]) => result.push(value.content))
      setSelect3(result)
    })
  }

  useEffect(() => {
    handleGetSelect1Options()
    handleGetSelect2Options()
    handleGetSelect3Options()
  }, [])

  useEffect(() => {
    getUser(user).then((response) => setTicketUser(response.email))
  }, [getUser, user])

  useEffect(() => {
    setTicketPriority(priority)
    setTicketStatus(status)
    setTicketContent(ticket)
    setTicketChoices(choices)
  }, [priority, status, ticket, choices])

  useEffect(() => {
    if (ticketChoices) {
      setOption1(ticketChoices[0])
      setOption2(ticketChoices[1])
      setOption3(ticketChoices[2])
    }
  }, [ticketChoices])

  return (
    <div className='top-0 left-0 w-screen h-screen bg-slate-200/75 fixed grid place-content-center z-50 font-raleway'>
      <div className='w-[337px] sm:w-[576px] md:w-[691px] bg-slate-300 shadow-xl border-2 border-slate-400 rounded-xl flex flex-col gap-6 p-6 justify-center align-middle'>
        {displayConfirmation ? <DeleteConfirmationModal close={toggleConfirmationDisplay} ticketId={ticketId} /> : null}
        <div
          onClick={() => {
            closeModal()
          }}
          className='flex flex-row justify-end'>
          <RiCloseCircleLine size={30} className='hover:text-blue-400 scale-animation-small cursor-pointer' />
        </div>
        <div className='w-[90%] flex flex-row justify-center mx-auto text-center'>
          <div className='text-2xl'>
            <span className='font-bold'>Ticket créé par: </span>
            {ticketUser}
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
            onChange={(e) => {
              handleChangeTicket(e.target.value)
            }}
          />
        </div>

        <div className='flex flex-col gap-3'>
          <div className='text-center font-bold text-2xl'>
            <span>Priority</span>
          </div>
          <div className='flex flex-row gap-6 justify-center'>
            <EditPriorityChoice click={handleChangePriority} priority={1} current={ticketPriority} />
            <EditPriorityChoice click={handleChangePriority} priority={2} current={ticketPriority} />
            <EditPriorityChoice click={handleChangePriority} priority={3} current={ticketPriority} />
          </div>
        </div>

        <div className='flex flex-row gap-2 justify-center'>
          <Select data={select1} title={'Option 1'} selectedValue={option1} click={handleChangeOption1} />
          <Select data={select2} title={'Option 2'} selectedValue={option2} click={handleChangeOption2} />
          <Select data={select3} title={'Option 3'} selectedValue={option3} click={handleChangeOption3} />
        </div>

        <div className='flex flex-col gap-3'>
          <div className='text-center font-bold text-2xl'>
            <span>Statut</span>
          </div>

          <div className='flex flex-row gap-6 justify-center'>
            <div
              className={`button shadow-gray-700 shadow-sm ${
                ticketStatus === 1 ? 'text-gray-700 border-2 border-gray-700 font-bold' : ''
              }`}
              onClick={() => handleChangeStatus(1)}>
              Ouvert
            </div>
            <div
              className={`button shadow-gray-700 shadow-sm ${
                ticketStatus === 0 ? 'text-gray-700 border-2 border-gray-700 font-bold' : ''
              }`}
              onClick={() => handleChangeStatus(0)}>
              Clos
            </div>
          </div>
        </div>
        <div
          className='mx-auto styled-button-light font-bold mt-6'
          onClick={() => {
            handleUpdateTicket()
          }}>
          {/* <AiOutlineClose size={25} /> */}
          <span>Mise à jour</span>
        </div>
        <div
          className='mx-auto styled-button-light font-bold mt-6'
          onClick={() => {
            toggleConfirmationDisplay()
          }}>
          {/* <AiOutlineClose size={25} /> */}
          <span>Supprimer Ticket</span>
        </div>
      </div>
    </div>
  )
}

export default EditModal
