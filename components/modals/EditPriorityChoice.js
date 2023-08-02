import { useEffect, useState } from 'react'

const EditPriorityChoice = ({ click, priority, current }) => {
  const [color, setColor] = useState('')
  const [text, setText] = useState('')
  useEffect(() => {
    switch (priority) {
      case 1:
        setColor('red')
        setText('High')
        break

      case 2:
        setColor('yellow')
        setText('Medium')
        break

      case 3:
        setColor('green')
        setText('Low')
        break

      default:
        break
    }
  }, [priority])

  const handleClick = () => {
    click(priority)
  }
  return (
    <div
      className={`button shadow-${color}-500 shadow-sm ${
        current === priority ? `text-${color}-500 border-2 border-${color}-500 font-bold` : ''
      }`}
      onClick={handleClick}>
      {text}
    </div>
  )
}

export default EditPriorityChoice
