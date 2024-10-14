import { Test, TestingModule } from '@nestjs/testing';

import { QUERY_RUNNER_PROVIDER } from '@sd-root/libs/common/src/providers/query-runner.provider';
import { LoginUserInputDto } from '@sd-root/src/core/resources/auth/models/dto/login-user.dto';
import { UserFindInputDto, UserFindOutputDto } from '@sd-root/src/core/resources/user/models/dto/user-find.dto';
import { UserEntity } from '@sd-root/src/core/resources/user/models/entities/user.entity';
import { UtilRepository } from '../repository/util.repository';

const entities = UserEntity.getEntityList([]);

describe('UtilRepository', () => {
    let repo: UtilRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UtilRepository,
                QUERY_RUNNER_PROVIDER,
                // { provide: UtilRepository, useFactory(...args) { return new UtilRepository(); }, }
            ],
        }).compile();

        repo = module.get<UtilRepository>(UtilRepository);
        // repo = new UtilRepository();
    });

    it('should be defined', () => {
        expect(repo).toBeDefined();
    });
});

describe('Testando conexão com DB', () => {
    let repo: UtilRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [{
                provide: UtilRepository, useFactory(...args) {
                    return new UtilRepository(entities);
                },
            }],
        }).compile();

        repo = module.get<UtilRepository>(UtilRepository);
    });

    it('should be defined', () => {
        expect(repo).toBeDefined();
    });

});

describe('Testando os métodos do repository', () => {
    let utilRepository: UtilRepository;

    jest.setTimeout(120000);

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [{
                provide: UtilRepository, useFactory(...args) {
                    return new UtilRepository(entities);
                },
            }],
        }).compile();

        utilRepository = module.get<UtilRepository>(UtilRepository);
    });

    it('find: deve retornar uma lista de usuários', async () => {
        const input: LoginUserInputDto = { username: 'sd', password: '123' };
        const result = await utilRepository.find({ where: { isActive: true } }, UserEntity);

        expect(result).toBeInstanceOf(Array<UserFindOutputDto>);
    });

    it('find: deve retornar todos os usuários, inclusive os dados das tabelas relacionadas', async () => {
        const input: UserFindInputDto = {};
        const result = await utilRepository.find({
            where: input, relations: { _person: true, _loginInfo: true }
        }, UserEntity);

        expect(result).toBeInstanceOf(Array<UserFindOutputDto>);
        expect(result.length).toBeGreaterThanOrEqual(2);
        for (const element of result) {
            expect(element).toMatchObject({
                'id': expect.any(String),
                '_person': expect.any(Object),
                '_loginInfo': expect.any(Object),
            });
        }
    });

    it('findOne: deve retornar apenas um usuário e seus relacionamentos', async () => {
        const input: UserFindInputDto = { username: 'abcd' };
        const result = await utilRepository.findOne({
            where: input, relations: { _person: true, _loginInfo: true }
        }, UserEntity);

        expect(result).toBeInstanceOf(UserEntity);
        expect(result).toMatchObject({
            'id': expect.any(String),
            '_person': expect.any(Object),
            '_loginInfo': expect.any(Object),
        });
    });
});
