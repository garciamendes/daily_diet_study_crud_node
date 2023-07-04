// React
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"

// Third party
import { ArrowLeft } from "@phosphor-icons/react"

// Project
import { StatisticInfo } from "../home/styles"
import { IState } from "../../store/utils/types"
import { ISummary } from "../../store/modules/snack/types"
import { getColorRange } from "../../components/utils/getColorRange"

// Local
import { ContainerMainHome } from "./styles"
import { useDispatch } from "react-redux"
import { fetchSummary } from "../../store/modules/snack/actions"
import { Loader } from "../../components/loader"

export const Summary = () => {
  // Redux
  const summary = useSelector<IState, ISummary>(store => store.fetch_summary)

  // State
  const [fetchSummaryLoading, setFetchSummaryLoading] = useState(false)

  // Hook
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    setFetchSummaryLoading(true)
    dispatch(fetchSummary(() => setFetchSummaryLoading(false)))
  }, [])

  return (
    <ContainerMainHome>
      {fetchSummaryLoading ? (
        <div className='flex-full-center'>
          <Loader />
        </div>
      ) : (
        <>
          <StatisticInfo
            className='by-page-detail'
            textColor={getColorRange(summary.dietPercent ?? null)?.textColor}
            bgColor={getColorRange(summary.dietPercent ?? null)?.bgColor}
            iconColor={getColorRange(summary.dietPercent ?? null)?.iconColor}>

            <ArrowLeft
              onClick={() => history.goBack()}
              className='icon-nav-summary by-page-detail-icon'
              size={25} />
            <h1>{summary.dietPercent ? `${summary.dietPercent}%` : '---'}</h1>
            <strong>das refeições dentro da dieta</strong>
          </StatisticInfo>

          <div className='container_main'>
            <strong>Estatísticas gerais</strong>

            <StatisticInfo className='info_detail_summary'>
              <strong>{summary.dietSequence ?? '---'}</strong>
              melhor sequência de pratos dentro da dieta
            </StatisticInfo>

            <StatisticInfo className='info_detail_summary'>
              <strong>{summary.totalSnack ?? '---'}</strong>
              refeições registradas
            </StatisticInfo>

            <div className='content_snacks_diet_and_not_diet'>
              <StatisticInfo className='info_detail_summary diet'>
                <strong>{summary.dietCount ?? '---'}</strong>
                refeições dentro da dieta
              </StatisticInfo>

              <StatisticInfo className='info_detail_summary no_diet'>
                <strong>{summary.noDietCount ?? '---'}</strong>
                refeições fora da dieta
              </StatisticInfo>
            </div>
          </div>
        </>
      )}
    </ContainerMainHome>
  )
}