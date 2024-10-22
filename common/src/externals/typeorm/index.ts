import { EntitySchema } from 'typeorm';
export type EntityClassOrSchema = Function | EntitySchema;
export * from 'typeorm';
export { TypeOrmModule } from '@nestjs/typeorm';
