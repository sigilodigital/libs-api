import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { IAuditoriaConsultarDto } from './models/dto/audit-consultar.dto';
import { IAuditoriaIncluirDto } from './models/dto/audit-incluir.dto';

import { AuditoriaLocalService } from './audit-local.service';
import { AuditoriaConsultarUseCase } from './usecases/audit-consultar.usecase';
import { AuditoriaIncluirUseCase } from './usecases/audit-incluir.usecase';
import { UtilRepository } from '@libs/common/repository/util.repository';

@Injectable()
export class AuditoriaService implements IAuditoriaService {

    async incluir(input: IAuditoriaIncluirDto['input'], request: Request) {
        input = {
            ...input,
            dtAcao: new Date(),
            usuarioId: await AuditoriaLocalService.getCodUsuario(request),
        } as IAuditoriaIncluirDto['input'];

        const uc = new AuditoriaIncluirUseCase(new UtilRepository());
        return await uc.handle(input);
    }

    async consultar(input: IAuditoriaConsultarDto['input']) {

        const uc = new AuditoriaConsultarUseCase(new UtilRepository());
        return await uc.handle(input);
    }


}

interface IAuditoriaService {
    incluir(input: IAuditoriaIncluirDto['input'], request: Request): void;
    consultar(input: IAuditoriaConsultarDto['input']);
}
