# Golden Raspberry Awards API - Challenge

API RESTful para análise dos vencedores da categoria pior filme do Golden Raspberry Awards.

## Tecnologias Utilizadas
- **Node.js** com **Express**
- **TypeScript** para tipagem segura
- **SQLite** (banco em memória)
- **Jest** + **Supertest** para testes de integração

---

## Instalação e Execução

---

### O arquivo movielist.csv deve estar localizado dentro da pasta /data, na raiz do projeto.

---

### Clonar o Repositório
```bash
git clone https://github.com/diegohcr/golden-raspberry-awards-api-challange.git
cd golden-raspberry-awards-api-challange

### Instalar Dependências
npm install

### Executar a aplicação
npm run dev

**O servidor estará disponível em http://localhost:3000**

### Executar os testes
npm test

##Endpoints
### GET /api/awards/intervals
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