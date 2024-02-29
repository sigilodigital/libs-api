<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" />
  <img src="https://avatars.githubusercontent.com/u/20165699" width="200" alt="TypeORM Logo" />
</p>

<p align="center">Este é um repositório/biblioteca de recursos e serviços comuns para uso em projetos que utilizam <a href="https://nestjs.com/" target="_blank">NestJS</a> e <a href="https://typeorm.io/" target="_blank">TypeORM</a>.</p>
  
## Description

Foi implementado soluções para auditoria e diversos outros recursos que são comuns em APIs distintas. As soluções deste repositório incluem:

- **AuditLogSubscriber** - Garante que as alterações realizadas no DB sejam auditáveis, registrando um changelog a cada interação que provoque alteração no DB, respondendo as questões: quem, quando, o que
- **Validations** - Validadores de entrada de dados das APIs, avaliando proriedades de modelos de objeto que sejam obrigatórios, ou que o tipo, tamanho ou valor padrão sejam predeterminados. Também define a resposta apropriada a cada erro na validação dos dados;
- **RunnerTransaction** - inicializa uma transação que necessite de mais de uma instrução no banco de dados (INSERT, UPDATE, DELETE), com recurso de rollback que assegura o estado inicial caso alguma instrução falhe durante o processo de persistência dos dados no DB;
- **GenericRepository** - Classe abstrata com as principais implementações de métodos de persistência e consulta de dados no DB, para serem extendidas em classes do tipo Repository;
- **UtilRepository** - Classe concreta, extendida de GenericRepository, usada como solução para recursos que necessitem de alguma transação com o DB mas que não possui Repository especialista.
- **UtilService** - Classe com serviços de utilidade necessários em alguns recursos. Alguns serviços são: tokens (gerar, verificar e decodificar); hashes (encriptar e validar/comparar);
- **ApiResponse** - Classe responsável por tratar/normalizar todas as mensagens de resposta das APIs;
- **Util** - pacote de funções utilitárias, tais como: manipulação de date (validar e converter formato), manipulação de strings (somente números ou formato de texto, primeiro/último nome).

## Installation

No workspace, e com o arquivo `.gitmodules` devidamente configurado, rode o comando `git`:
```sh
git submodule update [--remote [--init [--recursive]]]
```
> Os parâmetros dentro dos colchetes são opcionais, mas podem ser necessários em alguns casos, como o `--remote` que é utilizado para sincronizar a branch local com a remota.

## License

MIT License
