## id: 
- 1

### Prioridade
Crítica

### Status
Analisando

### Data e Hora
06/07/21 - 19:00

## Título:
- Cadastro duplicado de email

## Descrição

### Funcionalidade: Cadastro de usuário
Esse é apenas um exemplo de registro de bug onde o usuário está tentando se cadastrar com um email já registrado.

Como um usuário do sistema
Ao preencher o cadastro aplicação com um email já cadastrado
Ocorre erro 500 ao finalizar registro

#### Fluxo
Dado que o email: "teste@teste.com.br" já esteja cadastrado na aplicação
Quando acessar a aplicação na parte de cadastro de usuário
E finalizar o cadastro informando o email já cadastrado "teste@teste.com.br"
Então ocorre erro quando finaliza o cadastro de usuário

### Screenshots