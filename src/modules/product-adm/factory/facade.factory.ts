import ProductAdmFacade from "../facade/product-adm.facade";
import ProductRepository from "../repository/product.repository";
import AddProductUseCase from "../usecase/add-product/add-product.usecase";
import CheckStockUseCase from "../usecase/check-stock/check-stock.usecase";

export default class ProductAdmFacadeFactory {
    static create() {
        const rep = new ProductRepository();
        const addProductUC = new AddProductUseCase(rep);
        const checkStockUC = new CheckStockUseCase(rep);
        const facade = new ProductAdmFacade({
            addUseCase:addProductUC,
            checkStockUseCase: checkStockUC
        });

        return facade;
    }
}