// Message d'erreur rouge affiché dans les fenêtres quand un enregistrement échoue
const ErrorMessage = ({ message }) => {
  if (!message) return null
  return (
    <div className='p-1 border-2 border-red-400 rounded-lg text-red-500 text-center italic' role='alert'>
      {message}
    </div>
  )
}

export default ErrorMessage
