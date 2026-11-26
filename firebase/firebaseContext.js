import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { get, ref, remove, set, update } from 'firebase/database'
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useState } from 'react'
import { auth, db } from './Firebase'

const UserContext = createContext()

// Messages en français pour les erreurs de Firebase Authentication (codes "auth/...")
// Depuis 2023, Firebase répond "invalid-credential" pour un mauvais email OU mot de passe.
const authErrorMessages = {
  'auth/email-already-in-use': 'Cet Email est déjà utilisé.',
  'auth/invalid-email': "Cet Email n'est pas valide.",
  'auth/missing-password': 'Veuillez saisir un mot de passe.',
  'auth/weak-password': 'Le mot de passe doit contenir au moins 6 caractères.',
  'auth/invalid-credential': 'Email ou mot de passe incorrect.',
  'auth/wrong-password': 'Email ou mot de passe incorrect.',
  'auth/user-not-found': 'Email ou mot de passe incorrect.',
  'auth/too-many-requests': 'Trop de tentatives. Réessayez dans quelques minutes.',
  'auth/network-request-failed': 'Problème de connexion internet. Réessayez.',
}

const getErrorMessage = (error) => authErrorMessages[error.code] || 'Une erreur est survenue. Réessayez.'

// Lecture unique d'un chemin de la Realtime Database (null s'il est vide).
// (onValue sert aux écoutes en temps réel : voir Tickets.js)
const read = async (path) => (await get(ref(db, path))).val()

export const UserAuthProvider = ({ children }) => {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  // Une seule écoute de la connexion pour toute l'app
  useEffect(() => onAuthStateChanged(auth, setUser), [])

  // AUTHENTIFICATION
  // Création d'un utilisateur par l'admin. Attention : Firebase connecte aussitôt le nouveau compte.
  const signup = async (email, password, userType) => {
    try {
      const { user: newUser } = await createUserWithEmailAndPassword(auth, email, password)
      await createUser(newUser.uid, email, userType)
      setErrorMessage('')
      router.push('/')
    } catch (error) {
      setErrorMessage(getErrorMessage(error))
    }
  }

  const signin = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      setErrorMessage('')
      router.push('/')
    } catch (error) {
      setErrorMessage(getErrorMessage(error))
    }
  }

  const signout = async () => {
    await signOut(auth)
    window.location.reload()
  }

  // REALTIME DATABASE
  // Tickets : tickets/{id} = { ticket, priority (1 à 3), status (1 ouvert, 0 clos), date, user (uid), choice1..3 }
  const addTicket = (ticket, priority, status, choice1, choice2, choice3) =>
    set(ref(db, 'tickets/' + crypto.randomUUID()), {
      ticket,
      priority,
      status,
      date: Date.now(),
      user: auth.currentUser.uid,
      choice1,
      choice2,
      choice3,
    })

  const updateTicket = (id, priority, status, ticket, user, date, choice1, choice2, choice3) =>
    update(ref(db, 'tickets/' + id), { user, date, priority, status, ticket, choice1, choice2, choice3 })

  const removeTicket = (ticketId) => remove(ref(db, 'tickets/' + ticketId))

  // Options proposées à la création d'un ticket : select1/, select2/, select3/ = { id: { content } }
  const addSelectOption = (selectNumber, content) =>
    set(ref(db, `select${selectNumber}/` + crypto.randomUUID()), { content })

  // Renvoie la liste des textes d'options d'un menu (1, 2 ou 3)
  const getSelectOptions = async (selectNumber) =>
    Object.values((await read(`select${selectNumber}/`)) ?? {}).map((option) => option.content)

  // Utilisateurs : users/{uid} = { email, userType ('employé' ou 'technicien') }
  const createUser = (userId, email, userType) => set(ref(db, 'users/' + userId), { email, userType })
  const getUser = (userId) => read('users/' + userId)
  const getUsers = () => read('users/')

  return (
    <UserContext.Provider
      value={{
        user,
        signup,
        signin,
        signout,
        errorMessage,
        setErrorMessage,
        addTicket,
        updateTicket,
        removeTicket,
        addSelectOption,
        getSelectOptions,
        getUser,
        getUsers,
      }}>
      {children}
    </UserContext.Provider>
  )
}

export const UserAuth = () => {
  return useContext(UserContext)
}
