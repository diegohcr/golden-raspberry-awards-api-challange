# Golden Raspberry Awards API - Challenge

API RESTful para análise dos vencedores da categoria pior filme do Golden Raspberry Awards.

## Tecnologias Utilizadas
- **Node.js** com **Express**
- **TypeScript** para tipagem segura
- **SQLite** (banco em memória)
- **Jest** + **Supertest** para testes de integração

---

### O arquivo com o nome *movielist.csv* deve estar localizado dentro da pasta */data*, na raiz do projeto.

---

## Instalação e Execução

### Clonar o Repositório
```bash
git clone https://github.com/diegohcr/golden-raspberry-awards-api-challange.git
cd golden-raspberry-awards-api-challange
````

### Instalar Dependências
```bash
npm install
````

### Executar a aplicação
```bash
npm run dev
````

**O servidor estará disponível em http://localhost:3000 se estiver rodando localmente**

### Executar os testes
```bash
npm test
````

##Endpoints
### GET http://localhost:3000/api/awards/intervals - se estiver rodando localmente
```json
{
    "min": [
        {
        "producer": "Producer 1"
        ,
        "interval": 1,
        "previousWin": 2008,
        "followingWin": 2009
        },
        {
        "producer": "Producer 2"
        ,
        "interval": 1,
        "previousWin": 2018,
        "followingWin": 2019
        }
    ],
    "max": [
        {
        "producer": "Producer 1"
        ,
        "interval": 99,
        "previousWin": 1900,
        "followingWin": 1999
        },
        {
        "producer": "Producer 2"
        ,
        "interval": 99,
        "previousWin": 2000,
        "followingWin": 2099
        }
    ]
}