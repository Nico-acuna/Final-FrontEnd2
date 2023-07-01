export const capitalizeWords = (title: string) => {
  const capitalizedTitle = title
    .split(" ")
    .map((str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    })
    .join(" ");

  return capitalizedTitle;
};

export const calculateMinutes = (date: Date) => {
  const today = new Date();
  const minutosTranscurridos = Math.floor(
    (today.getTime() - date.getTime()) / 60000
  );
  return minutosTranscurridos;
};

//extraemos dos funciones que podemos utilizar en otros componentes
