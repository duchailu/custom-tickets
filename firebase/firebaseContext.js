import { createUserWithEmailAndPassword, deleteUser, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { onValue, ref, remove, set, update } from 'firebase/database'
import { useRouter } from 'next/router'
import { createContext, useContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { auth, db } from './Firebase'

const UserContext = createContext()

export const UserAuthProvider = ({ children }) => {
  const router = useRouter()

  const [errorMessage, setErrorMessage] = useState('')

  function getErrorMessage(temp) {
    if (temp === 'Firebase: Error (auth/email-already-in-use).') {
      setErrorMessage('Cet Email est déjà utilisé.')
    }
    if (temp === 'Firebase: Error (auth/invalid-email).') {
      setErrorMessage("Cet Email n'est pas valide.")
    }
    if (temp === 'Firebase: Error (auth/wrong-password).') {
      setErrorMessage('Mot de passe non valable.')
    }
    if (temp === 'Firebase: Error (auth/user-not-found).') {
      setErrorMessage("Cet utilisateur n'existe pas.")
    }
  }

  // AUTHENTIFICATION METHODS
  const signup = (email, password, userType) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(`${userCredential.user.email} was successfully created and signed in`)
        // setDoc(doc(db, 'users', userCredential.user.email), {})
        createUser(userCredential.user.uid, email, userType).then((response) => {
          console.log(`${email} created`)
        })
      })
      .catch((error) => {
        getErrorMessage(error.message)
      })

    if (errorMessage === '') {
      router.push('/')
    }
  }
  const signin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        if (auth.currentUser) {
          console.log(`${userCredential.user.email} was successfully signed in`)
        }
      })
      .catch((error) => {
        getErrorMessage(error.message)
      })
    if (errorMessage === '') {
      router.push('/')
    }
  }
  const signout = () => {
    signOut(auth).then(() => {
      console.log('User was successfully signed out')
      window.location.reload()
    })
  }

  // REALTIME DATABASE METHODS

  const addTicket = async (ticket, priority, status, choice1, choice2, choice3) => {
    const ticketRef = ref(db, 'tickets/' + uuidv4())
    const date = Date.now()
    await set(ticketRef, {
      ticket,
      priority,
      status,
      date,
      user: auth.currentUser.uid,
      choice1,
      choice2,
      choice3,
    })
  }

  const addSelect1Option = async (content) => {
    const select1Ref = ref(db, 'select1/' + uuidv4())
    await set(select1Ref, { content })
  }

  const getSelect1Options = async () => {
    const select1OptionsRef = ref(db, 'select1/')
    return new Promise((resolve) => {
      onValue(select1OptionsRef, (snapshot) => {
        resolve(snapshot.val())
      })
    })
  }

  const addSelect2Option = async (content) => {
    const select2Ref = ref(db, 'select2/' + uuidv4())
    await set(select2Ref, { content })
  }

  const getSelect2Options = async () => {
    const select2OptionsRef = ref(db, 'select2/')
    return new Promise((resolve) => {
      onValue(select2OptionsRef, (snapshot) => {
        resolve(snapshot.val())
      })
    })
  }

  const addSelect3Option = async (content) => {
    const select3Ref = ref(db, 'select3/' + uuidv4())
    await set(select3Ref, { content })
  }

  const getSelect3Options = async () => {
    const select3OptionsRef = ref(db, 'select3/')
    return new Promise((resolve) => {
      onValue(select3OptionsRef, (snapshot) => {
        resolve(snapshot.val())
      })
    })
  }

  const createUser = async (userId, email, userType) => {
    const userRef = ref(db, 'users/' + userId)
    await set(userRef, {
      email,
      userType,
    })
  }
  const getUser = async (userId) => {
    const userRef = ref(db, 'users/' + userId)
    return new Promise((resolve) => {
      onValue(userRef, (snapshot) => {
        resolve(snapshot.val())
      })
    })
  }

  const getUsers = async () => {
    const userRef = ref(db, 'users/')
    return new Promise((resolve) => {
      onValue(userRef, (snapshot) => {
        resolve(snapshot.val())
      })
    })
  }

  const getTickets = async () => {
    const ticketsRef = ref(db, 'tickets/')
    return new Promise((resolve) => {
      onValue(ticketsRef, (snapshot) => {
        resolve(snapshot.val())
      })
    })
  }

  const removeUser = (userId) => {
    if (auth.currentUser) {
      deleteUser(auth.currentUser)
        .then(() => {
          // User deleted.
          remove(ref(db, '/users/' + userId))
        })
        .catch((error) => {
          // An error ocurred
          console.log(error.message)
        })
    }
  }

  const removeTicket = async (ticketId) => {
    const ticketRef = ref(db, 'tickets/' + ticketId)
    remove(ticketRef)
  }

  const getTicket = async (ticketId) => {
    const ticketRef = ref(db, 'tickets/' + ticketId)
    return new Promise((resolve) => {
      onValue(ticketRef, (snapshot) => {
        resolve(snapshot.val())
      })
    })
  }

  const updateTicket = async (
    id,
    ticketPriority,
    ticketStatus,
    ticketContent,
    user,
    date,
    option1,
    option2,
    option3
  ) => {
    const ticketRef = ref(db, 'tickets/' + id)
    const priority = ticketPriority
    const status = ticketStatus
    const ticket = ticketContent
    const choice1 = option1
    const choice2 = option2
    const choice3 = option3
    const data = { user, date, priority, status, ticket, choice1, choice2, choice3 }
    // await update(ticketRef, data)
    await update(ticketRef, data)
  }

  return (
    <UserContext.Provider
      value={{
        signup,
        signin,
        signout,
        errorMessage,
        setErrorMessage,
        removeUser,
        addTicket,
        getUser,
        getUsers,
        getTickets,
        removeTicket,
        getTicket,
        updateTicket,
        addSelect1Option,
        getSelect1Options,
        addSelect2Option,
        getSelect2Options,
        addSelect3Option,
        getSelect3Options,
      }}>
      {children}
    </UserContext.Provider>
  )
}

export const UserAuth = () => {
  return useContext(UserContext)
}
