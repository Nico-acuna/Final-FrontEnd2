import { rest } from "msw";
import { setupServer } from "msw/node";
import { screen, waitFor } from "@testing-library/react";
import Cita from "./Cita";
import { API_URL } from "../../app/constants";
import { render } from "../../test-utils";
import userEvent from "@testing-library/user-event";

const data = [
  {
    quote: "I believe the children are the future... Unless we stop them now!",
    character: "Homer",
    image: "imagen",
    characterDirection: "right",
  },
  {
    quote:
      "I believe the children are the future... Unless we stop them nowThese are my only friends...grown-up nerds like Gore Vidal. And even he's kissed more boys than I ever will.",
    character: "Lisa",
    image: "imagen",
    characterDirection: "right",
  },
];

const validQuery = data.find((q) => q.character);

const handlers = [
  rest.get(`${API_URL}`, (req, res, ctx) => {
    const character = req.url.searchParams.get("character");

    if (character === null) {
      return res(ctx.json([data[1]]), ctx.delay(150));
    }

    if (validQuery) {
      return res(ctx.json([validQuery]));
    }

    return res(ctx.json([]), ctx.delay(150));
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe("Cita", () => {
  describe("Cuando renderizamos el componente", () => {
    it("No deberia mostrar ninguna cita", async () => {
      render(<Cita />);

      expect(
        screen.getByText(/No se encontro ninguna cita/i)
      ).toBeInTheDocument();
    });
  });

  describe("Cuando la query se esta ejecutando", () => {
    it("Deberia mostrar el mensaje de cargando", async () => {
      render(<Cita />);

      const buttonSearch = await screen.findByLabelText(/Obtener Cita/i);
      userEvent.click(buttonSearch);
      await waitFor(() => {
        expect(screen.getByText(/cargando/i)).toBeInTheDocument();
      });
    });
  });

  describe("Cuando ingreso un nombre válido", () => {
    it("Deberia mostrar la cita del personaje", async () => {
      render(<Cita />);

      const input = screen.getByRole("textbox", { name: "Author Cita" });
      const buttonSearch = await screen.findByLabelText(/Obtener Cita/i);
      await userEvent.click(input);
      await userEvent.keyboard("homer");
      await userEvent.click(buttonSearch);

      await waitFor(() => {
        expect(
          screen.getByText(
            /I believe the children are the future... Unless we stop them now!/i
          )
        ).toBeInTheDocument();
      });
    });
  });

  describe("Cuando ingreso un nombre inválido", () => {
    it("Deberia mostrar un mensaje de error", async () => {
      render(<Cita />);

      const input = screen.getByRole("textbox", { name: "Author Cita" });
      const buttonSearch = await screen.findByLabelText(/Obtener Cita/i);
      await userEvent.click(input);
      await userEvent.clear(input);
      await userEvent.keyboard("homdfda");
      userEvent.click(buttonSearch);

      await waitFor(() => {
        expect(
          screen.getByText(/No se encontro ninguna cita/i)
        ).toBeInTheDocument();
      });
    });
  });

  describe("Cuando oprimo el botón borrar", () => {
    it("Deberia borrar la cita", async () => {
      render(<Cita />);

      const input = screen.getByRole("textbox", { name: "Author Cita" });

      await userEvent.click(input);
      await userEvent.clear(input);
      await userEvent.keyboard("homer");

      await waitFor(() => {
        expect(screen.getByDisplayValue("homer")).toBeInTheDocument();
      });

      const buttonDelete = screen.getByLabelText(/Borrar/i);
      await userEvent.click(buttonDelete);

      await waitFor(() => {
        expect(
          screen.getByText(/No se encontro ninguna cita/i)
        ).toBeInTheDocument();
      });
      await waitFor(() => {
        expect(screen.getByDisplayValue("")).toBeInTheDocument();
      });
    });
  });

  describe("Cuando oprimo cita aleatoria", () => {
    it("Deberia traer data en la posición 1", async () => {
      render(<Cita />);

      await waitFor(() => {
        expect(
          screen.getByText(/No se encontro ninguna cita/i)
        ).toBeInTheDocument();
      });
      const buttonDelete = screen.getByLabelText(/Borrar/i);
      await userEvent.click(buttonDelete);

      const buttonSearch = await screen.findByLabelText(
        /Obtener Cita aleatoria/i
      );
      await userEvent.click(buttonSearch);

      await waitFor(() => {
        expect(
          screen.getByText(
            /I believe the children are the future... Unless we stop them nowThese are my only friends...grown-up nerds like Gore Vidal. And even he's kissed more boys than I ever will./i
          )
        ).toBeInTheDocument();
      });
    });
  });
});
