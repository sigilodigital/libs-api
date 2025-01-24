## Implementação de novas funcionalidades e ajustes em arquivos existentes

#### common/src/databases/index.ts
- Alterada a mensagem de log para "Datasource: INITIALIZED!" ao inicializar o datasource

#### common/src/models/dto/entity-abstract.dto.ts
- Criada nova classe abstrata `RequestAbstractDto` que estende `EntityAbstractDto`
- Adicionada propriedade `__relations` na nova classe com decoradores `ApiProperty` e `Validate`

#### package.json
- Adicionado novo script "sshkey" para gerar chave SSH

```json
{
  "changedLines": 13,
  "includedLines": 10,
  "totalChars": 620,
  "changedFiles": 3,
  "newFiles": 0,
  "deletedfiles": 0
}
```

