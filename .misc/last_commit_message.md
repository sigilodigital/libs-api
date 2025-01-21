## Implementação de novas funcionalidades e ajustes em arquivos existentes

#### common/src/externals/class-validator/index.ts
- Adicionado ponto e vírgula ao final das linhas de exportação

#### common/src/models/classes/entity-abstract.class.ts
- Criada nova classe abstrata `IsActiveEntityAbstractClass`
- Alterado o tipo da propriedade `isActive` de opcional para obrigatório na classe `EntityAbstractClass`

#### common/src/models/enumerations/codigo-acao.enum.ts
- Renomeados alguns enums:
  - `SERVICO_*` para `ORDER_*`
  - `ORCAMENTO_*` para `BUDGET_*`

#### common/src/repository/generic.repository.ts
- Atualizado o caminho de importação para `EntityClassOrSchema` e outras entidades do TypeORM

#### package.json
- Movidas dependências `supertest` e `typeorm-model-generator` para `devDependencies`
- Removida dependência `typeorm-model-generator` das dependências principais

```json
{
  "changedLines": 30,
  "includedLines": 9,
  "totalChars": 1214,
  "changedFiles": 5,
  "newFiles": 2,
  "deletedfiles": 0
}
```

