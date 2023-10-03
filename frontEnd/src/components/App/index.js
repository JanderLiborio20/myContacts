import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Router } from "../../Router";
import GlobalStyled from "../../assets/styles/global";
import defaultThem from "../../assets/styles/themes/default";
import { Header } from "../Header";
import { ToastContainer } from "../Toast/ToastContainer";
import { Container } from "./styles";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultThem}>
        <GlobalStyled />
        <ToastContainer />

        <Container>
          <Header />
          <Router />
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
