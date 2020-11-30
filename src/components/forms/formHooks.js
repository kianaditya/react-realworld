import { useState, useEffect, useContext } from 'react'
import axios from '../../helpers/axiosService'

import { setToken } from '../../helpers/localStorage'

import { AppContext } from '../../AppContext'
import { deleteToken } from '../../helpers/localStorage'

export const useArticleManagementHook = (props) => {
  const [formData, setFormData] = useState({})
  const isCreate = props.match.params.action === 'create'
  useEffect(() => {
    !isCreate && setFormData(props.location.state.article)
  }, [])

  const onInputChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const submitArticle = async (e) => {
    e.preventDefault()
    const payload = { article: formData }

    try {
      const response = isCreate
        ? await axios.createArticle(payload)
        : await axios.updateArticle(props.location.state.article.slug, payload)
      props.history.push({
        pathname: `/article/${response.data.article.slug}`,
      })
    } catch (error) {
      console.error(error)
    }
  }

  return [formData, onInputChangeHandler, submitArticle]
}


const useFormHook = (props) => {
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
      setFormData({})
      props.history.push({
        pathname: '/',
      })
    } catch (error) {
      console.error(error)
    }
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

  const updateUser = async (e) => {
    e.preventDefault()
    const payload = { user: formData }
    try {
      const response = await axios.updateUser(payload)
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

  const logoutUser = () => {
    deleteToken()
    setState((state) => ({ ...state, currentUser: { isSignedIn: false } }))
    props.history.push({
      pathname: '/',
    })
  }

  return { submitRegistration, submitLogin, onInputChangeHandler,updateUser, logoutUser, formData }
}

export default useFormHook
