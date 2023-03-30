import fetch from 'node-fetch';
import { AppDataSource, initDataSource } from './data-source';

export function QueryProvider(strategy: Function) {
    return async (input: any) => ({
        result: await strategy(input),
        $meta: { at: new Date() },
    });
}

export function ComputeStrategy(fn: Function) {
    return (input: any) => fn(input);
}

export function FetchStrategy(url: string) {
    return async (_input: any) => (
        await fetch(url, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            "Accept-Encoding": "gzip",
            },
        })
    ).json();
}

export function RepositoryStrategy(entity: any, fn: Function) {
    const repository = AppDataSource.getRepository(entity)
    console.log(repository)
    return async () => await fn(repository);
}

export default initDataSource;