@busca-por-professor
Feature: Buscar cursos por professor(a)

    Como um usuário do sistema
    Quero buscar por cursos através da busca por professores
    Para selecionar cursos do tutor de minha preferência

    Background: Dado que o usuário esteja nos cursos do professor selecionado 
        Given acesso a pagina de  busca por Professores
        When visitar os cursos da professora "Ena Loiola"

    Scenario: Validar se o valor total coincidi com o valor parcelado do curso
        When selecionar o curso "CBM-AL - Inglês - 2021 (Pós-Edital)"
        Then o valor total deve ser R$ "96,00" reais
        And o valor parcelado de "12x de R$ 8,00"
    
    Scenario: Pesquisar por um curso que não pertece ao professor(a) selecionado(a)
        When pesquisar pelo o curso "UERJ - Raciocínio Lógico - 2021 (Pós-Edital)"
        Then deve exibir "Nenhum resultado encontrado."
    
    Scenario: Validar se o nome do professor(a) selecionado(a) aparece no material escrito e fórum
        When selecionar o curso "CBM-AL - Inglês - 2021 (Pós-Edital)"
        Then deve exibir o nome da professora "Ena Loiola" no material escrito em PDF e no fórum