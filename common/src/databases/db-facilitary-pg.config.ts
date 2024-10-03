import { EntityClassOrSchema } from "@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type";
import { DataSourceOptions, MixedList } from "typeorm";

import { env } from "./envSchema";

export type DbConfigOptionsType = {
    dbOption?: DbOptionType;
    subscriberList?: (string | Function)[];
    entityList: EntityClassOrSchema[]
}
export type DbConfigType2 = (eL: EntityClassOrSchema[]) => DataSourceOptions;
export type DbOptionType =
    | 'pg_facilitary_default'
    | 'pg_facilitary_default_fixture'
    | 'pg_facilitary_test';

export function dbConfig(dbConfigOption: DbConfigOptionsType): DataSourceOptions {
    switch (dbConfigOption.dbOption) {
        case 'pg_facilitary_default':
            return dbConfig_pgFacilitaryDefault(dbConfigOption);
        case 'pg_facilitary_default_fixture':
            return dbConfig_pgFacilitaryFixture(dbConfigOption);
        case 'pg_facilitary_test':
            return dbConfig_pgFacilitaryTest(dbConfigOption);
        default:
            return dbConfig_pgFacilitaryDefault(dbConfigOption);
    }
}

const pgFacilitaryConfig: DataSourceOptions = {
    type: 'postgres',
    host: env.DB_HOST,
    port: parseInt(env.DB_PORT),
    ssl: false,
    database: env.DB_NAME,
    schema: env.DB_SCHEMA,
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    synchronize: false,
    subscribers: [/*HistoricoSubscriber*/],
    entities: [
        // '**/entities/*.entity',
        // '**/entities/*.dto'
    ]
};
export function dbConfig_pgFacilitaryDefault(dbConfigOption: DbConfigOptionsType): DataSourceOptions {
    return {
        ...pgFacilitaryConfig,
        // host: 'pg_facilitary',
        subscribers: [...dbConfigOption.subscriberList],
        entities: [...dbConfigOption.entityList]
    } as DataSourceOptions;
}
export function dbConfig_pgFacilitaryFixture(dbConfigOption: DbConfigOptionsType): DataSourceOptions {
    return {
        ...pgFacilitaryConfig,
        host: 'localhost',
        subscribers: [...dbConfigOption.subscriberList],
        entities: [...dbConfigOption.entityList]
    } as DataSourceOptions;
}

function dbConfig_pgFacilitaryTest(dbConfigOption: DbConfigOptionsType): DataSourceOptions {
    return {
        ...pgFacilitaryConfig,
        host: 'localhost',
        schema: 'test',
        subscribers: [...dbConfigOption.subscriberList],
        entities: [...dbConfigOption.entityList]
    } as DataSourceOptions;
}