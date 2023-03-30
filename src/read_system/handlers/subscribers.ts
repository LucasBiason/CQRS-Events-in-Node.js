import { cartUpdateHandler } from "./CartUpdateHandler";
import { productUpdateHandler } from "./ProductUpdateHandler";

export let subscribersList = {
    "CartUpdateEvent": cartUpdateHandler,
    "ProductUpdateEvent": productUpdateHandler,
};