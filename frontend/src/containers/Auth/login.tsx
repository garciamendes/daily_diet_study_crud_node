// Third party
import { ArrowRight, Eye, EyeClosed } from '@phosphor-icons/react'
import { isEqual } from 'lodash'
import bcrypt from 'bcryptjs'

// Local
import { ContainerMain } from './styles'
import { FormEvent, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../store/modules/account/actions'

export const Login = () => {
  // State
  const [showPassword, setShowPassword] = useState('password')
  const [form, setForm] = useState({})
  const [isLoginUserLoading, setIsLoginUserLoading] = useState(false)

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
    event.preventDefault()

    if (!form['email'] || !form['password']) {
      toast.error('Todos os campos são obrigatórios')
      return
    }

    const data = {
      email: form['email'],
      password: form['password']
    }

    setIsLoginUserLoading(true)
    dispatch(loginUser(data, {
      onFinish: () => {
        setIsLoginUserLoading(false)
        history.push('/')
      },
      onError: () => setIsLoginUserLoading(false)
    }))
  }

  return (
    <ContainerMain>
      <div className='content-main'>
        <button className='register-to' onClick={() => history.push('/register')}>
          <span>Registrar</span>
          <ArrowRight size={20} />
        </button>

        <form onSubmit={handleSubmit}>
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
              placeholder='*********'
              name='password'
              value={form['password']}
              onChange={event => setForm({ ...form, [event.target.name]: event.target.value })}
              required />
            {isEqual(showPassword, 'text') ?
              <Eye onClick={handleShowPassword} className='icon-show-password' size={20} /> :
              <EyeClosed onClick={handleShowPassword} className='icon-show-password' size={20} />
            }

          </div>

          <button type='submit'>{isLoginUserLoading ? 'Carregando...' : 'Entrar'}</button>
        </form>
      </div>
    </ContainerMain>
  )
}