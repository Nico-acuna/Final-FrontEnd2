import { INoticias } from "./fakeRest";
export interface INoticiasNormalizadas {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: number | string;
  esPremium: boolean;
  imagen: string;
  descripcionCorta?: string;
}

export interface INoticiasAPI extends INoticias {}

//Definimos las entidades que vamos a utilizar en el componente Noticias
