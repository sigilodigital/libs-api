## Refatoração e melhorias no UtilService

#### common/src/services/util.service.ts
- Implementado padrão Singleton para a classe UtilService
- Métodos tokenGenerate e tokenVerify tornados estáticos
- Adicionadas documentações JSDoc para métodos hashEncrypt, hashCompare e tokenDecodeWithoutVerify
- Atualizada a interface IUtilService removendo métodos não mais necessários
- Adicionado import de JwtSignOptions e ajustado o tipo do parâmetro options em tokenGenerate

```json
{
  "changedLines": 37,
  "includedLines": 27,
  "totalChars": 1647,
  "changedFiles": 1,
  "newFiles": 0,
  "deletedfiles": 0
}
```

