// React
import { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { useDispatch } from 'react-redux'

// Project
import { Loader } from '../../loader'

// Local
import { Button, ContainerMainModal, ContentModal } from './styles'
import { deleteSnack } from '../../../store/modules/snack/actions'

interface IModalProps {
  open: boolean,
  onClose: () => void,
}

export const ModalSnackDelete = ({ open, onClose }: IModalProps) => {
  // State
  const [deleteSnackLoading, setDeleteSnackLoading] = useState(false)

  // Hook
  const dispatch = useDispatch()
  const history = useHistory()
  const { id: snack_id } = useParams<{ id: string }>()

  const handleOnDelete = () => {
    setDeleteSnackLoading(true)
    dispatch(deleteSnack(snack_id, {
      onFinish: () => {
        setDeleteSnackLoading(false)
        onClose()
        history.push('/home')
      },
      onError: () => setDeleteSnackLoading(false)
    }))
  }

  return (
    <ContainerMainModal open={open}>
      <ContentModal>
        <div className='container_delete'>
          <strong>Deseja realmente excluir o registro da refeição?</strong>

          <div className='container-actions'>
            <Button className='outline' onClick={onClose}>Cancelar</Button>

            {deleteSnackLoading ? (
              <div className='flex-full-center'>
                <Loader />
              </div>
            ) : (
              <Button onClick={handleOnDelete}>Sim, excluir</Button>
            )}
          </div>
        </div>
      </ContentModal>
    </ContainerMainModal>
  )
}