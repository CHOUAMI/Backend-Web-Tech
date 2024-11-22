import { body, param } from "express-validator";

// Regex pour le nom et prénom
const nameRegex = /^[a-zA-Z]{4,}$/; // Minimum 4 lettres alphabétiques

const userRules = [
    body('nom')
        .matches(nameRegex).withMessage("Le nom doit comporter au moins 4 lettres alphabétiques."),
    body('prenom')
        .matches(nameRegex).withMessage("Le prénom doit comporter au moins 4 lettres alphabétiques."),
    body('email')
        .exists().withMessage('L\'email est obligatoire.')
        .isEmail().withMessage("Ce format n'est pas un email valide."),
    body('mot_de_passe')
        .exists().withMessage('Le mot de passe est obligatoire.')
        .isString().withMessage('Le mot de passe doit être une chaîne de caractères.')
        .isLength({ min: 8 }).withMessage('Le mot de passe doit contenir au moins 8 caractères.')
        .matches(/\d/).withMessage('Le mot de passe doit contenir au moins un chiffre.')
        .matches(/[a-z]/).withMessage('Le mot de passe doit contenir au moins une lettre minuscule.')
        .matches(/[A-Z]/).withMessage('Le mot de passe doit contenir au moins une lettre majuscule.')
        .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Le mot de passe doit contenir au moins un caractère spécial.'),
    body('date_de_naissance')
        .optional().isISO8601().withMessage('La date de naissance doit être au format ISO8601.'),
    body('DepartmentId')
        .optional().isInt({ min: 1 }).withMessage("L'ID du département doit être un entier positif."),
    param('id')
        .optional().isInt({ min: 1 }).withMessage("L'ID doit être un entier positif.")
];

export default userRules;
