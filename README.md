# caruffs
this is a experimental personal project, intending to learn react, react native and node and, if it works, deploy an app to offer and search for rides to the university

___________________
Este projeto vem da ideia de aprender com a mão na massa. Infelizmente a falta de experiência com documentação apropriada tomariam um tempo demasiado pra organizar isso pra fácil leitura de qualquer público, então essse readme serve mais para lembrete do que eu fiz e anotações durante o estudo. Tenho tido como base os vídeos da semana omnistack 10.

Para além disso, pretendo futuramente expandir isso com uma proposta política da criação de apps curtos, de propósito especifico (inclusive geograficamente) e autogerido.

[algum dos textos que me trouxeram a esse pensamento:](https://www.vice.com/amp/en_us/article/pa75a8/worker-owned-apps-are-trying-to-fix-the-gig-economys-exploitation)

# anotações

#### Dependencias:

    node js
    yarn
    compass comunity - client pra acessar os dados salvos no mongoDb
    _insomnia_ ou _postman_ pra conseguir acessar por metodos HTML


#### começando um projeto com o yarn:
    "yarn init" na pasta onde será criado o projeto
    "yarn add mongoose" para ajudar a comunicação com uma base de dados mongo
    "yarn add express" (para rotas) adiciona essa dependencia ao projeto

"yarn add nodemon -D" (adiciona em dependencia de desenvolvimento pra atualizar automaticamente)

pra DB noSQL e cloud:
    https://www.mongodb.com/cloud/atlas 

    {
        'login_e_senhas': 'Ocultado né gurias'
    }

connect "src/index.js" to mongoose

    as rotas ficarão salvas em src/routes.js

as funções padrão dos controladores são
    index, show, store, update, destroy
