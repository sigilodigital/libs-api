export enum MensagenEnum {
    // DEFAULT
    "Falha." = 0,
    "Sucesso." = 1,
    // CREATE
    "Registro incluído." = 10,
    // UPDATE
    "Registro atualizado." = 11,
    // DELETE
    "Registro removido." = 12,
    // FIND
    "Registro encontrado." = 2,
    "Registro não encontrado." = 16,
    // ERROR - FIELD VALIDATION
    "Campo inválido." = 20,
    "Campo @campo não solicitado." = 21,
    "Campo @campo não informado." = 22,
    "Tipo do campo @campo é inválido." = 23,
    "Tamanho do campo @campo é inválido." = 24,
    "Valor do campo @campo é inválido." = 25,
    // ERROR - AUTH
    "Acesso público negado." = 14,
    // ERROR - AUTH_SYS
    "Sistema não encontrado." = 90,
    "Sistema inativado." = 91,
    "Sistema não autenticado." = 92,
    "Sistema não tem acesso ao método solicitado." = 93,
    // ERROR - AUTH_USR
    "Perfil não tem acesso ao método solicitado." = 8,
    // ERROR - FIND
    "Consulta externa não encontrada." = 30,
    "URL inválida." = 31,
    "CEP não encontrado." = 32,
    
    // CONTINUAR CORREÇÃO DAQUI --------------------------------
    "Falha. Campo @campo não é compatível com o tipo da pessoa do cod_cpf_cnpj informado." = 18,
    "Falha. Usuário externo já cadastrado." = 19,
    "Falha. UF @valor não cadastrada na base." = 21,
    "Falha. UF @valor inativa." = 22,
    "Falha. Estado civil @valor não cadastrado na base." = 23,
    "Falha. Estado civil @valor inativo." = 24,
    "Falha. País @valor não cadastrado na base." = 25,
    "Falha. País @valor inativo." = 26,
    "Falha. Tipo de arquivo pessoal @valor não cadastrado na base." = 27,
    "Falha. Tipo de arquivo pessoal @valor inativo." = 28,
    "Falha. Não existe registro para o cod_cpf_cnpj e cod_interessado informados." = 29,
    "Falha. Tipo de telefone @valor não cadastrado na base." = 30,
    "Falha. Tipo de telefone @valor inativo." = 31,
    "Falha. Pergunta secreta @valor não cadastrada na base." = 32,
    "Falha. Pergunta secreta @valor inativa." = 33,
    "Falha. Tipo de relacionamento fiscal @valor não cadastrado na base." = 34,
    "Falha. Tipo de relacionamento fiscal @valor inativo." = 35,
    "Falha. @campo @valor informado inválido." = 36,
    "Falha. Tamanho do arquivo do campo @campo é maior que <tamanho máximo do definido para o arquivo>." = 37,
    "Falha. Extensão do arquivo do campo @campo é maior que diferente de @campo." = 38,
    "Formato do @campo inválido." = 39,
    "Operação realizada." = 40,
    "Senha atual não confere." = 41,
    "Senha bloqueada." = 42,
    "Falha ao salvar." = 43,
    "Senha validada. A senha do usuário deve ser alterada." = 44,
    "Usuário inativo." = 45,
    "Senha validada." = 46,
    "Dados não conferem." = 47,
    "Verificação de pergunta secreta bloqueada." = 48,
    "Falha. A situação da autorização não permite aceite pelo usuário autorizado." = 49,
    "Falha. A situação da autorização não permite rejeição pelo usuário autorizado." = 50,
    "Falha. A situação da autorização não permite revogação pelo usuário autorizador." = 51,
    "Falha. Usuário autorizador não existe." = 52,
    "Falha. Usuário autorizado não existe." = 53,
    "Falha. A situação da procuração não permite cancelamento." = 54,
    "Falha. Usuário procurador não existe." = 55,
    "Falha. Pessoa outorgante não existe." = 56,
    "Falha. Procurador e Outorgante não pode ser a mesma pessoa." = 57,
    "Falha. Data inválida." = 58,
    "Falha de processamento!" = 60,
    "Falha. Token não informado." = 77,
    "Falha. Token inválido." = 78,
    "Falha. Token expirado." = 79,
    "Falha. Token mal formado." = 80,
}