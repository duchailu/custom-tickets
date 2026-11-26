// Bouton de priorité High / Medium / Low.
// Les classes sont écrites en entier (pas de `text-${couleur}-500`) : Tailwind ne repère
// que les noms de classes complets présents dans le code, sinon la couleur n'apparaît pas.
const choices = {
  1: { text: 'High', shadow: 'shadow-red-500', selected: 'text-red-500 border-2 border-red-500 font-bold' },
  2: { text: 'Medium', shadow: 'shadow-yellow-500', selected: 'text-yellow-500 border-2 border-yellow-500 font-bold' },
  3: { text: 'Low', shadow: 'shadow-green-500', selected: 'text-green-500 border-2 border-green-500 font-bold' },
}

const EditPriorityChoice = ({ click, priority, current }) => {
  const { text, shadow, selected } = choices[priority]

  return (
    <div className={`button ${shadow} shadow-xs ${current === priority ? selected : ''}`} onClick={() => click(priority)}>
      {text}
    </div>
  )
}

export default EditPriorityChoice
