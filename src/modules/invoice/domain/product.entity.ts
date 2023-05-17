import ID from "../../@shared/domain/value-object/id.value-object";

export default interface Product {
    id?: ID;
    name: string;
    price: number;
}