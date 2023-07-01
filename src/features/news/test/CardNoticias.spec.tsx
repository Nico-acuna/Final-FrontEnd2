import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CardNoticias from "../CardNoticias";
import { INoticiasNormalizadas } from "../noticias.contracts";

describe("CardNoticias", () => {
  it("se hace clic en el botón 'Ver más'", async () => {
    const mockNoticias: INoticiasNormalizadas[] = [
      {
        id: 1,
        imagen: "imagen1.jpg",
        titulo: "Noticia 1",
        fecha: "2023-06-26",
        descripcionCorta: "Descripción corta de la noticia 1",
        esPremium: true,
        descripcion:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, sit nostrum culpa sunt eum quidem illo animi, numquam natus tenetur libero sint iusto. Harum molestias minima repellat in porro tenetur!",
      },
      {
        id: 2,
        imagen: "imagen2.jpg",
        titulo: "Noticia 2",
        fecha: "2023-06-27",
        descripcionCorta: "Descripción corta de la noticia 2",
        esPremium: true,
        descripcion:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam quae perferendis ea fugiat voluptates neque vel, accusamus quibusdam dicta voluptate at dolores minus qui quidem impedit numquam a perspiciatis rerum.",
      },
    ];
    const handleClickMock = jest.fn();

    render(
      <CardNoticias noticias={mockNoticias} handelClick={handleClickMock} />
    );

    const botonVerMas = await screen.findAllByText("Ver más");
    userEvent.click(botonVerMas[0]);

    await waitFor(() => {
      expect(handleClickMock).toHaveBeenCalledTimes(1);
    });
    expect(handleClickMock).toHaveBeenCalledWith(mockNoticias[0]);
  });
});
