import { createContext, useReducer, useState } from "react";

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
  const [cycles, dispatch] = useReducer((state: Cycle[], action: any) => {


    if(action.type === 'ADD_NEW_CYCLE') {
      return [...state, action.payload.newCylce]
    }
    
    return state
  }, [])


  const [activedCycleId, setActivedCycleId] = useState<string | null>(null)
  const [amountSecondPassed, setAmountSecondPassed] = useState(0)

  const activeCycle = cycles.find(cycle => cycle.id === activedCycleId)

  function setSecondsPassed(seconds: number) {
    setAmountSecondPassed(seconds)
  }

  
  function markCurrentCycleAsFinished(){

    dispatch({
      type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
      payload: {
        activedCycleId
      }
    })
    // setCycles(state => state.map((cycle) => {
    //   if(cycle.id === activedCycleId) {
    //     return {...cycle, finishedDate: new Date()}
    //   }

    //   return cycle
    // }))
  }



  function interruptCurrentCycle(){
    dispatch({
      type: 'INTERRUPT_CURRENT_CYCLE',
      payload: {
        activedCycleId
      }
    })

    // setCycles(state => state.map((cycle) => {
    //   if(cycle.id === activedCycleId) {
    //     return {...cycle, interruptedDate: new Date()}
    //   } else {
    //     return cycle
    //   }
    // }))
    setActivedCycleId(null)
  }



  function createNewCycle(data : CreateCycleData){
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()

    }

    // setCycles((state) =>  [...state, newCycle])
    dispatch({
      type: 'ADD_NEW_CYCLE',
      payload: {
        newCycle
      }
    })
    setActivedCycleId(newCycle.id)
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