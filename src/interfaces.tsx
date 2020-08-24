export interface Wine {
    key: string, 
    name: string, 
    rating: number, 
    price: string, 
    type: string, 
    image: string
}

export enum WineTypes {
    RED = 'red',
    WHITE = 'white',
    ROSÉ = 'rosé'
}

// type Wine = {
//     name: string,
//     price: string,
//     type: string,
//     rating: string,
//     image?: string
// }