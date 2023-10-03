import { Loader } from "../../components/Loader";
import { Modal } from "../../components/Modal";
import ContactsList from "./components/ContactsList";
import EmptyList from "./components/EmptyList";
import ErrorStatus from "./components/ErrorStatus";
import Header from "./components/Header";
import InputSearch from "./components/InputSearch";
import SearchNotFound from "./components/SerachNotFound";
import { Container } from "./styles";
import { useHome } from "./useHome";

export function Home() {
  const {
    isLoading,
    isLoadingDelete,
    isDeleteModalVisible,
    contactBeingDeleted,
    contacts,
    searchTerm,
    hasError,
    filteredContacts,
    orderBy,
    handleDeleteContact,
    handleChangeSearchTerm,
    handleTryAgain,
    handleCloseDeleteContact,
    handleConfirmDeleteContact,
    handleToggleOrderBy,
  } = useHome();

  const hasContacts = contacts.length > 0;
  const isListEmpty = !hasError && !isLoading && !hasContacts;
  const isSearchEmpty = !hasError && hasContacts && filteredContacts.length < 1;

  return (
    <Container>
      <Loader isLoading={isLoading} />

      {hasContacts && (
        <InputSearch value={searchTerm} onChange={handleChangeSearchTerm} />
      )}
      <Header
        hasError={hasError}
        qtyContacts={contacts.length}
        qtyOfFilteredContacts={filteredContacts.length}
      />

      {hasError && <ErrorStatus onTryAgain={handleTryAgain} />}

      {isListEmpty && <EmptyList />}

      {isSearchEmpty && <SearchNotFound searchTerm={searchTerm} />}

      {hasContacts && (
        <ContactsList
          filteredContacts={filteredContacts}
          orderBy={orderBy}
          onToggleOrderBy={handleToggleOrderBy}
          onDeleteContact={handleDeleteContact}
        />
      )}
      <Modal
        danger
        isLoading={isLoadingDelete}
        visible={isDeleteModalVisible}
        title={`Tem certeza que deseja
        remover o contato "${contactBeingDeleted?.name}"?`}
        confirmLabel="Deletar"
        OnCancel={handleCloseDeleteContact}
        OnConfirm={handleConfirmDeleteContact}
      >
        <p>Esta ação não poderá ser desfeita!</p>
      </Modal>
    </Container>
  );
}
