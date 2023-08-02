const Select = ({ title, data, click, selectedValue }) => {
  return (
    <div className='flex flex-col gap-2 text-center'>
      <div>{title}</div>
      <select
        className='rounded-lg shadow-lg p-1 cursor-pointer'
        onChange={(e) => {
          click(e.target.value)
        }}
        value={selectedValue}>
        <option disabled value=''>
          {/* Display a default option when no value is selected */}
        </option>
        {data.map((element, elementId) => (
          <option className='cursor-pointer' key={elementId} value={element}>
            {element}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Select
