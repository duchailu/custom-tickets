import { UserAuth } from '@/firebase/firebaseContext'
import { useEffect, useState } from 'react'

// Charge une fois les choix des 3 menus "Option 1 / 2 / 3" : [[…], […], […]]
export function useSelectOptions() {
  const { getSelectOptions } = UserAuth()
  const [selectOptions, setSelectOptions] = useState([[], [], []])

  useEffect(() => {
    Promise.all([getSelectOptions(1), getSelectOptions(2), getSelectOptions(3)]).then(setSelectOptions)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return selectOptions
}
