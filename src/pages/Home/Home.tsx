import { HandPalm, Play } from "@phosphor-icons/react"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { HomeContainer, StartCountdownButton, StopCountdownButton } from "./styles"
import { NewCycleForm } from './components/NewCycleForm/NewCycleForm'
import { Countdown } from './components/Countdown/Countdown'
import * as zod from 'zod';
import { useContext } from "react"
import { CyclesContext } from "../../contexts/CyclesContext"


interface NewCycleFormData {
  task: string
  minutesAmount: number

}
export const Home = () => {
  const {activeCycle , createNewCycle, interruptCurrentCycle} = useContext(CyclesContext)

  const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(5, 'Please enter a task'),
    minutesAmount: zod.number().min(5).max(60)
  })

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  })
  const { handleSubmit, watch, reset} = newCycleForm

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data)
    reset()
  }

  const task = watch('task')
  const isSubmitButtonDisabled = !task


  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormProvider {...newCycleForm}>
          <NewCycleForm/>
        </FormProvider>
          <Countdown/>
      {activeCycle ? (
        <StopCountdownButton onClick={interruptCurrentCycle} type="button"><HandPalm size={24}/>Stop </StopCountdownButton>
      ) :
      <StartCountdownButton disabled={isSubmitButtonDisabled} type="submit"><Play size={24}/>Start </StartCountdownButton>}
      </form>
    </HomeContainer>
  );
};
