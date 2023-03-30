import { HttpAdapter } from "http-adapter";
import initDataSource, { QueryProvider, RepositoryStrategy } from "query-provider";
import Product from "./models/Product";

require('dotenv').config()

const MyQueryMapper = {

  "/produtos/": QueryProvider(
    RepositoryStrategy(Product, (repository: any) => repository.find())
  ),

};

const PORT = parseInt(process.env.PORT != undefined ? process.env.PORT : "8080");
HttpAdapter({
  QueryMapper: MyQueryMapper,
}).listen(PORT,() => {
  initDataSource();
});