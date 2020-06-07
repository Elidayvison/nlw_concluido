const express = require("express")
const server = express()

//pegar banco de dados
const db = require("./database/db")

//configurar as pastas public
server.use(express.static("public"))

//habilidando o uso do req.body na minha pagina
server.use(express.urlencoded({extended: true}))


//configurar o nunjucks
//usando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})


//configurar os caminhos da minha aplicação
// pag inicial
// req: requisição
//res: resposta
server.get("/",(req,res) => {
    return res.render("index.html")
})

server.get("/create-point", (req, res) => {

    

    return res.render("create-point.html")
})

    server.post("/savepoint", (req, res) => {

        //req.body = o corpo do nosso formulario
       // console.log(req.body)
        
       //inserir dados no banco de dados
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
            req.body.image,
            req.body.name,
            req.body.address,
            req.body.address2,
            req.body.state,
            req.body.city,
            req.body.items
            
        ]

        function afterInsertData(err){
            if(err){
                console.log(err)
                return res.send("Erro encontrado!!")

            }

            console.log("Cadrastro realizado com sucesso")
            console.log(this)

            return res.send("create-point.html", {saved: true})


        }

        db.run(query, values, afterInsertData)


    })



server.get("/search-results", (req,res) => {

    const search = req.query.search

    if(search == "")
    {
        return res.render("search-results.html", {total: 0})

    }


    //pegar dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
        if(err){
            return console.log(err)
        }

        let total = rows.length //length => conta quantos elementos tem no array
        
        return res.render("search-results.html", {places:  rows, total: total})

    })
})



//ligar o servidor
server.listen(3000) // ouvir o que acontece na porta

