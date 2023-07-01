import { render, screen } from "@testing-library/react";
import Noticias from "../Noticias";
import * as fakeRest from "./../fakeRest";
import userEvent from "@testing-library/user-event";

describe("Noticias", () => {
  it("muestra el título 'Noticias de los Simpsons'", async () => {
    render(<Noticias />);
    expect(
      await screen.findByText("Noticias de los Simpsons")
    ).toBeInTheDocument();
  });

  it("no muestra el modal inicialmente", () => {
    render(<Noticias />);
    const modal = screen.queryByTestId("modal");
    expect(modal).toBeNull();
  });

  it("esperar para obtener informacion", async () => {
    jest.spyOn(fakeRest, "obtenerNoticias");
    (fakeRest.obtenerNoticias as jest.Mock).mockImplementation(() => {
      return [
        {
          id: 1,
          titulo: "Noticia 1",
          descripcion: "Descripción de la noticia 1",
          fecha: new Date("2023-06-28"),
          esPremium: false,
          imagen: "imagen1.jpg",
        },
        {
          id: 2,
          titulo: "Noticia 2",
          descripcion: "Descripción de la noticia 2",
          fecha: new Date("2023-06-27"),
          esPremium: true,
          imagen: "imagen2.jpg",
        },
      ];
    });
    render(<Noticias />);
    expect(await screen.findByText("Noticia 1")).toBeInTheDocument();
    expect(await screen.findByText("Noticia 2")).toBeInTheDocument();
  });

  it("mostrar modal premium", async () => {
    jest.spyOn(fakeRest, "obtenerNoticias");
    (fakeRest.obtenerNoticias as jest.Mock).mockImplementation(() => {
      return [
        {
          id: 1,
          titulo: "Noticia 1",
          descripcion: "Descripción de la noticia 1",
          fecha: new Date("2023-06-28"),
          esPremium: false,
          imagen: "imagen1.jpg",
        },
        {
          id: 2,
          titulo: "Noticia 2",
          descripcion: "Descripción de la noticia 2",
          fecha: new Date("2023-06-27"),
          esPremium: true,
          imagen: "imagen2.jpg",
        },
      ];
    });
    render(<Noticias />);
    const buttons = await screen.findAllByRole("button", { name: /Ver más/i });
    const firstButton = buttons[0];

    await userEvent.click(firstButton);

    expect(await screen.findByTestId("modal")).toBeInTheDocument();
  });

  it("mostrar modal subscripcion", async () => {
    jest.spyOn(fakeRest, "obtenerNoticias");
    (fakeRest.obtenerNoticias as jest.Mock).mockImplementation(() => {
      return [
        {
          id: 1,
          titulo: "Noticia 1",
          descripcion: "Descripción de la noticia 1",
          fecha: new Date("2023-06-28"),
          esPremium: false,
          imagen: "imagen1.jpg",
        },
        {
          id: 2,
          titulo: "Noticia 2",
          descripcion: "Descripción de la noticia 2",
          fecha: new Date("2023-06-27"),
          esPremium: true,
          imagen: "imagen2.jpg",
        },
      ];
    });
    render(<Noticias />);
    const buttons = await screen.findAllByRole("button", { name: /Ver más/i });
    const secondButton = buttons[1];

    await userEvent.click(secondButton);

    expect(await screen.findByTestId("modal")).toBeInTheDocument();
  });
});
