import { useCallback, useEffect, useState } from "react";
import { obtenerNoticias } from "./fakeRest";
import { ContenedorNoticias, ListaNoticias, TituloNoticias } from "./styles";
import { INoticiasNormalizadas } from "./noticias.contracts";
import { toFront } from "./noticias.mapper";
import ModalSubscripcion from "./ModalSubscripcion";
import ModalPremium from "./ModalPremium";
import CardNoticias from "./CardNoticias";

/**
 * @returns {JSX.Element} 
 */

const Noticias = () => {
  const [noticias, setNoticias] = useState<INoticiasNormalizadas[]>([]);
  const [modal, setModal] = useState<INoticiasNormalizadas | null>(null);

  const getModal = useCallback(() => {
    if (!modal) {
      return undefined;
    }
    if (modal?.esPremium) {
      return (
        <ModalSubscripcion
          onClose={() => setModal(null)}
          onSubscription={() =>
            setTimeout(() => {
              alert("Suscripto!");
              setModal(null);
            }, 1000)
          }
        />
      );
    }
    return <ModalPremium {...modal} onClose={() => setModal(null)} />;
  }, [modal]);

  useEffect(() => {
    const obtenerInformacion = async () => {
      const respuesta = await obtenerNoticias();
      const noticiasNormalizadas = toFront(respuesta);
      setNoticias(noticiasNormalizadas);
    };
    obtenerInformacion();
  }, []);

  return (
    <ContenedorNoticias>
      <TituloNoticias>Noticias de los Simpsons</TituloNoticias>
      <ListaNoticias>
        <CardNoticias noticias={noticias} handelClick={setModal} />
        <>{getModal()}</>
      </ListaNoticias>
    </ContenedorNoticias>
  );
};

export default Noticias;