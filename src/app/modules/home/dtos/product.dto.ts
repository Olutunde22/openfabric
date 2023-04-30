export interface ProductDTO {
    _id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    createdBy: {
        _id: string;
        firstName: string;
        email: string;
    }
    createdAt: string;
    updatedAt: string;

}