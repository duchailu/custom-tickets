import { UserAuth } from '@/firebase/firebaseContext'
import { useEffect, useState } from 'react'
import { RiCloseCircleLine } from 'react-icons/ri'
import Select from '../Select'
import EditPriorityChoice from './EditPriorityChoice'

const CreateTicketModal = ({ handleHideModal }) => {
  const { addTicket, getSelect1Options, getSelect2Options, getSelect3Options } = UserAuth()

  const [ticket, setTicket] = useState('')
  const [priority, setPriority] = useState(null)
  const [select1, setSelect1] = useState([])
  const [select2, setSelect2] = useState([])
  const [select3, setSelect3] = useState([])
  const [option1, setOption1] = useState('')
  const [option2, setOption2] = useState('')
  const [option3, setOption3] = useState('')
  const [alerts, setAlerts] = useState(false)

  const handleChangeTicket = (e) => {
    setTicket(e.target.value)
  }

  const handleChangePriority = (temp) => {
    setPriority(temp)
  }

  const handleOption1 = (data) => {
    setOption1(data)
  }

  const handleOption2 = (data) => {
    setOption2(data)
  }

  const handleOption3 = (data) => {
    setOption3(data)
  }

  const createTicket = () => {
    if (ticket.trim() === '') {
      setAlerts(true)
      return
    }

    if (priority === null) {
      setAlerts(true)
      return
    }

    addTicket(ticket, priority, 1, option1, option2, option3).then((response) => {
      handleHideModal()
    })
  }

  const handleGetSelectOptions = async () => {
    const response1 = await getSelect1Options()
    const response2 = await getSelect2Options()
    const response3 = await getSelect3Options()

    setSelect1(Object.values(response1).map((value) => value.content))
    setSelect2(Object.values(response2).map((value) => value.content))
    setSelect3(Object.values(response3).map((value) => value.content))
  }

  useEffect(() => {
    handleGetSelectOptions()
  }, [])

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
            onChange={handleChangeTicket}
          />
        </div>
        <div className='flex flex-col gap-3'>
          <div className='text-center font-bold text-2xl'>
            <span>Priority</span>
          </div>
          <div className='flex flex-row gap-6 justify-center'>
            <EditPriorityChoice click={handleChangePriority} priority={1} current={priority} />
            <EditPriorityChoice click={handleChangePriority} priority={2} current={priority} />
            <EditPriorityChoice click={handleChangePriority} priority={3} current={priority} />
          </div>
        </div>

        <div className='flex flex-row gap-2 justify-center'>
          <Select data={select1} title={'Option 1'} click={handleOption1} selectedValue={option1} />
          <Select data={select2} title={'Option 2'} click={handleOption2} selectedValue={option2} />
          <Select data={select3} title={'Option 3'} click={handleOption3} selectedValue={option3} />
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
      </div>
    </div>
  )
}

export default CreateTicketModal
