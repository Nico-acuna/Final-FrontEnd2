import {
  ContenedorModal,
  TarjetaModal,
  CloseButton,
  ImagenModal,
  CotenedorTexto,
  TituloModal,
  DescripcionModal,
} from "./styles";
import { CloseButton as Close } from "../../assets";

interface IModalPremiumProps {
  onClose: () => void;
  imagen: string;
  titulo: string;
  descripcion: string;
}

/**
 * componente para mostrar el modal premium
 * @param {Object} props
 * @param {string} props.image - URL imagen personaje.
 * @param {string} props.titulo - Titulo noticia.
 * @param {string} props.descripcion - Descripción de la noticia.
 * @param {funtion} props.onClose - Manejador de cierre del modal.
 * @returns {JSX.Element} - Elemento JSX del modal premium.
 */


const ModalPremium = ({
  onClose,
  imagen,
  titulo,
  descripcion,
}: IModalPremiumProps) => {
  return (
    <ContenedorModal data-testid="modal">
      <TarjetaModal>
        <CloseButton onClick={onClose}>
          <img src={Close} alt="close-button" />
        </CloseButton>
        <ImagenModal src={imagen} alt="news-image" />
        <CotenedorTexto>
          <TituloModal>{titulo}</TituloModal>
          <DescripcionModal>{descripcion}</DescripcionModal>
        </CotenedorTexto>
      </TarjetaModal>
    </ContenedorModal>
  );
};

export default ModalPremium;
