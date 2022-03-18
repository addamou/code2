import React from "react";
import Modale from "./Modale";

export const ModeEmploi = ({ close }) => {
  return (
    <Modale close={close}>
      <div
        className='bg-light text-capitalize text-justify'
        style={{ width: "55vw", padding: 80 }}
      >
        <header className='fs-2 text-uppercase text-center text-decoration-underline fw-bold mb-2'>
          Mode d'emploi Gestion de Stock
        </header>
        <main>
          <h4>Introduction</h4>
          <p>
            Cette application est la résultante du fiche de Stock utilisé par la
            clinique. La seule difference est que celle ci est électronique et
            l'autre manuscrite. Vous devrez juste suivre les indications et tous
            marchera comme sur des roulettes.
          </p>
          <p>
            Le fonctionnement de cette fiche electronique est de cinq (5)
            étapes.
          </p>
          <p>
            <ul>
              <li>FORMULAIRE D'AJOUT DU PRODUIT</li>
              <li>FORMULAIRE D'ENTRER DE STOCK</li>
              <li>FORMULAIRE DE SORTIE DE STOCK</li>
              <li>LISTE DES PRODUITS EN STOCK</li>
              <li>FORMULAIRE DE RECHERCHE D'INFORMATION SUR LES PRODUITS</li>
            </ul>
          </p>
          <div className=' fw-5'>
            <h5>Formulaire d'ajout ou sortie de Produit</h5>
            <p>
              pour ajouter un produit, vous allez cliqué sur le bouton gris.
              après, il suffit juste de remplir les champs et de valider.
            </p>
            <h5>FORMULAIRE D'ENTRER DE STOCK</h5>
            <p>
              A ce niveau vous avez déjà crée des produits, vous allez juste
              cliqué sur le champ description et choisir le produit à la quelle
              vous voulez ajouter des entrées ou sorties et completer le reste
              de champ et valider
            </p>
            <h5>LISTE DES PRODUITS EN STOCK</h5>
            <p>
              cette volet est importante consulter cette tableau et voir
              l'orthographe et aussi voir une idée de tous les produits
              enregistrer dans la base de donnée ou même supprimer directement.
            </p>
            <h5>FORMULAIRE DE RECHERCHE D'INFORMATION SUR LES PRODUITS</h5>
            <p>
              Comme precisé ci dessus, il existe un champs de text qui vous
              permet de lier le recaputilatif de tous les opérations concernant
              ce produit.
            </p>
            <p>
              si vous taper le nom de description du produit, un bouton sortira
              et appuyer dessus, aussitôt vous allez voir la fiche et vous
              pouvez lire les entrées et sorties et les enregitrer en pdf ou
              imprimer.
            </p>
            <em>
              Si vous regardez la fiche, vous allez aussi voir des couleur
            </em>
            <ul>
              <li>
                Si c'est vert, le stock actuel est superieur au stock de
                securité prédefinis.
              </li>
              <li>
                Si c'est rouge, le stock actuel est inferieur au stock de
                securité prédefinis.
              </li>
              <li>
                Au cas ou le stock actuel est 0, le produit s'effacera
                automatiquement de la base de donnée.
              </li>
            </ul>
          </div>
        </main>
      </div>
    </Modale>
  );
};
