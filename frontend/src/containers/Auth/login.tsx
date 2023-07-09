// Third party
import { ArrowRight, Eye, EyeClosed, Warning } from '@phosphor-icons/react'
import { isEqual } from 'lodash'

// Local
import { ContainerMain } from './styles'
import { FormEvent, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../store/modules/account/actions'
import { isAuthenticated } from '../../components/utils/auth'

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
        if (isAuthenticated())
          history.push('/home')
      },
      onError: () => setIsLoginUserLoading(false)
    }))
  }

  const handleMouseEnter = () => {
    document.querySelector('div#text-warning-id')?.classList.add('text-warning-active')
  }

  const handleMouseLeave = () => {
    document.querySelector('div#text-warning-id')?.classList.remove('text-warning-active')
  }

  return (
    <ContainerMain>
      <div className='content-main'>
        <button className='register-to' onClick={() => history.push('/register')}>
          <span>Registrar</span>
          <ArrowRight size={20} />
        </button>

        <div className='container-warning'>
          <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className='warning'>
            <Warning size={25} />
          </div>
          <div id='text-warning-id' className='text-warning'>
            <p>
              <span>Aviso de Privacidade:</span> Sua privacidade é importante para nós! Nossa aplicação não solicita informações sensíveis que possam comprometer você.
              É importante ressaltar que a aplicação foi desenvolvida estritamente para fins de estudo. Seu conforto e segurança são nossa prioridade.
            </p>
          </div>
        </div>


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

          <button type='submit' disabled={isLoginUserLoading}>{isLoginUserLoading ? 'Carregando...' : 'Entrar'}</button>
        </form>
      </div>
    </ContainerMain>
  )
}