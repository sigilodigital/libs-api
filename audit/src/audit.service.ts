import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { IAuditoriaConsultarDto } from './models/dto/audit-consultar.dto';
import { IAuditoriaInserirDto } from './models/dto/audit-inserir.dto';

import { AuditoriaLocalService } from './audit-local.service';
import { AuditoriaConsultarUseCase } from './usecases/audit-consultar.usecase';
import { AuditoriaInserirUseCase } from './usecases/audit-inserir.usecase';
import { UtilRepository } from '@libs/common/repository/util.repository';

@Injectable()
export class AuditoriaService implements IAuditoriaService {

    async inserir(input: IAuditoriaInserirDto['input'], request: Request) {
        input = {
            ...input,
            dtAcao: new Date(),
            userId: await AuditoriaLocalService.getCodUser(request),
        } as IAuditoriaInserirDto['input'];

        const uc = new AuditoriaInserirUseCase(new UtilRepository());
        return await uc.handle(input);
    }

    async consultar(input: IAuditoriaConsultarDto['input']) {

        const uc = new AuditoriaConsultarUseCase(new UtilRepository());
        return await uc.handle(input);
    }


}

interface IAuditoriaService {
    inserir(input: IAuditoriaInserirDto['input'], request: Request): void;
    consultar(input: IAuditoriaConsultarDto['input']);
}
