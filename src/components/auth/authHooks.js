import { useState, useContext } from 'react'
import { AppContext } from '../../AppContext'
import axios from '../../helpers/axiosService'
import { setToken } from '../../helpers/localStorage'

export const useLoginForm = (props) => {
  const [state, setState] = useContext(AppContext)
  const [formData, setFormData] = useState({})
  const onInputChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const submitLogin = async (e) => {
    e.preventDefault()
    const payload = { user: formData }
    try {
      const response = await axios.login(payload)
      setToken(response.data.user.token)
      const currentUser = {
        isSignedIn: true,
        username: response.data.user.username,
      }
      setState((state) => ({ ...state, currentUser: currentUser }))
      props.history.push({
        pathname: '/',
      })
    } catch (error) {
      console.error(error)
    }
  }
  return [submitLogin, formData, onInputChangeHandler]
}

export const useRegistrationForm = (props) => {
  const [state, setState] = useContext(AppContext)
  const [formData, setFormData] = useState({})

  const onInputChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const submitRegistration = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const payload = { user: Object.fromEntries(formData) }

    try {
      const response = await axios.register(payload)
      const currentUser = {
        isSignedIn: true,
        username: response.data.user.username,
      }
      setState((state) => ({ ...state, currentUser: currentUser }))
      props.history.push({
        pathname: '/',
      })
    } catch (error) {
      console.error(error)
    }
  }
  return [submitRegistration, onInputChangeHandler, formData]
}
