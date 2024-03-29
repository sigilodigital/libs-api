import { Test, TestingModule } from '@nestjs/testing';
import { AuditoriaService } from '../audit.service';

describe('AuditoriaService', () => {
    let service: AuditoriaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuditoriaService],
        }).compile();

        service = module.get<AuditoriaService>(AuditoriaService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
