import PropTypes from "prop-types";
import { forwardRef } from "react";
import Button from "../Button";
import { FormGroup } from "../FormGroup";
import Input from "../Input";
import Select from "../Select";
import { ButtonContainer, Form } from "./styles";
import { useContactForm } from "./useContactForm";

const ContactForm = forwardRef(({ buttonLabel, onSubmit }, ref) => {
  const {
    handleSubmit,
    getErrorMessageByField,
    name,
    handeleNameChange,
    email,
    handleEmailChange,
    isSubmittin,
    categories,
    isFormVAlid,
    phone,
    handlePhoneChange,
    isLoadingCategories,
    categoryId,
    setCategoryId,
  } = useContactForm(onSubmit, ref);
  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup error={getErrorMessageByField("name")}>
        <Input
          error={getErrorMessageByField("name")}
          placeholder="Nome*"
          value={name}
          onChange={handeleNameChange}
          disabled={isSubmittin}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByField("email")}>
        <Input
          type="email"
          error={getErrorMessageByField("email")}
          placeholder="E-mail"
          value={email}
          onChange={handleEmailChange}
          disabled={isSubmittin}
        />
      </FormGroup>

      <FormGroup>
        <Input
          placeholder="Telefone"
          value={phone}
          onChange={handlePhoneChange}
          maxLength="15"
          disabled={isSubmittin}
        />
      </FormGroup>

      <FormGroup isLoading={isLoadingCategories}>
        <Select
          value={categoryId}
          onChange={(event) => setCategoryId(event.target.value)}
          disabled={isLoadingCategories || isSubmittin}
        >
          <option value="">Sem Categoria</option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button type="submit" disabled={!isFormVAlid} isLoading={isSubmittin}>
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </Form>
  );
});

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
