import { useState } from "react"
import { StatisticInfo } from "../home/styles"
import { IState } from "../../store/utils/types"
import { ISummary } from "../../store/modules/snack/types"
import { useSelector } from "react-redux"
import { ArrowLeft, ArrowUpRight } from "@phosphor-icons/react"
import { getColorRange } from "../../components/utils/getColorRange"
import { ContainerMainHome } from "./styles"
import { useHistory } from "react-router-dom"

export const Summary = () => {
  // Redux
  const summary = useSelector<IState, ISummary>(store => store.fetch_summary)

  // State
  const [fetchSummaryLoading, setFetchSummaryLoading] = useState(false)

  // Hook
  const history = useHistory()

  return (
    <ContainerMainHome>
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
    </ContainerMainHome>
  )
}