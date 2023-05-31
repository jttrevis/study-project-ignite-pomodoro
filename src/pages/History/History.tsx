import { useContext } from "react"
import { HistoryContainer, HistoryList, Status } from "./styles"
import { CyclesContext } from "../../contexts/CyclesContext"
import {formatDistanceToNow} from 'date-fns'

export const History = () => {

  const {cycles} = useContext(CyclesContext)
  return (
    <HistoryContainer>
      <h1>My history</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Duration</th>
              <th>Start</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
          {cycles.map(cycle => {
            return (
              <tr key={cycle.id}>
              <td>{cycle.task}</td>
              <td>{cycle.minutesAmount}minutes</td>
              <td>{formatDistanceToNow(new Date(cycle.startDate), {
                addSuffix: true
              })}</td>
              <td>
                {cycle.finishedDate && <Status statusColor="green" >Concluded</Status>}
                {cycle.interruptedDate && <Status statusColor="red" >Interruped</Status>}
                {(!cycle.finishedDate && !cycle.interruptedDate ) && <Status statusColor="yellow" >Current</Status>}
              </td>
            </tr>
            )
          })}
           
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
