import PropTypes from "prop-types";
import useAnimatedUnmount from "../../hooks/useAnimatedUnmount";
import Button from "../Button";
import ReactPortal from "../ReactPortal";
import { Container, Footer, Overlay } from "./styles";

export function Modal({
  danger = false,
  visible,
  title,
  children,
  cancelLabel = "Cancelar",
  confirmLabel = "Confimar",
  OnCancel,
  OnConfirm,
  isLoading = false,
}) {
  const { shouldRender, animatedElementRed } = useAnimatedUnmount(visible);

  if (!shouldRender) {
    return null;
  }

  return (
    <ReactPortal containerId="modal-root">
      <Overlay ref={animatedElementRed} $isLeaving={!visible}>
        <Container danger={danger} $isLeaving={!visible}>
          <h1>{title}</h1>
          <div className="modal-body">{children}</div>

          <Footer>
            <button
              type="button"
              className="cancel-button"
              onClick={OnCancel}
              disabled={isLoading}
            >
              {cancelLabel}
            </button>

            <Button
              type="button"
              danger={danger}
              onClick={OnConfirm}
              disabled={isLoading}
              isLoading={isLoading}
            >
              {confirmLabel}
            </Button>
          </Footer>
        </Container>
      </Overlay>
    </ReactPortal>
  );
}

Modal.propTypes = {
  danger: PropTypes.bool,
  isLoading: PropTypes.bool,
  visible: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  cancelLabel: PropTypes.string,
  confirmLabel: PropTypes.string,
  OnCancel: PropTypes.func.isRequired,
  OnConfirm: PropTypes.func.isRequired,
};
