import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import ProductAdmFacadeInterface, { AddProductFacadeInputDTO, CheckStockFacadeInputDTO, CheckStockFacadeOutputDTO } from "./product-adm.facade.interface";

export interface UseCasesProps {
    addUseCase?: UseCaseInterface;
    checkStockUseCase?: UseCaseInterface;

}

export default class ProductAdmFacade implements ProductAdmFacadeInterface{

    private _addUseCase: UseCaseInterface;
    private _checkStockUseCase: UseCaseInterface;

    constructor(ucProps: UseCasesProps) {
        this._addUseCase = ucProps.addUseCase;
        this._checkStockUseCase = ucProps.checkStockUseCase;
    }

    addProduct(input: AddProductFacadeInputDTO): Promise<void> {
        return this._addUseCase.execute(input);
    }

    checkStock(input: CheckStockFacadeInputDTO): Promise<CheckStockFacadeOutputDTO> {
        return this._checkStockUseCase.execute(input);
    }

}