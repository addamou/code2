// Avoir l'année Model
export const formatAnnee = () => {
  return new Date().getFullYear();
};

//Avoir Model de la Date
export const formatDate = (date) => {
  return new Intl.DateTimeFormat().format(new Date(date));
};

// Avoir Model d'heure
export const formatHeure = () => {
  return new Date().toLocaleTimeString();
};
