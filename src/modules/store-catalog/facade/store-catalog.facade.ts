import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import StoreCatalogFacadeFactory from "../factory/facade.factory";
import FindProductUseCase from "../usecase/find-product/find-product.usecase";
import ListProductsUseCase from "../usecase/list-products/list-products.usecase";
import { FindStoreCatalogFacadeInputDTO, FindStoreCatalogFacadeOutputDTO, ListStoreCatalogFacadeOutputDTO, StoreCatalogFacadeInterface } from "./store-catalog.facade.interface";

export interface UseCasesProps {
    findUseCase: FindProductUseCase,
    listProductsUseCase: ListProductsUseCase
}

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface {

    private _findUseCase: FindProductUseCase;
    private _listProductsUseCase: ListProductsUseCase;

    constructor(props: UseCasesProps) {
        this._findUseCase = props.findUseCase;
        this._listProductsUseCase = props.listProductsUseCase;
    }

    async find(id: FindStoreCatalogFacadeInputDTO): Promise<FindStoreCatalogFacadeOutputDTO> {
        const product = await this._findUseCase.execute(id);

        return {
            id: product.id,
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice
        }

    }

    async findAll(): Promise<ListStoreCatalogFacadeOutputDTO> {
        return  await this._listProductsUseCase.execute({});
    }
}