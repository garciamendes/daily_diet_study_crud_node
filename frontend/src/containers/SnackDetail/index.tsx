// React
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { useDispatch } from "react-redux"

// Third party
import { format } from "date-fns"
import { ArrowLeft, PencilSimpleLine, Trash } from "@phosphor-icons/react"

// Project
import { IState } from "../../store/utils/types"
import { Loader } from "../../components/loader"
import { Button, StatisticInfo } from "../home/styles"
import { ISnack } from "../../store/modules/snack/types"
import { ModalSnackCreateUpdate } from "../../components/modal/create-update-snack"
import { clearDetailSnack, fetchDetailSnack } from "../../store/modules/snack/actions"

// Local
import { ContainerDetailSnack, LabelInfo } from "./styles"
import { isNull } from "lodash"
import { ModalSnackDelete } from "../../components/modal/delete-snack"

export const SnackDetail = () => {
  // Redux
  const detail_snack = useSelector<IState, ISnack>(store => store.fetch_detail_snack)

  // State
  const [showModal, setShowModal] = useState(false)
  const [showModalDelete, setShowModalDelete] = useState(false)
  const [fetchDetailSnackLoading, setFetchDetailSnackLoading] = useState(false)
  const [hourDetail, sethourDetail] = useState<null | Date>(null)

  // Hook
  const { id: snack_id } = useParams<{ id: string }>()
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    setFetchDetailSnackLoading(true)
    dispatch(fetchDetailSnack(snack_id, {
      onFinish: (response) => {
        const data: ISnack = response?.data
        const itemHour = new Date()
        const [hour, minute] = data.hour.split(':')
        itemHour.setHours(parseInt(hour, 10), parseInt(minute, 10), 0, 0)
        sethourDetail(itemHour)
        setFetchDetailSnackLoading(false)
      },
      onError: () => setFetchDetailSnackLoading(false)
    }))

    // return () => { dispatch(clearDetailSnack()) }
  }, [snack_id])

  return (
    <ContainerDetailSnack>
      {fetchDetailSnackLoading ? (
        <div className='flex-full-center margin-top-1-rem'>
          <Loader />
        </div>
      ) : (
        <>
          <ModalSnackCreateUpdate
            open={showModal}
            isUpdate
            onClose={() => setShowModal(false)} />

          <ModalSnackDelete
            open={showModalDelete}
            onClose={() => setShowModalDelete(false)} />

          <StatisticInfo
            className='by-detail_snack by-page-detail'
            textColor={'var(--gray-1)'}
            bgColor={!detail_snack?.is_diet ? 'var(--red-mid)' : 'var(--green-mid)'}
            iconColor={!detail_snack?.is_diet ? 'var(--red-dark)' : 'var(--green-dark)'}>

            <ArrowLeft
              onClick={() => history.goBack()}
              className='icon-nav-summary by-page-detail-icon'
              size={25} />
            <strong>Refeição</strong>
          </StatisticInfo>

          <div className='container_main detail_snack'>
            <h1>{detail_snack?.name}</h1>
            <p>{detail_snack?.description}</p>

            <strong className='content_info_time'>Data e hora</strong>
            {isNull(detail_snack.date) || isNull(hourDetail) ? (
              <span>--- às ---</span>
            ) : (
              <span>{format(new Date(detail_snack?.date), 'dd/MM/yyyy')} às {!isNull(hourDetail) && format(hourDetail, 'HH:MM')}</span>
            )}

            <LabelInfo bgColor={!detail_snack?.is_diet ? 'var(--red-dark)' : 'var(--green-dark)'}>
              <span className='color_render'></span>
              <p>{detail_snack.is_diet ? 'Dentro da dieta' : 'Fora da dieta'}</p>
            </LabelInfo>

            <div className='content_actions'>
              <Button onClick={() => setShowModal(true)}>
                <PencilSimpleLine size={25} />
                Editar refeição
              </Button>

              <Button className='outline' onClick={() => setShowModalDelete(true)}>
                <Trash size={25} />
                Excluir refeição
              </Button>
            </div>

          </div>
        </>
      )}
    </ContainerDetailSnack>
  )
}