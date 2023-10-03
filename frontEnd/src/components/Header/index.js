import { Container } from './styles';

import logo from '../../assets/images/logo.svg';

export function Header() {
  return (
    <Container>
      <img src={logo} alt="MyContactss" width={201} />
    </Container>
  );
}
