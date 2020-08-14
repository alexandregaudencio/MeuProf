module.exports = async function(db, {proffyValue, classValue, classScheduleValues}) {
    // INSERIR DADOS NA TABELA TEACHERS
    // await : ESPERA O DB RODAR. 
    // await NÃO RODA DENTRO DE FUNÇÃO SEM O async
    const insertedProffy =  await db.run(`
        INSERT INTO proffys (
            name,
            avatar,
            whatsapp,
            bio
        ) VALUES (
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
            "${proffyValue.bio}"
        );
    `)   
    const proffy_id = insertedProffy.lastID

    // INSERIR PROXIMOS DADOS NA TABELA CLASSES
    const insertedClass = await db.run(`
        INSERT INTO classes (
            subject,
            cost, 
            proffy_id
        ) VALUES (
            "${classValue.subject}",
            "${classValue.cost}",
            "${proffy_id}"
        );
    `)
    const class_id = insertedClass.lastID

    // INSERIR PROXIMOS DADOS NA TABELA CLASS_SCHADULE
    const insertedAllClassScheduleValues = classScheduleValues.map((ClassScheduleValue) => {
        return db.run(`
            INSERT INTO class_schedule (
                class_id,
                weekday,
                time_from,
                time_to
            ) VALUES (
                "${class_id}",
                "${ClassScheduleValue.weekday}",
                "${ClassScheduleValue.time_from}",
                "${ClassScheduleValue.time_to}"
            );
        `)
    })
    // AQUI VAI RODAR TODOS OS db.run() DAS CLASSES_SCHEDULES
    // await Promise.all(insertedAllClassScheduleValues)


    // consultar os dados inseridos

    // todos os proffys
    const selectedProffys = await db.all("SELECT * FROM proffys")
    // console.log(selectedProffys)

    // consultar as classes de um determinado professor
    // e trazer junto os dados dele
    const selectClassesAndProffys = await db.all(`
    SELECT classes.*, proffys.*
    FROM proffys
    JOIN classes ON (classes.proffy_id = proffys.id)
    WHERE classes.proffy_id = 1;
    `)
    //  console.log(selectClassesAndProffys)


    // O horárioq eu a pessoa trabalho é 8h as 18h
    // //time_from (8h) precisa ser melhor que o horário solicitado
    // //time_to ( ) precisa ser acima do horário solicitado
    const selectClassesSchedules = await db.all(`
    SELECT class_schedule.*
    FROM class_schedule
    WHERE class_schedule.class_id = 1
    AND class_schedule.weekday = "0"
    AND class_schedule.time_from <= "520"
    AND class_schedule.time_to > "1050"
    `)

    console.log(selectClassesSchedules)

}


