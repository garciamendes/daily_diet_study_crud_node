// Third party
import { ArrowRight, Eye, EyeClosed } from '@phosphor-icons/react'
import { isEqual } from 'lodash'

// Local
import { ContainerMain } from './styles'
import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

export const Login = () => {
  // State
  const [showPassword, setShowPassword] = useState('password')

  // Hook
  const history = useHistory()

  const handleShowPassword = () => {
    if (isEqual(showPassword, 'text'))
      setShowPassword('password')
    else
      setShowPassword('text')
  }

  return (
    <ContainerMain>
      <div className='content-main'>
        <button className='register-to' onClick={() => history.push('/register')}>
          <span>Registrar</span>
          <ArrowRight size={20} />
        </button>

        <form>
          <input type='email' placeholder='Ex: example@example.com' required />
          <div className='password'>
            <input type={showPassword} placeholder='*********' required />
            {isEqual(showPassword, 'text') ?
              <Eye onClick={handleShowPassword} className='icon-show-password' size={20} /> :
              <EyeClosed onClick={handleShowPassword} className='icon-show-password' size={20} />
            }

          </div>

          <button type='submit'>Entrar</button>
        </form>
      </div>
    </ContainerMain>
  )
}