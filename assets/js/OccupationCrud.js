const formCargo = document.getElementById('formCargo')
$('#cadastrar-cargo').on('click', () => {
    $('#completeCargo').html('')
    $('#erroCargo').html('')
    $('#empty-1').html('')
    $('#empty-2').html('')
    $('#empty-3').html('')
})

$('.btn-occ-edit').on('click', () => {
    $('#empty-edit-occ-1').html('')
    $('#empty-edit-occ-2').html('')
    $('#empty-edit-occ-3').html('')
    $('#sucesso-edit-cargo').html('')
    $('#erroOcc').html('')
})
$('.btn-occ-del').on('click', () => {
    $('#empty-edit-occ-1').html('')
    $('#empty-edit-occ-2').html('')
    $('#empty-edit-occ-3').html('')
    $('#sucesso-edit-cargo').html('')
    $('#erroOcc').html('')
})

if (formCargo) {
    formCargo.addEventListener('submit', async (e) => {
        e.preventDefault()
        const dadosFormCargo = new FormData(formCargo)

        let urlCargo = () => {
            return fetch('http://localhost/cadastros/Occupation/insert', {
                method: "POST",
                body: dadosFormCargo
            })
        }
        try {
            $('.loader').css({ display: "block" })
            const dataCargo = await urlCargo()
            const resposta = await dataCargo.json()

            if (resposta.status === true) {
                $('.loader').css({ display: "none" })

                $('#empty-1').html('')
                $('#empty-2').html('')
                $('#empty-3').html('')

                $('#nomeCargo').val('')
                $('#vagasCargo').val('')
                $('#desc').val('')

                $('#completeCargo').html('<div class="bg-success  rounded-3 mt-2 text-center"><p class="text-light p-2">Cargo cadastrado</p></div>')
            } else {
                if (resposta.msg === 1) {
                    $('#empty-1').html('<div class="alert alert-danger border-top-0 border-danger" role="alert">O nome do cargo não foi informado</div>')
                } else if (resposta.msg === 2) {
                    $('#empty-2').html('<div class="alert alert-danger  border-danger" role="alert">O numero de vagas não foi informado</div>')
                } else if (resposta.msg === 3) {
                    $('#empty-3').html('<div class="alert alert-danger border-top-0 border-danger" role="alert">A descrição do cargo não foi informada</div>')
                }
                $('.loader').css({ display: "none" })
            }
        } catch (error) {
            $('.loader').css({ display: "none" })
            $('#completeCargo').html('')
            $('#erroCargo').html('<div class="bg-danger mx-2 justify-content-center rounded-3 mt-2 text-center"><p class="text-light p-2">Falha ao cadastrar</p></div>' + error)
        }
    })
}

const editOccModal = new bootstrap.Modal($('#editOccupationModal'))
async function viewCrud(id) {
    let viewUrlOcc = () => {
        return fetch('http://localhost/cadastros/Occupation/read?id=' + id)
    }
    try {
        $('.loaderOccupation').css({ display: "block" })

        const dados = await viewUrlOcc()
        const resposta = await dados.json()

        if (resposta.status === true) {
            editOccModal.show()
            $('#editNomeCargo').val(resposta.data.occupation)
            $('#editVagaCargo').val(resposta.data.vacancies_filled)
            $('#editDescCargo').val(resposta.data.description)

            $('.loaderOccupation').css({ display: "none" })
        } else {
            console.log('Erro ao visualizar dados')
        }
    } catch (error) {

    }
}
const modalOccDel = new bootstrap.Modal($('#deleteOcc'))
async function viewCrudOccupation(id) { 
    modalOccDel.show()
    let viewUrlOcc = () => {
        return fetch('http://localhost/cadastros/Occupation/read?id=' + id)
    }
    try {
        const id = await viewUrlOcc()
        const resposta = await id.json()
        if (resposta.status === true) {
            $('#idOccDel').val(resposta.data.id)
            $('#cargoOccDel').val(resposta.data.occupation)
           
        }else{
            console.log('falha')
        }
    } catch (error) {
        console.log('erro')
    }
    let btnDel = $('#deleteOccBtn')

    btnDel.on('click', async () =>{

       let deleteUrl = () => {
           return fetch('http://localhost/cadastros/Occupation/delete?id=' + id)
       }
       try {
           const deletar = await deleteUrl()
           const resposta = await deletar.json()

           if(resposta.status === true){
            $('#msg-delete-complete').html('<div class="bg-success  rounded-3 mt-2 text-center"><p class="text-light p-2">Cargo de '+ $('#cargoOccDel').val() +'  deletado</p></div>')
           }else{
               console.log('erro')
           }
       } catch (error) {
           console.log('erro ' + error)
       }
    })
}

const formEditCargo = document.getElementById('editOccupationForm')
if (formEditCargo) {
    formEditCargo.addEventListener('submit', async (e) => {
        e.preventDefault()

        const formDataEditOcc = new FormData(formEditCargo)
        let editUrlOcc = () => {
            return fetch('http://localhost/cadastros/Occupation/update', {
                method: "POST",
                body: formDataEditOcc
            })
        }
        try {
            $('.loaderOccupation').css({ display: "block" })
            const update = await editUrlOcc()
            const resposta = await update.json()

            if (resposta.status === true) {
                $('.loaderOccupation').css({ display: "none" })
                $('#empty-edit-occ-1').html('')
                $('#empty-edit-occ-2').html('')
                $('#empty-edit-occ-3').html('')
                $('#erroOcc').html('')
                $('#sucesso-edit-cargo').html('<p class="text-light p-2">Cargo alterado com sucesso!!</p>')
            } else {
                $('#erroOcc').html('')
                $('.loaderOccupation').css({ display: "none" })
                if (resposta.msg === 1) {
                    $('#empty-edit-occ-1').html('<div class="alert alert-danger border-top-0 border-danger" role="alert">O nome do cargo não foi informado</div>')
                } else if (resposta.msg === 2) {
                    $('#empty-edit-occ-2').html('<div class="alert alert-danger  border-danger" role="alert">O numero de vagas não foi informado</div>')
                } else if (resposta.msg === 3) {
                    $('#empty-edit-occ-3').html('<div class="alert alert-danger border-top-0 border-danger" role="alert">A descrição do cargo não foi informada</div>')
                }
            }

        } catch (error) {
            console.log('Falha' + error)
            $('.loaderOccupation').css({ display: "none" })
            $('#erroOcc').html('<div class="bg-danger p-2 text-light rounded-2 text-center">Falha ao editar</div>')
        }
    })
}