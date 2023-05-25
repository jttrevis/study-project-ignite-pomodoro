import { useContext } from "react"
import { FormContainer, MinutesAmountInput, TaskInput } from "./styles"

import { useFormContext} from 'react-hook-form'
import { CyclesContext } from "../../../../contexts/CyclesContext"

export const NewCycleForm = () => {
  const {activeCycle} = useContext(CyclesContext)
  const {register} = useFormContext()

  return (
    <FormContainer>
    <label htmlFor="task">Working on</label>
    <TaskInput
      placeholder="Name of your project" 
      id="task" 
      list="task-suggestions"
      disabled={!!activeCycle}
      type="text"
      {...register('task')}

    />

    <datalist id="task-suggestions">
      <option value="Project 1"/>
      <option value="Project 2"/>
      <option value="Project 3"/>
      <option value="Project 4"/>
      <option value="Project 5"/>
    </datalist>

    <label htmlFor="minutesAmount">how long</label>
    <MinutesAmountInput placeholder="00" disabled={!!activeCycle} step={5} min={1} max={60} id="minutesAmount" type="number"
    {...register('minutesAmount', {valueAsNumber: true})}
    
    />

    <span>minutes.</span>
  </FormContainer>
  )
}
