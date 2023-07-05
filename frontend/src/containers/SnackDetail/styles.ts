// Third party
import styled from 'styled-components'

// Project
import { ContainerMainHome } from '../summary/styles'
import { IStatistic } from '../home/styles'

export const ContainerDetailSnack = styled(ContainerMainHome)`

  .by-detail_snack {
    strong {
      font-size: 1.6rem !important;
    }
  }

  .detail_snack {
    display: flex;
    align-items: flex-start !important;

    .content_info_time {
      font-size: 1.3rem !important;
      margin-top: 1.3rem;
    }


    .content_actions {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      width: 100%;
      gap: 10px;
      flex: 1;
    }
  }
`

export const LabelInfo = styled.div<Pick<IStatistic, 'bgColor'>>`
  display: flex;
  align-items: center;
  gap: 13px;
  border-radius: 50px;
  padding: .4rem 2rem;
  background: var(--gray-7);
  margin-top: 1rem;

  .color_render {
    height: 10px;
    width: 10px;
    border-radius: 50px;
    background: ${props => props.bgColor ?? 'var(--gray-1)'};
  }
`