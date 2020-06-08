//importar  a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose()

//iniciar o objeto de banco de dados
//que irá fazer operaçoes no anco de dados
const db =  new sqlite3.Database("./src/database/database.db")

module.exports = db





//utilizndo o banco de dados para as nossas operações


db.serialize(() => {
//Criar uma tabela com comandos SQL

    db.run(`
        CREATE TABLE IF NOT EXISTS places(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT 

        );
        
    `)

//Inserir dados na tabela
    const query = `
    INSERT INTO places(
        image,
        name,
        address,
        address2,
        state,
        city,
        items

    ) VALUES (?,?,?,?,?,?,?);
`


    const values = [
        "/assets/papel_rec.jpg",
        "Papersider",
        "Elidayvison José, Caja ",
        "Número 250",
        "Pernambuco",
        "Carpina",
        "Papéis e Papelão"
    ]
/*
    function afterInsertData(err){
        
        if(err){
            return console.log(err)

        }

        console.log("Cadrastro realizado com sucesso")
        console.log(this)

    }

    db.run(query, values, afterInsertData)


//Consultar os dados da tabela
   // db.all(`SELECT * FROM places`, function(err, rows){
        if(err){
            return console.log(err)
        }
        console.log("Esses são os seus registros")
        console.log(rows)
    })

*/
//Deletar um dado da tabela

    db.run(`DELETE FROM places WHERE id =  ?`, [8], function(err){
        if(err){
            return console.log(err)
        }

        console.log("Registro apagado com Sucesso")
    })

    
})

