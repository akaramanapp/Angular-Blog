export class Product {
    constructor(
        public name: string,
        public description: string,
        public imgTitle?: string,
        public img?: any,
        public id?: string,
        public price?: number
    ){}
}