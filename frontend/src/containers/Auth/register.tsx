// React
import { FormEvent, useState } from 'react'

// Third party
import { ArrowLeft, Eye, EyeClosed } from '@phosphor-icons/react'
import { isEqual } from 'lodash'

// Local
import { ContainerMain } from './styles'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { createUser } from '../../store/modules/account/actions'

export const Register = () => {
  // State
  const [isCreateUserLoading, setIsCreateUserLoading] = useState(false)
  const [showPassword, setShowPassword] = useState('password')
  const [form, setForm] = useState({})

  // Hook
  const history = useHistory()
  const dispatch = useDispatch()

  const handleShowPassword = () => {
    if (isEqual(showPassword, 'text'))
      setShowPassword('password')
    else
      setShowPassword('text')
  }

  const handleSubmit = async (event: FormEvent) => {
    event.stopPropagation()
    event.preventDefault()

    if (!form['name'] || !form['email'] || !form['password'] || !form['confirm_password']) {
      toast.error('Todos os campos são obrigatórios')
      return
    }

    if (!isEqual(form['password'], form['confirm_password'])) {
      toast.error('As senhas não são iguais')
      return
    }

    if (form['password'].length < 8) {
      toast.error('Senha precisa ter mais de 8 caracteres')
      return
    }

    const data = {
      name: form['name'],
      email: form['email'],
      password: form['password']
    }

    setIsCreateUserLoading(true)
    dispatch(createUser(data, {
      onFinish: () => {
        setIsCreateUserLoading(false)
        history.push('/')
      },
      onError: () => setIsCreateUserLoading(false)
    }))
  }

  return (
    <ContainerMain>
      <div className='content-main'>
        <button className='register-to register' onClick={(event) => {
          event.stopPropagation()
          history.goBack()
        }}>
          <span>Login</span>
          <ArrowLeft size={20} />
        </button>

        <form onSubmit={handleSubmit}>
          <input
            type='text'
            name='name'
            placeholder='Ex: example'
            value={form['name']}
            onChange={event => setForm({ ...form, [event.target.name]: event.target.value })}
            required />
          <input
            type='email'
            placeholder='Ex: example@example.com'
            name='email'
            value={form['email']}
            onChange={event => setForm({ ...form, [event.target.name]: event.target.value })}
            required />
          <div className='password'>
            <input
              type={showPassword}
              placeholder='***********'
              name='password'
              value={form['password']}
              onChange={event => setForm({ ...form, [event.target.name]: event.target.value })}
              required />
            {isEqual(showPassword, 'text') ?
              <Eye onClick={handleShowPassword} className='icon-show-password' size={20} /> :
              <EyeClosed onClick={handleShowPassword} className='icon-show-password' size={20} />
            }
          </div>
          <input
            type={showPassword}
            placeholder='***********'
            name='confirm_password'
            value={form['confirm_password']}
            onChange={event => setForm({ ...form, [event.target.name]: event.target.value })}
            required />

          <button type='submit'>{isCreateUserLoading ? 'Carregando...' : 'Registrar'}</button>
        </form>
      </div>
    </ContainerMain>
  )
}