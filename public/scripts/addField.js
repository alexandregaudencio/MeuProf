document.querySelector("#add-time").addEventListener('click', clonefield)


// Node = estruturas HTML
// cloneNode = clona uma estrutura html
function clonefield() {
    // duplica o campo da página que pede os horáarios
    const newFieldContainer = document.querySelector('.schedule-item').cloneNode(true);

    // cria uma lista (fields) com os newFieldContainer criados
    const fields = newFieldContainer.querySelectorAll('input');

    // loop para limpar os novos campos
    fields.forEach(function(field) {
        field.value = "";
    } );


    // appendChild -> para criar um novo/ uma cópia
    document.querySelector('#schedule-items').appendChild(newFieldContainer)
}


