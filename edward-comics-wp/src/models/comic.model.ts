export interface IComics {
    id: number,
    avis: number,
    categorie: string,
    date: string,
    dessinateur: string,
    disponibilite: number,
    editeur: string,
    isbn: number,
    nbrPages: number,
    nouveaute: boolean,
    photo: string,
    prix: number,
    promotion: boolean,
    resume: string,
    scenariste: string,
    selection: boolean,
    titre: string,
    univers: string,
    quantite: number
}
export interface IMeta {
    value: any
}
