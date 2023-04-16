// React
import { useState } from 'react'

// Third party
import { ArrowLeft, Eye, EyeClosed } from '@phosphor-icons/react'
import { isEqual } from 'lodash'

// Local
import { ContainerMain } from './styles'
import { useHistory } from 'react-router-dom'

export const Register = () => {
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
        <button className='register-to register' onClick={() => history.goBack()}>
          <span>Login</span>
          <ArrowLeft size={20} />
        </button>

        <form>
          <input type='text' placeholder='Ex: example' required />
          <input type='email' placeholder='Ex: example@example.com' required />
          <div className='password'>
            <input type={showPassword} placeholder='***********' required />
            {isEqual(showPassword, 'text') ?
              <Eye onClick={handleShowPassword} className='icon-show-password' size={20} /> :
              <EyeClosed onClick={handleShowPassword} className='icon-show-password' size={20} />
            }
          </div>
          <input type={showPassword} placeholder='***********' required />

          <button type='submit'>Registrar</button>
        </form>
      </div>
    </ContainerMain>
  )
}