const subjects = [ 
    "Artes",
    "Biologia",
    "Ciências",
    "Educação física",
    "Física",
    "Geografia",
    "História",
     "Matemática",
    "Português",
    "Química",
    "informática"
]

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
]

function getSubject(subjectNumber) {
   const arrayPosition = +subjectNumber - 1
    return subjects[arrayPosition]

}

function convertHoursToMinutes(time) {
    // split : separa os valores entre um caractere (?, :, por exemplo
    //     e ) e guarda os valores em um array
    const [hour, minutes] = time.split(":")
    return Number((hour*60) + minutes)


}

module.exports = {
    subjects,
    weekdays,
    getSubject,
    convertHoursToMinutes
}