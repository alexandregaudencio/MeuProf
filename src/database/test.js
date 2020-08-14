const Database = require('./db')
const createProffy = require('./createProffy')


// O PARAMETRO db do Database em ./db
Database.then(async (db) => {
// INSERIR DADOS
    proffyValue = {
        // FICOU FALTANDO SÓ O CLASS_ID. ESSE VIRÁ PELO BANCO DE DADOS
        name: "Diego Fernandes", 
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4", 
        whatsapp: "21985033002", 
        bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões." 
    }

    classValue = {
            // FICOU FALTANDO SÓ O CLASS_ID. ESSE VIRÁ PELO BANCO DE DADOS
        subject: 1, 
        cost: "20"
    }

    classScheduleValues = [
        // FICOU FALTANDO SÓ O CLASS_ID. ESSE VIRÁ PELO BANCO DE DADOS
        {
            weekday: 1, 
            time_from: 720, 
            time_to: 1220
        },
        {
            weekday: 0, 
            time_from: 400, 
            time_to: 1020
        }
    ]
    
    await createProffy(db, {proffyValue, classValue, classScheduleValues})

    // CONSULTAR OS DADOS INSERIDOS 

})


