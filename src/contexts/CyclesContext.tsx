import { createContext, useState } from "react";

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}
interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activedCycleId: string | null
  amountSecondPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interruptCurrentCycle: () => void
}

interface CyclesContextProviderProps {
  children: React.ReactNode
}


export const CyclesContext = createContext({} as CyclesContextType)


export function CyclesContextProvider({children}: CyclesContextProviderProps){
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activedCycleId, setActivedCycleId] = useState<string | null>(null)
  const [amountSecondPassed, setAmountSecondPassed] = useState(0)
  const activeCycle = cycles.find(cycle => cycle.id === activedCycleId)

  function setSecondsPassed(seconds: number) {
    setAmountSecondPassed(seconds)
  }
  
  function markCurrentCycleAsFinished(){
    setCycles(state => state.map((cycle) => {
      if(cycle.id === activedCycleId) {
        return {...cycle, finishedDate: new Date()}
      }

      return cycle
    }))
  }

  function createNewCycle(data : CreateCycleData){
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()

    }

    setCycles((state) =>  [...state, newCycle])
    setActivedCycleId(newCycle.id)
    setAmountSecondPassed(0)
  }

  function interruptCurrentCycle(){
    setCycles(state => state.map((cycle) => {
      if(cycle.id === activedCycleId) {
        return {...cycle, interruptedDate: new Date()}
      } else {
        return cycle
      }
    }))
    setActivedCycleId(null)
  }
  return(
    <CyclesContext.Provider value={{cycles, activeCycle, activedCycleId, markCurrentCycleAsFinished, amountSecondPassed, setSecondsPassed, createNewCycle, interruptCurrentCycle}}>{children}</CyclesContext.Provider>
  )
}