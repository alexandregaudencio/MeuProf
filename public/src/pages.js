const Database = require('./database/db')

// destruturando: recorre às variáveis criadas no outro aqui para que tenham o mesmo nome aqui
const {subjects, weekdays, getSubject, convertHoursToMinutes } = require('./utils/format')
// const { catch } = require('./database/db')

function pageLanding(req, res) {
    // RENDERIZANDO O ARQUIVO .html E IMPORTANTO O OBJETO PROFFYS
    return res.render("index.html")
}

async function pageStudy(req, res) {
    // QUERY.req (QUESTIONAR, PERGUNTAR) A REQUISIÇÃO : mostra os valores prenchidos apos apertar um botão. nem sei explicar isso direito.
    const filters = req.query
    
    if (!filters.subject || !filters.weekday || !filters.time) {
        return res.render("study.html", { filters, subjects, weekdays})
    }

    // converter horas em minutos
   const timeToMinutes = convertHoursToMinutes(filters.time)

    const query = `
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE EXISTS (
            SELECT class_schedule.*
            FROM class_schedule
            WHERE class_schedule.class_id = classes.id
            AND class_schedule.weekday = ${filters.weekday}
            AND class_schedule.time_from <= ${timeToMinutes}
            AND class_schedule.time_to > ${timeToMinutes}
        )
        AND classes.subject = '${filters.subject}'
    `

    // caso haja erro na hora da consulta do db
    try {
        const db = await Database
        const proffys = await db.all(query)

        proffys.map((proffy) => {
            proffy.subject = getSubject(proffy.subject)
        })
        
        return res.render('study.html', {proffys, subjects, filters, weekdays})
    } catch(error) {
        console.log(error)
    }  
}

function pageGiveClasses(req, res) {
    return res.render("give-classes.html", {subjects, weekdays})
    // CRIAÇÃO DE NOVOS PROFEESORES: NOVO DADOS NO PROFFYS
}

async function saveClasses(req, res) {
    const createProffy = require('./database/createProffy')
    
    
    const proffyValue = {
        name: req.body.name,
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio
    }

    const classValue = {
        subject: req.body.subject,
        cost: req.body.cost
    }

    const classScheduleValues = req.body.weekday.map((weekday, index) => {
        return {
            weekday,
            time_from: convertHoursToMinutes( req.body.time_from[index]),
            time_to: convertHoursToMinutes( req.body.time_to[index])
        }
    })
    
    try {
        const db = await Database
        await createProffy(db, {proffyValue, classValue, classScheduleValues})
        let queryString = "?subject=" + req.body.subject
        queryString += "&weekday=" + req.body.weekday[0]
        queryString += "&time=" + req.body.time_from[0]

        return res.redirect("/study" + queryString)

    } catch (error) {
        console.log(error)
    }
    
    // const data = req.body
    

    // guardando o valor de "data" na constante isNotEmpty
    // const isNotEmpty = Object.keys(data).length > 0
    // // ADICIONANDO dados A LISTA PROFFYS
    // if (isNotEmpty) {
    //    data.subject = getSubject(data.subject)
       
    //     proffys.push(data)
   
}


module.exports = {
 pageLanding,
 pageStudy,
 pageGiveClasses, 
 saveClasses
}
