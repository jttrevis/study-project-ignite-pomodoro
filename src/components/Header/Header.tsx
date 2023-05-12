import { HeaderContainer } from "./styles"
import logo from '../../assets/Logo.svg'
import { NavLink } from 'react-router-dom'
import { Timer, Scroll } from "@phosphor-icons/react"
export const Header = () => {
  return (
    <HeaderContainer>
      <img src={logo} alt="" />
      <nav>
        <NavLink to="/" ><Timer  size={24}/></NavLink>
        <NavLink to="/history"><Scroll size={24}/></NavLink>
      </nav>
    </HeaderContainer>
  )
}
