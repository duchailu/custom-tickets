const OptionInput = ({ title, data, change, focus, escape }) => {
  return (
    <div className='flex flex-col gap-2'>
      <span>{title}</span>
      <input
        type='text'
        className='custom-text-area'
        placeholder='Search...'
        value={data}
        onChange={change}
        onFocus={focus}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            escape
          }
        }}
      />
    </div>
  )
}

export default OptionInput
