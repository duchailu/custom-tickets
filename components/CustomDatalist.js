import { useEffect, useState } from 'react'
import { IoIosCloseCircleOutline } from 'react-icons/io'
import { v4 as uuidv4 } from 'uuid'
const _ = require('lodash')

const CustomDatalist = ({ data, click, reset }) => {
  const [showDatalist, setShowDatalist] = useState(false)
  const [inputData, setInputData] = useState('')
  const [dataToShow, setDataToShow] = useState([])

  const handleInputChange = (value) => {
    reset()
    setDataToShow([])
    setInputData(value)
    if (value.length !== 0) {
      setShowDatalist(true)
    } else {
      reset()
      setInputData('')
      setShowDatalist(false)
      setDataToShow([])
    }
  }

  useEffect(() => {
    let result = []
    data.forEach((element) => {
      const str1 = element[1]?.toLowerCase()
      const str2 = inputData?.toLowerCase()
      if (str1.includes(str2) && !result.includes(element[1])) {
        result.push(element)
      }
    })
    setDataToShow(result)
  }, [inputData])

  useEffect(() => {}, [])

  return (
    <div className='relative w-[250px]'>
      <div className='flex flex-col'>
        <div className='mb-2 text-md italic text-center'>Chercher les tickets d&apos;un utilisateur:</div>
        <div className='flex flex-row place-items-center relative'>
          <input
            type='text'
            className='custom-text-area'
            onChange={(e) => {
              handleInputChange(e.target.value)
            }}
            value={inputData}
            placeholder='Search...'
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                setInputData('')
                setShowDatalist(false)
                setDataToShow([])
              }
            }}
          />
          {inputData !== '' ? (
            <IoIosCloseCircleOutline
              size={30}
              className='hover:cursor-pointer hover:text-slate-300 ml-1 absolute right-0'
              onClick={() => {
                reset()
                setInputData('')
                setShowDatalist(false)
                setDataToShow([])
              }}
            />
          ) : (
            ''
          )}
        </div>
      </div>
      {inputData !== '' ? (
        <div
          className={`text-center bg-slate-100 min-w-[250px] rounded-lg shadow-lg border border-slate-400 z-100 absolute top-20 max-h-[300px] overflow-auto p-2 ${
            showDatalist && dataToShow.length !== 0 ? 'flex flex-col' : 'hidden'
          }`}>
          {dataToShow.map((element) => {
            return (
              <div
                className='hover:font-bold hover:underline hover:cursor-pointer'
                key={uuidv4()}
                onClick={() => {
                  click(element[0])
                  setInputData('')
                }}>
                {element[1]}
              </div>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}

export default CustomDatalist
