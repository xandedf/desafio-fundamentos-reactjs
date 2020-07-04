import React from 'react';

import { Link, NavLink } from 'react-router-dom';

import { Container } from './styles';

import Logo from '../../assets/logo.svg';

interface HeaderProps {
  size?: 'small' | 'large';
  selected?: string;
}

const Header: React.FC<HeaderProps> = ({
  size = 'large',
  selected,
}: HeaderProps) => (
  <Container size={size}>
    <header>
      <img src={Logo} alt="GoFinances" />
      <nav>
        <NavLink exact to="/" activeStyle={{ fontWeight: 'bold' }}>
          Listagem
          {selected === '/' && <div />}
        </NavLink>
        <NavLink exact to="/import" activeStyle={{ fontWeight: 'bold' }}>
          Importar
          {selected === '/import' && <div />}
        </NavLink>
      </nav>
    </header>
  </Container>
);

export default Header;
