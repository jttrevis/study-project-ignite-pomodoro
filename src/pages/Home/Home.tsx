import { HandPalm, Play } from "@phosphor-icons/react"
import { useForm, FormProvider } from "react-hook-form"
import { createContext, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { HomeContainer, StartCountdownButton, StopCountdownButton } from "./styles"
import { NewCycleForm } from './components/NewCycleForm/NewCycleForm'
import { Countdown } from './components/Countdown/Countdown'
import * as zod from 'zod';


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
  finishedDate?: Date
}

interface CyclesContextType {
  activeCycle: Cycle | undefined
  activedCycleId: string | null
  amountSecondPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
}

export const CyclesContext = createContext({} as CyclesContextType)

export const Home = () => {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activedCycleId, setActivedCycleId] = useState<string | null>(null)
  const [amountSecondPassed, setAmountSecondPassed] = useState(0)
  



  const activeCycle = cycles.find(cycle => cycle.id === activedCycleId)

  function markCurrentCycleAsFinished(){
    setCycles(state => state.map((cycle) => {
      if(cycle.id === activedCycleId) {
        return {...cycle, finishedDate: new Date()}
      }

      return cycle
    }))
  }

  const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Please enter a task'),
    minutesAmount: zod.number().min(1).max(60)
  })

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  })
  const { handleSubmit, watch, reset} = newCycleForm





  function setSecondsPassed(seconds: number) {
    setAmountSecondPassed(seconds)
  }
  
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
    setCycles(state => state.map((cycle) => {
      if(cycle.id === activedCycleId) {
        return {...cycle, interruptedDate: new Date()}
      }

      return cycle
    }))
    setActivedCycleId(null)
  }

  const task = watch('task')
  const isSubmitButtonDisabled = !task


  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <CyclesContext.Provider value={{activeCycle, activedCycleId, markCurrentCycleAsFinished, amountSecondPassed, setSecondsPassed}}>
        <FormProvider {...newCycleForm}>

          <NewCycleForm/>
        </FormProvider>
          <Countdown/>
        </CyclesContext.Provider>
      {activeCycle ? (
        <StopCountdownButton onClick={handleInterruptCycle} type="button"><HandPalm size={24}/>Stop </StopCountdownButton>
      ) :
      <StartCountdownButton disabled={isSubmitButtonDisabled} type="submit"><Play size={24}/>Start </StartCountdownButton>}
      </form>
    </HomeContainer>
  );
};
