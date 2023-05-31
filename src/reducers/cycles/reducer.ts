import { ActionTypes } from "./actions"
import { produce } from 'immer'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CyclesState {
  cycles: Cycle[]
  activedCycleId: string | null
}





export function cyclesReducer(state: CyclesState, action: any){

  switch(action.type){
    case ActionTypes.ADD_NEW_CYCLE:
      // return {
      //   ...state,
      //   cycles: [...state.cycles, action.payload.newCycle],
      //   activedCycleId: action.payload.newCycle.id,
      // }

      //immer lib
     return produce(state, draft => {
        draft.cycles.push(action.payload.newCycle)
        draft.activedCycleId = action.payload.newCycle.id
      }

      )
     
    case ActionTypes.INTERRUPT_CURRENT_CYCLE:
      // return {
      //   ...state,
      //   cycles: state.cycles.map((cycle) => {
      //     if(cycle.id === state.activedCycleId) {
      //       return {...cycle, interruptedDate: new Date()}
      //     } else {
      //       return cycle
      //     }
      //   }),
      //   activedCycleId: null
      // }


       //immer lib
      const currentCycleIndex = state.cycles.findIndex(cycle => {
        return cycle.id === state.activedCycleId
      })

      if(currentCycleIndex < 0){
        return state
      }

      return produce(state, draft => {
        draft.activedCycleId = null
        draft.cycles[currentCycleIndex].interruptedDate = new Date()
      })
    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:{
      // return {
      //   ...state,
      //   cycles: state.cycles.map((cycle) => {
      //     if(cycle.id === state.activedCycleId) {
      //       return {...cycle, finishedDate: new Date()}
      //     } else {
      //       return cycle
      //     }
      //   }),
      //   activedCycleId: null
      // }

      //immer lib
      const currentCycleIndex = state.cycles.findIndex(cycle => {
        return cycle.id === state.activedCycleId
      })

      if(currentCycleIndex < 0){
        return state
      }

      return produce(state, draft => {
        draft.activedCycleId = null
        draft.cycles[currentCycleIndex].interruptedDate = new Date()
      })
    }
    default:   
      return state
     
  }

}