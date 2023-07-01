import { render, screen } from "@testing-library/react";
import Bio from "./Bio";
import userEvent from "@testing-library/user-event";

describe("Bio", () => {
  describe("renders Bio component correctly", () => {
    it("should render 5 buttons correctly", () => {
      render(<Bio />);
      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(5);
    });

    it("should show initial information", () => {
      render(<Bio />);

      const bioImage = screen.getByAltText("Bart Simpson");
      expect(bioImage).toBeInTheDocument();

      const bioName = screen.getByText("Bart Simpson");
      expect(bioName).toBeInTheDocument();

      const bioDescription = screen.getByText(
        "A los diez años, Bart es el hijo mayor y único varón de Homero y Marge, y el hermano de Lisa y Maggie. Los rasgos de carácter más prominentes y populares de Bart son su picardía, rebeldía y falta de respeto a la autoridad."
      );
      expect(bioDescription).toBeInTheDocument();
    });

    it("should update the active bio when a button is clicked", async () => {
      render(<Bio />);

      const lisaButton = screen.getByRole("button", { name: /Lisa/i });
      await userEvent.click(lisaButton);

      const bioImage = screen.getByAltText("Lisa Simpson");
      expect(bioImage).toBeInTheDocument();

      const bioName = screen.getByText("Lisa Simpson");
      expect(bioName).toBeInTheDocument();

      const bioDescription = screen.getByText(/Lisa es vegetariana/i);
      expect(bioDescription).toHaveTextContent(
        "Lisa es vegetariana, una fuerte ecologista, feminista y budista. El personaje de Lisa se transforma muchas veces a lo largo del programa: se convierte en vegetariana en la temporada 7 y se convierte al budismo en la temporada 13. Fuerte liberal y activista por la paz, la igualdad y el medio ambiente, Lisa aboga por una variedad de causas políticas que generalmente la ponen contra la mayoría de la gente en Springfield."
      );
    });
  });
});
