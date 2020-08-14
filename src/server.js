// depois de instalado o node XPathExpression, abre uma porta 5500 do servidor 
// () => {  }, isso é uma função curta (arrowfunction)
// req = requisição; res = resposta
// req e res são parâmetros nessas funções
// get pega elementos de um arquivo.html
// sendFile (mesma lógico do send mas aqui refere-se a uma página/arquivo.html. não valores/textos/infos)
// __dirname (nome do diretório. informa o nome da pasta de diretório)
// const proffys = [{}] : consiste em um objeto com propriedades




//     // function pageLanding(req, res) {
//     //     return res.sendFile(__dirname + "/views/index.html")
//     // }

//     // function pageStudy(req, res) {
//     //     return res.sendFile(__dirname + "/views/study.html")
//     // }

//     // function pageGiveClasses(req, res) {
//     //     return res.sendFile(__dirname + "/views/give-classes.html")
//     // }
// }




// servidor + import do nunjcks
const express = require('express');
const server = express();

const { pageStudy, 
pageLanding, 
pageGiveClasses,
saveClasses
} = require('./pages')


const nunjucks = require('nunjucks');
nunjucks.configure('src/views', {
    // PASSANDO O SERVER PARA A CHAVE EXPRESS
    express: server,
    // NÃO GUARDA DADOS NA MEMÓRIA
    noCache: true,

})

server
// receber os dados do req.body (esconde os dados do formulario que aparecen na url)
.use(express.urlencoded({extended: true}))
// configuração dos arquivos estáticos(css, scripts e html)
.use(express.static("public"))
// ROTAS DE APLICAÇÃO
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
.post("/save-classes", saveClasses)
// START DO SERVIDOR
.listen(5500)


