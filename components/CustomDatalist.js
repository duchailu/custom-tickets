import { useState } from 'react'
import { IoIosCloseCircleOutline } from 'react-icons/io'

// Recherche d'un utilisateur parmi ceux qui ont créé des tickets.
// data = [[uid, email], …] ; click(uid) filtre les tickets ; reset() retire le filtre.
const CustomDatalist = ({ data, click, reset }) => {
  const [inputData, setInputData] = useState('')

  const matches = data.filter(([, email]) => email?.toLowerCase().includes(inputData.toLowerCase()))

  const clear = () => {
    reset()
    setInputData('')
  }

  return (
    <div className='relative w-[250px]'>
      <div className='flex flex-col'>
        <div className='mb-2 text-md italic text-center'>Chercher les tickets d&apos;un utilisateur:</div>
        <div className='flex flex-row place-items-center relative'>
          <input
            type='text'
            className='custom-text-area'
            onChange={(e) => {
              reset()
              setInputData(e.target.value)
            }}
            value={inputData}
            placeholder='Search...'
            onKeyDown={(e) => {
              if (e.key === 'Escape') setInputData('')
            }}
          />
          {inputData !== '' ? (
            <IoIosCloseCircleOutline
              size={30}
              className='hover:cursor-pointer hover:text-slate-300 ml-1 absolute right-0'
              onClick={clear}
            />
          ) : null}
        </div>
      </div>
      {inputData !== '' && matches.length > 0 ? (
        <div className='text-center bg-slate-100 min-w-[250px] rounded-lg shadow-lg border border-slate-400 z-100 absolute top-20 max-h-[300px] overflow-auto p-2 flex flex-col'>
          {matches.map(([uid, email]) => (
            <div
              className='hover:font-bold hover:underline hover:cursor-pointer'
              key={uid}
              onClick={() => {
                click(uid)
                setInputData('')
              }}>
              {email}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default CustomDatalist
