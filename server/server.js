const express = require("express");
const connectDB = require("./configuration/db");
const path = require("path");
require("dotenv").config();
const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());

// Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/accueil", require("./routes/api/accueil"));
//
//avisHospitalisation
app.use(
  "/api/avishospitalisation",
  require("./routes/api/avisHospitalisation")
);

//bulletinExamen
app.use("/api/bulletinexamen", require("./routes/api/bulletinExamen"));

//billetDeSortie
app.use("/api/bulletinsortie", require("./routes/api/bulletinDeSortie"));

//certificatAccouchement
app.use(
  "/api/certificataccouchement",
  require("./routes/api/certificatAccouchement")
);

//certificatGrossesse
app.use(
  "/api/certificatgrossesse",
  require("./routes/api/certificatGrossesse")
);

//certificatVisiteMedicale
app.use(
  "/api/certificatvisitemedicale",
  require("./routes/api/certificatVisiteMedicale")
);

//certificatVisiteContreVisite
app.use(
  "/api/certificatvisitecontrevisite",
  require("./routes/api/certificatVisiteContreVisiteMedicale")
);

//certificatMedical
app.use("/api/certificatmedical", require("./routes/api/certificatMedical"));

//Compte rendu d'accouchement
app.use("/api/cra", require("./routes/api/compteRenduAccouchement"));

//compteRenduHospitalisation
app.use(
  "/api/compterenduhospitalisation",
  require("./routes/api/compteRenduHospitalisation")
);

//contact Nous pour le site internet Routes
app.use("/api/contact", require("./routes/api/contactRoute"));

//consultation Pediatrique
app.use("/api/pediatrique", require("./routes/api/consultationPediatrique"));

//consultation Generale
app.use("/api/generale", require("./routes/api/consultationGenerale"));

//Consultation imagerie
app.use("/api/imagerie", require("./routes/api/imagerie"));

//decharge
app.use("/api/decharge", require("./routes/api/decharge"));

//Documents Administratif
app.use("/api/document", require("./routes/api/documentAdmin"));

//Dossier médical
app.use("/api/dossier", require("./routes/api/dossierMedical"));

//echograhieAbdominale
app.use(
  "/api/echographieabdominale",
  require("./routes/api/echographieAbdominale")
);

//echoVesicoProstatique
app.use(
  "/api/echovesicoprostatique",
  require("./routes/api/echoVesicoProstatique")
);

//infirmiere
app.use("/api/fichetemperature", require("./routes/api/FicheTemperature"));

//Journal du Caisse
app.use("/api/caisse", require("./routes/api/rapportCaisse"));

//Tableau pour l'Accueil
app.use("/api/reception", require("./routes/api/tableauAccueil"));

// Tableau des Medecins
app.use("/api/medecins", require("./routes/api/tableauMedecins"));

// Fiche de Labo
app.use("/api/fichenumeration", require("./routes/api/ficheNumerationRoute"));

//Modules
app.use("/api/module", require("./routes/api/module"));

//offres de services
app.use("/api/offre", require("./routes/api/Offres"));

//ordonnance
app.use("/api/ordonnance", require("./routes/api/ordonnance"));

// patient Routes
app.use("/api/patient", require("./routes/api/patient"));

//Rapport du Financier
app.use("/api/finance", require("./routes/api/rapportFinancier"));

//Rapport des Medecins
app.use("/api/rapportmedecin", require("./routes/api/rapportMedecin"));
//soinsUrgence
app.use("/api/soinsurgence", require("./routes/api/soinsUrgence"));

//Stockage Management
app.use("/api/stock", require("./routes/api/stockRoute"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
