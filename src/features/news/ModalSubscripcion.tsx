import {
  BotonSuscribir,
  CloseButton,
  ContenedorModal,
  CotenedorTexto,
  DescripcionModal,
  ImagenModal,
  TarjetaModal,
  TituloModal,
} from "./styles";
import { SuscribeImage, CloseButton as Close } from "../../assets";

interface IModalSubscripcionProps {
  onClose: () => void;
  onSubscription: () => void;
}

/**
 * componente para mostrar el modal de subscripción
 * @param {Object} props
 * @param {funtion} props.onClose - Manejador de cierre del modal.
 * @param {funtion} props.onSubscription - Manejador.
 * @returns {JSX.Element} - Elemento JSX del modal.
 */

const ModalSubscripcion = ({
  onClose,
  onSubscription,
}: IModalSubscripcionProps) => {
  return (
    <ContenedorModal data-testid="modal">
      <TarjetaModal>
        <CloseButton onClick={onClose}>
          <img src={Close} alt="close-button" />
        </CloseButton>
        <ImagenModal src={SuscribeImage} alt="mr-burns-excelent" />
        <CotenedorTexto>
          <TituloModal>Suscríbete a nuestro Newsletter</TituloModal>
          <DescripcionModal>
            Suscríbete a nuestro newsletter y recibe noticias de nuestros
            personajes favoritos.
          </DescripcionModal>
          <BotonSuscribir onClick={onSubscription}>Suscríbete</BotonSuscribir>
        </CotenedorTexto>
      </TarjetaModal>
    </ContenedorModal>
  );
};

export default ModalSubscripcion;
