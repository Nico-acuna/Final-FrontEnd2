import { INoticiasNormalizadas } from "./noticias.contracts";
import {
  TarjetaNoticia,
  ImagenTarjetaNoticia,
  TituloTarjetaNoticia,
  FechaTarjetaNoticia,
  DescripcionTarjetaNoticia,
  BotonLectura,
} from "./styles";

export interface ICardNoticias {
  noticias: INoticiasNormalizadas[];
  handelClick: (n: INoticiasNormalizadas) => void;
}

/**
 * Componente para mostrar.
 * @param {noticia[]} props.noticias - Array de objetos que muestra
 * @param {number} props.noticias[].id - id
 * @param {string} props.noticias[].titulo - titulo 
 * @param {string} props.noticias[].descripcion - descripcion 
 * @param {(number|string)} props.noticias[].fecha - fecha 
 * @param {boolean} props.noticias[].esPremium - booleano que determina si es premium
 * @param {string} props.noticias[].imagen - imagen 
 * @param {descripcionCorta} props.noticias[].[descripcionCorta] - descripcion resumida 
 * @param {function} props.handelClick - función para ver más información 
 * @returns {JSX.Element} - Elemento JSX del listado
 */

const CardNoticias = ({ noticias, handelClick }: ICardNoticias) => {
  return (
    <>
      {noticias.map((n) => (
        <TarjetaNoticia key={n.id}>
          <ImagenTarjetaNoticia src={n.imagen} />
          <TituloTarjetaNoticia>{n.titulo}</TituloTarjetaNoticia>
          <FechaTarjetaNoticia>{n.fecha}</FechaTarjetaNoticia>
          <DescripcionTarjetaNoticia>
            {n.descripcionCorta}
          </DescripcionTarjetaNoticia>
          <BotonLectura onClick={() => handelClick(n)}>Ver más</BotonLectura>
        </TarjetaNoticia>
      ))}
    </>
  );
};

export default CardNoticias;
