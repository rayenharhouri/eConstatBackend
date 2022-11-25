import multer, { diskStorage } from "multer"; // Importer multer
import { join, dirname } from "path";
import { fileURLToPath } from "url";



// Les extensions & accepter

const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png",

};

export default multer({
    //Configuration de stockage
    storage: diskStorage({
        //Configurer 1'enplacenent de stockage
        destination: (req, file, callback) => {
            const __dirname = dirname(fileURLToPath(import.meta.url)); // Récupérer le chemain du dossier courant|
            callback(null, join(__dirname, "../public/carIcons")); // Indiquer 1'emplacement de stockage
        },
        //Configurer 1e nom avec lequel le fichier va etre enregistrer
        filename: (req, file, callback) => {
            //Reaplacer les espaces par des underscores
            const name = file.originalname.split(" ").join("");
            //Récupérer l"extension a utiliser pour le fichier
            const extension = MIME_TYPES[file.mimetype];
            // Ajouter un timestamp Date.now() au nom de fichier
            callback(null, name + Date.now() + "." + extension);
        },
    }),
    // Taille max des images 5Mo
    Limits: 5 * 1024 * 1024,
}).single("image"); // Le fichier est envoyé dans le body avec noa/clé "image"