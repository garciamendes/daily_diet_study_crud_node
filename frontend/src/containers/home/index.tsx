// React
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'


// Third party
import { format } from 'date-fns'
import { useSelector } from 'react-redux'
import { map, split } from 'lodash'
import { ArrowUpRight, Plus } from '@phosphor-icons/react'

// Project
import LogoImg from '../../static/images/logo.svg'
import { getColorRange } from '../../components/utils/getColorRange'
import { ModaSnackCreateUpdate } from '../../components/modal'
import { IState } from '../../store/utils/types'
import { IUserData } from '../../store/modules/account/types'
import { fetchListSnack } from '../../store/modules/snack/actions'
import { Loader } from '../../components/loader'
import { IListSnack } from '../../store/modules/snack/types'

// Local
import {
  Avatar,
  Button,
  ContainerInfoListSnack,
  ContainerMainHome,
  ContentSnack,
  LabelColorSnack,
  StatisticInfo
} from './styles'

export const Home = () => {
  // Redux
  const { results, dietPercent } = useSelector<IState, IListSnack>(store => store.fetch_list_snack)

  // State
  const [showModal, setShowModal] = useState(false)

  const [fetchListSnackLoading, setFetchListSnackLoading] = useState(false)
  const [userData, setUserDate] = useState({ name: '' })

  // Hook
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    handleFetchSummaryAndListSnacks()
    // return () => { dispatch(clearListSnack())}
  }, [])

  useEffect(() => {
    const userString = sessionStorage.getItem('user') ?? ''
    const user: IUserData = JSON.parse(userString)
    let initialName = split(user.name, '')

    if (!initialName[0] || !initialName[1])
      setUserDate({ name: '#' })
    else
      setUserDate({ name: `${initialName[0]}${initialName[1]}`.toUpperCase() })
  }, [])

  const handleFetchSummaryAndListSnacks = () => {
    setFetchListSnackLoading(true)
    dispatch(fetchListSnack(() => setFetchListSnackLoading(false)))
  }

  const handleLogout = () => {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('user')
    history.push('/login')
  }

  return (
    <ContainerMainHome>
      <ModaSnackCreateUpdate
        open={showModal}
        isUpdate={false}
        fetch={handleFetchSummaryAndListSnacks}
        onClose={() => setShowModal(false)} />

      <div className='content_main'>
        <header>
          <img src={LogoImg} alt='Logo' />

          <div className='content_logout_avatar'>
            <span className='cursor-pointer' onClick={handleLogout}>Sair</span>
            <Avatar>
              {userData.name ?? '#'}
            </Avatar>
          </div>
        </header>

        <StatisticInfo
          textColor={getColorRange(dietPercent ?? null)?.textColor}
          bgColor={getColorRange(dietPercent ?? null)?.bgColor}
          iconColor={getColorRange(dietPercent ?? null)?.iconColor}>
          {fetchListSnackLoading ? (
            <div className='flex-full-center'>
              <Loader />
            </div>
          ) : (
            <>
              <ArrowUpRight
                onClick={(event) => {
                  event.stopPropagation()
                  history.push('/snack/summary')
                }}
                className='icon-nav-summary'
                size={25} />
              <h1>{dietPercent ? `${dietPercent}%` : '---'}</h1>
              <p>das refeições dentro da dieta</p>
            </>
          )}
        </StatisticInfo>

        <div className='add_more_snack'>
          <span>Refeições</span>
          <Button onClick={() => setShowModal(true)}>
            <Plus size={25} />
            Nova refeição
          </Button>
        </div>

        <ContainerInfoListSnack>
          {fetchListSnackLoading ? (
            <div className='flex-full-center'>
              <Loader />
            </div>
          ) : (
            map(results, (snacks, index) => {
              return (
                <div className='content_snack_by_date'>
                  <strong className='title_date'>{format(new Date(index), 'dd.MM.yy')}</strong>
                  {map(snacks, (item) => {
                    const itemHour = new Date()
                    const [hour, minute] = item.hour.split(':')
                    itemHour.setHours(parseInt(hour, 10), parseInt(minute, 10), 0, 0)

                    return (
                      <ContentSnack onClick={(event) => {
                        event.stopPropagation()
                        history.push(`/snack/${item.id}`)
                      }}>
                        <strong className='hours'>{format(itemHour, 'HH:MM')}</strong>
                        <div className='content_name_snack_and_label'>
                          <span className='title_snack'>{item.name}</span>
                          <LabelColorSnack bgColor={item.is_diet ? '#639339' : '#BF3B44'}></LabelColorSnack>
                        </div>
                      </ContentSnack>
                    )
                  })}
                </div>
              )
            })
          )}
        </ContainerInfoListSnack>
      </div>
    </ContainerMainHome>
  )
}