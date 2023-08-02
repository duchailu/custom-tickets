import { UserAuth } from '@/firebase/firebaseContext'
import { useState } from 'react'
import AddOptionConfirmationModal from '../modals/AddOptionConfirmationModal'
import OptionInput from './OptionInput'

const OptionForm = () => {
  const { addSelect1Option, addSelect2Option, addSelect3Option } = UserAuth()

  const [option1, setOption1] = useState('')
  const [option2, setOption2] = useState('')
  const [option3, setOption3] = useState('')
  const [showOptionModal, setShowOptionModal] = useState(false)

  const getOptionData = () => {
    if (option1 !== '') {
      return [1, option1]
    }
    if (option2 !== '') {
      return [2, option2]
    }
    if (option3 !== '') {
      return [3, option3]
    }
  }

  const addNewOption = () => {
    if (option1 !== '') {
      addSelect1Option(option1)
    }
    if (option2 !== '') {
      addSelect2Option(option2)
    }
    if (option3 !== '') {
      addSelect3Option(option3)
    }
  }

  const clearInputs = () => {
    setOption1('')
    setOption2('')
    setOption3('')
  }

  const handleChangeOption1 = (e) => {
    setOption1(e.target.value)
  }

  const handleFocusOption1 = () => {
    setOption2('')
    setOption3('')
  }

  const handleChangeOption2 = (e) => {
    setOption1('')
    setOption2(e.target.value)
    setOption3('')
  }

  const handleFocusOption2 = () => {
    setOption1('')
    setOption3('')
  }

  const handleChangeOption3 = (e) => {
    setOption3(e.target.value)
  }

  const handleFocusOption3 = () => {
    setOption1('')
    setOption2('')
  }

  const handleShowOptionModal = () => {
    setShowOptionModal(true)
  }

  const handleHideOptionModal = () => {
    setShowOptionModal(false)
  }

  return (
    <div className='flex flex-col gap-2 justify-center items-center border border-slate-300 bg-slate-100/40 rounded-lg shadow-lg text-center h-[300px] p-6'>
      {showOptionModal && (
        <AddOptionConfirmationModal
          close={handleHideOptionModal}
          data={getOptionData()}
          click={addNewOption}
          clear={clearInputs}
        />
      )}
      <span className='font-bold'>Rajouter une option</span>
      <span className='font-bold'>dans la création de tickets</span>
      <div className='flex flex-row gap-4 mt-6'>
        <OptionInput
          title={'Option 1'}
          data={option1}
          change={handleChangeOption1}
          focus={handleFocusOption1}
          escape={() => {
            setOption1('')
          }}
        />
        <OptionInput
          title={'Option 2'}
          data={option2}
          change={handleChangeOption2}
          focus={handleFocusOption2}
          escape={() => {
            setOption2('')
          }}
        />
        <OptionInput
          title={'Option 3'}
          data={option3}
          change={handleChangeOption3}
          focus={handleFocusOption3}
          escape={() => {
            setOption3('')
          }}
        />
      </div>
      <div className='styled-button-light w-[150px] mx-auto mt-6' onClick={handleShowOptionModal}>
        confirmer
      </div>
    </div>
  )
}

export default OptionForm
