import { EntityClassOrSchema } from "@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type";
import { DataSourceOptions } from "typeorm";

import configs from "../configs";

export type DbConfigOptionsType = {
    dbOption?: DbOptionType;
    subscriberList?: (string | Function)[];
    entityList: EntityClassOrSchema[]
}
export type DbConfigType2 = (eL: EntityClassOrSchema[]) => DataSourceOptions;
export type DbOptionType =
    | 'pg_default'
    | 'pg_fixture'
    | 'pg_test';

export function dbConfig(dbConfigOption: DbConfigOptionsType): DataSourceOptions {
    switch (dbConfigOption.dbOption) {
        case 'pg_default':
            return dbConfig_pg_default(dbConfigOption);
        case 'pg_fixture':
            return dbConfig_pg_fixture(dbConfigOption);
        case 'pg_test':
            return dbConfig_pg_test(dbConfigOption);
        default:
            return dbConfig_pg_default(dbConfigOption);
    }
}

const pgFacilitaryConfig: DataSourceOptions = {
    type: 'postgres',
    host: configs().db.host,
    port: configs().db.port,
    database: configs().db.database,
    schema: configs().db.schema,
    username: configs().db.username,
    password: configs().db.password,
    ssl: false,
    logging: false,
    synchronize: false,
    subscribers: [/*HistoricoSubscriber*/],
    entities: [
        // '**/entities/*.entity',
        // '**/entities/*.dto'
    ]
};
export function dbConfig_pg_default(dbConfigOption: DbConfigOptionsType): DataSourceOptions {
    return {
        ...pgFacilitaryConfig,
        host: 'facilitary-db-dev',
        port: 5432,
        subscribers: dbConfigOption.subscriberList,
        entities: dbConfigOption.entityList
    } as DataSourceOptions;
}
export function dbConfig_pg_fixture(dbConfigOption: DbConfigOptionsType): DataSourceOptions {
    return {
        ...pgFacilitaryConfig,
        host: 'localhost',
        port: 7065,
        subscribers: dbConfigOption.subscriberList,
        entities: dbConfigOption.entityList
    } as DataSourceOptions;
}

function dbConfig_pg_test(dbConfigOption: DbConfigOptionsType): DataSourceOptions {
    return {
        ...pgFacilitaryConfig,
        schema: 'test',
        subscribers: dbConfigOption.subscriberList,
        entities: dbConfigOption.entityList
    } as DataSourceOptions;
}