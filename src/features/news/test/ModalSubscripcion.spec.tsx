import { render, screen, waitFor } from "@testing-library/react";
import ModalSubscripcion from "../ModalSubscripcion";
import userEvent from "@testing-library/user-event";

describe("ModalSubscripcion", () => {
  const onCloseMock = jest.fn();
  const onSubscriptionMock = jest.fn();
  it("se hace clic en el botón 'Suscríbete'", async () => {
    render(
      <ModalSubscripcion
        onClose={onCloseMock}
        onSubscription={onSubscriptionMock}
      />
    );

    const buttonSubscribe = screen.getByText("Suscríbete");
    userEvent.click(buttonSubscribe);

    await waitFor(() => {
      expect(onSubscriptionMock).toHaveBeenCalledTimes(1);
    });
  });

  it("se hace clic en el botón de cierre", async () => {
    render(
      <ModalSubscripcion
        onClose={onCloseMock}
        onSubscription={onSubscriptionMock}
      />
    );

    const closeButton = screen.getByAltText("close-button");
    userEvent.click(closeButton);

    await waitFor(() => {
      expect(onCloseMock).toHaveBeenCalledTimes(1);
    });
  });
});
