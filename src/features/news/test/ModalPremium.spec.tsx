import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ModalPremium from "../ModalPremium";

describe("Modal Premium", () => {
  const onCloseMock = jest.fn();
  const image = "imagen";
  const title = "Los Simpson 'predijeron' Escasez De Combustible";
  const description = "descripcion de la noticia";

  it("se hace clic en el botón de cierre", async () => {
    render(
      <ModalPremium
        onClose={onCloseMock}
        imagen={image}
        titulo={title}
        descripcion={description}
      />
    );

    const closeButton = screen.getByAltText("close-button");
    userEvent.click(closeButton);

    await waitFor(() => {
      expect(onCloseMock).toHaveBeenCalledTimes(1);
    });
  });

  it("deberia mostrar el título de la noticia", async () => {
    render(
      <ModalPremium
        onClose={onCloseMock}
        imagen={image}
        titulo={title}
        descripcion={description}
      />
    );

    const findTitle = await screen.findByText(
      "Los Simpson 'predijeron' Escasez De Combustible"
    );

    await waitFor(() => {
      expect(findTitle).toBeInTheDocument();
    });
  });
});
