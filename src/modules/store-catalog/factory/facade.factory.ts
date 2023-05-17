import StoreCatalogFacade from "../facade/store-catalog.facade";
import ProductRepository from "../repository/product.repository";
import FindProductUseCase from "../usecase/find-product/find-product.usecase";
import ListProductsUseCase from "../usecase/list-products/list-products.usecase";

export default class StoreCatalogFacadeFactory {
    static create(): StoreCatalogFacade {
        const repository = new ProductRepository();
        const findProductUC = new FindProductUseCase(repository);
        const listProductsUC = new ListProductsUseCase(repository);

        const facade = new StoreCatalogFacade({
            findUseCase: findProductUC,
            listProductsUseCase:listProductsUC
        });

        return facade;
    }
}