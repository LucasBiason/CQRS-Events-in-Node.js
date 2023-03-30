import { MessageBuffer } from "../messages/messageBuffer";
import { Emitter } from "../events/eventEmitter";
import Product from "../models/Product";
import Cart from "../models/Cart";
import CartProduct from "../models/CartProduct";
import { Logger } from "../logger";
import { AppDataSource } from "../data-source"
import { TransactionHandle } from "newrelic";


export class CartService{
    _logger: any;
    _logTransaction: any;

    constructor(transaction: TransactionHandle | undefined = undefined) {
      this._logger = new Logger();
      this._logTransaction = transaction;
    }

    async _sendUpdateEvent(cart: Cart){
        if (!cart){
            this._logger.error("Cart not found");
            throw new Error("Cart not found");
        }
        const objectDataBuffer = await new MessageBuffer("cart").load();

        let headers = {
            'id': this._logTransaction.id
        }
        this._logTransaction.insertDistributedTraceHeaders(headers)
        headers['id'] = this._logTransaction.id;

        let messageToSend = {
            'cart': cart.toJSON(),
            'transaction': headers
        }
        console.log(messageToSend)
        await new Emitter().emit("CartUpdateEvent", objectDataBuffer.encode(messageToSend).finish());
    }

    async _retrieveCartById(cartid: string): Promise<Cart>{
        let cart = await AppDataSource.getRepository(Cart)
            .createQueryBuilder("cart")
            .where("id = :id", {id: cartid})
            .getOne();

        if (!cart){
            this._logger.error(`Cart ID (${cartid}) not found`);
            throw new Error(`Cart ID (${cartid}) not found`);
        }
        return cart;
    }

    async _retrieveProductById(productid: string): Promise<Product>{
        let product = await AppDataSource.getRepository(Product)
            .createQueryBuilder("product")
            .where("id = :id", {id: productid})
            .getOne();

        if (!product){
            this._logger.error(`Product ID (${productid}) not found`);
            throw new Error(`Product ID (${productid}) not found`);
        }
        return product;
    }

    async _updateCartProducts(cartid: string): Promise<Cart> {
        let cart = await this._retrieveCartById(cartid);

        const repository = AppDataSource.getRepository(CartProduct);
        let cart_total = await repository
            .createQueryBuilder("cart_product")
            .where("cart_product.cartId = :cart", {cart: cart.id})
            .select('SUM(quantity*price)', "total_products")
            .getRawOne()
        cart.total = cart_total["total_products"]==null? 0 : parseFloat(cart_total["total_products"]);
        await AppDataSource.getRepository(Cart).save(cart);

        cart.products = await AppDataSource
            .createQueryBuilder()
            .select("cart_product")
            .from(CartProduct, "cart_product")
            .where("cart_product.cartId = :cid", { cid: cartid, })
            .leftJoinAndSelect("cart_product.product", "product")
            .getMany();

        await this._sendUpdateEvent(cart)
        return cart;
    }

    async addItem(cartid: string, productid: string, price: number, quantity: number): Promise<Cart|null> {

        let cart: Cart = await this._retrieveCartById(cartid);
        let product: Product = await this._retrieveProductById(productid);
        let cartProduct: CartProduct|null = await AppDataSource
            .createQueryBuilder()
            .select("cart_product")
            .from(CartProduct, "cart_product")
            .where("cart_product.cartId = :cid AND cart_product.productId = :pid", { cid: cartid, pid: productid })
            .getOne();

        if (!cartProduct){
            cartProduct = new CartProduct();
        }
        cartProduct.cart = cart;
        cartProduct.product = product;
        cartProduct.price = price;
        cartProduct.quantity += quantity;
        await AppDataSource.getRepository(CartProduct).save(cartProduct);

        return this._updateCartProducts(cartid);
    }

    async removeItem(cartid: string, productid: string): Promise<Cart|null|Error> {
        await AppDataSource
            .createQueryBuilder()
            .delete()
            .from(CartProduct)
            .where("cartId = :cid AND productId = :pid", { cid: cartid, pid: productid })
            .execute()
        return this._updateCartProducts(cartid);
    }

    checkout(cartid: string) : Cart|undefined|Error{
        return undefined;
    }
}