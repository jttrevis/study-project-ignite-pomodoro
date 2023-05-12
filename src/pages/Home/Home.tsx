import { Play } from "@phosphor-icons/react";
import { CountdownCOntainer, FormContainer, HomeContainer, Separator } from "./styles";

export const Home = () => {
  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="task">Working on</label>
          <input id="task" type="text" />

          <label htmlFor="minutesAmount">How long</label>
          <input id="minutesAmount" type="number" />

          <span>Minutes.</span>
        </FormContainer>

        <CountdownCOntainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownCOntainer>

        <button type="submit">Start <Play size={24}/></button>
      </form>
    </HomeContainer>
  );
};
