import { HttpAdapter } from "./HttpAdapter";
import { ComputeStrategy, FetchStrategy, QueryProvider, RepositoryStrategy } from "./QueryProvider";
import { initDataSource } from "./QueryProvider/data-source";
import Product from "./models/Product";

require('dotenv').config()


const MyQueryMapper = {
  "/random/": QueryProvider(
    ComputeStrategy((body: any) => (body.offset || 0) + Math.random())
  ),

  "/time/": QueryProvider(
    FetchStrategy("http://worldtimeapi.org/api/timezone/America/Sao_Paulo")
  ),

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