// React
import { ChangeEvent, FormEvent, useState } from 'react'

// Third party
import { ArrowLeft } from '@phosphor-icons/react'
import { isEqual, isNull } from 'lodash'
import { toast } from 'react-hot-toast'

// Project
import { Button, LabelColorSnack } from '../../containers/home/styles'
import { ISnack } from '../../store/modules/snack/types'
import { useDispatch } from 'react-redux'
import { createSnack } from '../../store/modules/snack/actions'
import { Loader } from '../loader'

// Local
import { ContainerMainModal, ContentIsDiet, ContentModal } from './styles'

const default_state = {
  name: '', description: '', date: '', hour: '', is_diet: null
}

export const ModaSnackCreateUpdate = ({ open, onClose, isUpdate, fetch }) => {
  // State
  const [isDiet, setIsDiet] = useState<number | null>(null)
  const [createSnackLoading, setCreateSnackLoading] = useState(false)
  const [form, setForm] = useState<ISnack>(default_state)

  // Hook
  const dispatch = useDispatch()

  const handleSelectIsdiet = (value: number) => {
    if (!isEqual(value, isDiet))
      setIsDiet(value)
  }

  const handleOnSubmit = (event: FormEvent) => {
    event.preventDefault()

    const data = {
      name: form.name,
      description: form.description,
      date: form.date,
      hour: form.hour,
      is_diet: isEqual(isDiet, 1) ? true : isEqual(isDiet, 0) ? false : null
    }

    if (!data.name || !data.description || !data.date ||
      !data.hour || isNull(data.is_diet)) {
      toast.error('Todos os campos são obrigatórios')
      return
    }

    if (!isUpdate) {
      setCreateSnackLoading(true)
      dispatch(createSnack(data, {
        onFinish: () => {
          setCreateSnackLoading(false)
          fetch()
          finishModal()
        },
        onError: () => {
          setCreateSnackLoading(false)
        }
      }))
    }
  }

  const finishModal = () => {
    setForm(default_state)
    onClose()
  }

  const handleOnChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target

    setForm({ ...form, [name]: value })
  }
  return (
    <ContainerMainModal open={open}>
      <ContentModal>
        <header>
          <ArrowLeft className='icon_back' onClick={finishModal} size={25} />
          <strong>Nova refeição</strong>
        </header>

        <div className='container_form'>
          <form onSubmit={handleOnSubmit}>
            <div className='content_input_label'>
              <label>Nome</label>
              <input
                type='text'
                name='name'
                value={form.name}
                onChange={handleOnChange} />
            </div>

            <div className='content_input_label'>
              <label>Descrição</label>
              <textarea
                name='description'
                value={form.description}
                onChange={handleOnChange}
                rows={6} />
            </div>

            <div className='container_date_time'>
              <div className='content_input_label'>
                <label>Data</label>
                <input
                  type='date'
                  value={form.date}
                  onChange={handleOnChange}
                  name='date' />
              </div>

              <div className='content_input_label'>
                <label>Hora</label>
                <input
                  type='time'
                  value={form.hour}
                  onChange={handleOnChange}
                  name='hour' />
              </div>
            </div>

            <ContentIsDiet>
              <button
                type='button'
                onClick={() => handleSelectIsdiet(1)}
                className={isEqual(isDiet, 1) ? 'is_diet' : ''}>
                <LabelColorSnack bgColor='#639339'></LabelColorSnack>
                Sim
              </button>

              <button
                type='button'
                onClick={() => handleSelectIsdiet(0)}
                className={isEqual(isDiet, 0) ? 'not_is_diet' : ''}>
                <LabelColorSnack bgColor='#BF3B44'></LabelColorSnack>
                Não
              </button>
            </ContentIsDiet>

            {createSnackLoading ? (
              <div className='flex-full-center'>
                <Loader />
              </div>
            ) : (
              <Button>Cadastrar refeição</Button>
            )}
          </form>
        </div>
      </ContentModal>
    </ContainerMainModal>
  )
}