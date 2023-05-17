import * as zod from 'zod'
import { HandPalm, Play } from "@phosphor-icons/react"
import { useForm } from "react-hook-form"
import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { differenceInSeconds} from 'date-fns'
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, StopCountdownButton, TaskInput } from "./styles"

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Please enter a task'),
  minutesAmount: zod.number().min(5).max(60)
})

interface NewCycleFormData {
  task: string
  minutesAmount: number

}

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
}

export const Home = () => {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activedCycleId, setActivedCycleId] = useState<string | null>(null)
  const [amountSecondPassed, setAmountSecondPassed] = useState(0)

  const {register, handleSubmit, watch, reset} = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  })

  const activeCycle = cycles.find(cycle => cycle.id === activedCycleId)

  useEffect(()=> {
    let interval: number
    if(activeCycle){
      interval = setInterval(()=> {
        setAmountSecondPassed(differenceInSeconds(new Date(), activeCycle.startDate))
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle])
  
  function handleCreateNewCycle(data : NewCycleFormData){
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()

    }

    setCycles((state) =>  [...state, newCycle])
    setActivedCycleId(newCycle.id)
    setAmountSecondPassed(0)
    reset()
  }

  function handleInterruptCycle(){
    setCycles(cycles.map(cycle => {
      if(cycle.id === activedCycleId) {
        return {...cycle, interruptedDate: new Date()}
      }

      return cycle
    }))
    setActivedCycleId(null)
  }

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60 )
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(()=> {
    if(activeCycle){
      document.title = `${minutes}:${seconds}`
    }
  },[minutes, seconds, activeCycle])

  const task = watch('task')
  const isSubmitButtonDisabled = !task


  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
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
          <MinutesAmountInput placeholder="00" disabled={!!activeCycle} step={5} min={5} max={60} id="minutesAmount" type="number"
          {...register('minutesAmount', {valueAsNumber: true})}
          
          />

          <span>minutes.</span>
        </FormContainer>

        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

      {activeCycle ? (
        <StopCountdownButton onClick={handleInterruptCycle} type="button"><HandPalm size={24}/>Stop </StopCountdownButton>
      ) :
      <StartCountdownButton disabled={isSubmitButtonDisabled} type="submit"><Play size={24}/>Start </StartCountdownButton>}
      </form>
    </HomeContainer>
  );
};
