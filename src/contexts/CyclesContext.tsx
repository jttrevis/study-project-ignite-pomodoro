import { createContext, useEffect, useReducer, useState } from "react";
import {  Cycle, cyclesReducer } from "../reducers/cycles/reducer";
import {addNewCycleAction, interruptCycleAction, markCurrentCycleAsFinishedAction } from '../reducers/cycles/actions';
import { differenceInSeconds } from "date-fns";


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
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activedCycleId: null,
  },(initialState) => {
    const storedStateJSON = localStorage.getItem('@ignite-timer:cycles-state-1.0.0')

    if(storedStateJSON){
      return JSON.parse(storedStateJSON)
    }

    return initialState
  })

  const {cycles, activedCycleId} = cyclesState
  const activeCycle = cycles.find(cycle => cycle.id === activedCycleId)
  

  const [amountSecondPassed, setAmountSecondPassed] = useState(() => {
    if(activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }

    return 0
  })

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)

    localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON)
  }, [cyclesState])
  

  function setSecondsPassed(seconds: number) {
    setAmountSecondPassed(seconds)
  }

  function markCurrentCycleAsFinished(){
    dispatch(markCurrentCycleAsFinishedAction())

  }

  function interruptCurrentCycle(){
    dispatch(interruptCycleAction())

  }

  function createNewCycle(data : CreateCycleData){
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()

    }
    dispatch(addNewCycleAction(newCycle))
   
    setAmountSecondPassed(0)
  }
  return(
    <CyclesContext.Provider 
    value={{
      cycles, 
      activeCycle, 
      activedCycleId, 
      markCurrentCycleAsFinished, 
      amountSecondPassed, 
      setSecondsPassed, 
      createNewCycle, 
      interruptCurrentCycle
      }}>
        {children}
      </CyclesContext.Provider>
  )
}