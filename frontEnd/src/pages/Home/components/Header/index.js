/* eslint-disable no-nested-ternary */
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Container } from "./styles";

export default function Header({
  hasError,
  qtyContacts,
  qtyOfFilteredContacts,
}) {
  const alignment = hasError
    ? "flex-end"
    : qtyContacts > 0
    ? "space-between"
    : "center";

  return (
    <Container $justifyContent={alignment}>
      {!hasError && qtyContacts > 0 && (
        <strong>
          {qtyOfFilteredContacts}
          {qtyOfFilteredContacts === 1 ? " contato" : " contatos"}
        </strong>
      )}

      <Link to="/new">Novo contato</Link>
    </Container>
  );
}

Header.propTypes = {
  hasError: PropTypes.bool.isRequired,
  qtyContacts: PropTypes.number.isRequired,
  qtyOfFilteredContacts: PropTypes.number.isRequired,
};
