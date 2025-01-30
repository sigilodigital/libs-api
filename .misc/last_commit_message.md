## Atualização de DTOs e adição de ParamsDto

#### common/src/models/dto/entity-abstract.dto.ts
- Alterado o nome da propriedade `__relations` para `__params`
- Atualizada a descrição da propriedade na anotação `@ApiProperty`

#### common/src/models/dto/request-abstract.dto.ts
- Adicionada nova classe abstrata `ParamsDto` com propriedades `relations`, `take` e `skip`
- Atualizada a classe `RequestAbstractDto` para usar `ParamsDto`
- Adicionada interface `IParamsDto`
- Importado `ValidateNested` do `class-validator`

```json
{
  "changedLines": 31,
  "includedLines": 25,
  "totalChars": 1022,
  "changedFiles": 2,
  "newFiles": 0,
  "deletedfiles": 0
}
```

