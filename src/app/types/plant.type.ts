import { Image } from "./image.type";
import { PlantCategory } from "./plant-category.type";

export interface Plant {
    id: string,
    name: string,
    description?: string,
    code: string,
    status: string,
    createAt: string,
    images: Image[],
    plantCategories: PlantCategory[],
}