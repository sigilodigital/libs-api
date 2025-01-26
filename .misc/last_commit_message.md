## Melhorias no GenericRepository e ajustes de configuração

#### common/src/repository/generic.repository.ts
- Atualizada a assinatura do método `save` na interface `IGenericRepository`
- Adicionados novos parâmetros opcionais: `entityClass`, `dbSchema`

#### .misc/prompt
- Atualizada a instrução para não contar caracteres alterados no arquivo last_commit_message.md

```json
{
  "changedLines": 3,
  "includedLines": 1,
  "totalChars": 197,
  "changedFiles": 2,
  "newFiles": 0,
  "deletedfiles": 0
}
```

