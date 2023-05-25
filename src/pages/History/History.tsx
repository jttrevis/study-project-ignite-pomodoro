import { useContext } from "react"
import { HistoryContainer, HistoryList, Status } from "./styles"
import { CyclesContext } from "../../contexts/CyclesContext"


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
            <tr>
              <td>Task</td>
              <td>20 minutes</td>
              <td>2 months ago</td>
              <td><Status statusColor="green" >Concluded</Status></td>

            </tr>
            <tr> 
              <td>Task</td>
              <td>20 minutes</td>
              <td>2 months ago</td>
              <td><Status statusColor="green">Concluded</Status></td>

            </tr>
            <tr>
              <td>Task</td>
              <td>20 minutes</td>
              <td>2 months ago</td>
              <td><Status statusColor="red">Concluded</Status></td>

            </tr>
            <tr>
              <td>Task</td>
              <td>20 minutes</td>
              <td>2 months ago</td>
              <td><Status statusColor="green">Concluded</Status></td>

            </tr>
            <tr>
              <td>Task</td>
              <td>20 minutes</td>
              <td>2 months ago</td>
              <td><Status statusColor="green">Concluded</Status></td>

            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
