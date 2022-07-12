
const formCliente = document.getElementById('cadastroCliente')


$('#cadastro-btn').on("click", () => {

    $('#complete').html('')
    $('#erroCard').html('')

    $('#empty-cliente-1').html('')
    $('#empty-cliente-2').html('')
    $('#empty-cliente-3').html('')
    $('#empty-cliente-4').html('')
    $('#empty-cliente-6').html('')
})
$('#editar-btn').on("click", () => {
    $('#complete').html('')
    $('#erroCard').html('')

    $('#empty-cliente-edit-1').html('')
    $('#empty-cliente-edit-2').html('')
    $('#empty-cliente-edit-3').html('')
    $('#empty-cliente-edit-4').html('')
    $('#empty-cliente-edit-6').html('')
})
if (formCliente) {
    formCliente.addEventListener('submit', async (e) => {
        e.preventDefault()

        const dadosCliente = new FormData(formCliente)

        let cadastroUrl = () => {
            return fetch('http://localhost/register-crud-master/Client/insert', {
                method: "POST",
                body: dadosCliente
            })
        }

        try {
            $('.loader').css({ display: "block" })
            const agendar = await cadastroUrl()
            const resposta = await agendar.json()

            if (resposta.status === true) {
                $('.loader').css({ display: "none" })

                $('#name').val('')
                $('#age').val('')
                $('#date').val('')
                $('#time').val('')

                $('#empty-cliente-1').html('')
                $('#empty-cliente-2').html('')
                $('#empty-cliente-3').html('')
                $('#empty-cliente-4').html('')
                $('#empty-cliente-6').html('')

                $('#completeCliente').html('<div class="bg-success  rounded-3 mt-2 text-center"><p class="text-light p-2">Agendamento marcado para ' + resposta.name + ' as ' + resposta.time + '</p></div>')

            } else {
                if (resposta.msg === 1) {
                    $('#empty-cliente-1').html('<div class="alert alert-danger border-top-0 border-danger" role="alert">O nome do cliente não foi informado</div>')

                } else if (resposta.msg === 2) {
                    $('#empty-cliente-2').html('<div class="alert alert-danger border-top-0 border-danger" role="alert">A idade do cliente não foi informada</div>')

                } else if (resposta.msg === 3) {
                    $('#empty-cliente-3').html('<div class="alert alert-danger border-top-0 border-danger" role="alert">O genero do cliente não foi informado</div>')

                } else if (resposta.msg === 4) {
                    $('#empty-cliente-4').html('<div class="alert alert-danger border-top-0 border-danger" role="alert">A data não foi informada</div>')

                } else if (resposta.msg === 5) {
                    $('#empty-cliente-4').html('<div class="alert alert-danger border-top-0 border-danger" role="alert">O horário da consulta não foi informado</div>')

                } else if (resposta.msg === 6) {
                    $('#empty-cliente-6').html('<div class="alert alert-danger border-top-0 border-danger" role="alert">O profissional não foi informado</div>')
                }

                $('.loader').css({ display: "none" })
            }

        } catch (error) {
            $('#erroCard').html('<span class="bg-danger p-2 text-ight roulnded-2">Erro ao cadastrar cliente</span>' + error)
        }

    })
}


async function edit(id) {

    try {
        const dados = await fetch('http://localhost/register-crud-master/Client/read?id=' + id)
        const resposta = await dados.json()

        if (resposta.status === true) {
            editModal.show()

            $('#editId').val(resposta.dados.id)
            $('#editNomeCliente').val(resposta.dados.name)
            $('#editIdadeCliente').val(resposta.dados.age)
            $('#editGender').val(resposta.dados.gender)
            $('#editDataCliente').val(resposta.dados.scheduling)
            $('#editTime').val(resposta.dados.time)

            let option = document.createElement("option")
            option.setAttribute("value", resposta.dados.professional)
            let text = document.createTextNode(resposta.dados.professional)
            option.appendChild(text)
            document.getElementById("doutorCliente").appendChild(option)
            option.setAttribute("selected", resposta.dados.professional)

        } else {
            $('#erro-view-edit').html(' <div class="bg-danger text-light text-center p-2 rounded-2">Algo deu errado</div>')
        }
    } catch (error) {
        console.log('Erro ' + error)
        $('#erro-view-edit').html(' <div class="bg-danger text-light text-center p-2 rounded-2">Falha ao visualizar dados</div>')

    }


}
const deleteModal = new bootstrap.Modal($('#deleteModal'))

async function view(id) {
    try {

        const dados = await fetch('http://localhost/register-crud-master/Client/read?id=' + id)
        const resposta = await dados.json()
        if (resposta.status === true) {
            deleteModal.show()
            $('#nome').text(resposta.dados.name)
            $('#delId').val(resposta.dados.id)
        } else {
            $('#erroView').html('<div class="alert alert-danger border-top-0 border-danger" role="alert">Algo deu errado</div>')
            console.log('ERRO')
        }

    } catch (error) {
        console.log('ERRO ' + error)
        $('#erroView').html('<div class="alert alert-danger border-top-0 border-danger" role="alert">Algo deu errado</div>')
    }

    let btnDelClient = $('#delete-client-modal')
    btnDelClient.on('click', async () => {

        let deleteClientUrl = () => {
            return fetch('http://localhost/register-crud-master/Client/delete?id=' + id)
        }
        try {
            const deleteClient = await deleteClientUrl()
            const resposta = await deleteClient.json()
            if (resposta.status === true) {
                $('#msg-delete-cliente').html('<div id="msg" class="bg-success text-light p-2 rounded-3"> Consulta de  ' + $('#nome').text() + ' concluida </div>')
            } else {
                $('#msg-delete-cliente').text('Erro ao deletar cliente')
            }
        } catch (error) {
            console.log('errro' + error)
        }
    })
}

async function del() {
    try {
        let id = $('#delId').val()

        const dados = await fetch('http://localhost/register-crud-master/Client/delete?id=' + id)
        const resposta = await dados.json()

    } catch (error) {
        deleteModal.toggle()
    }
}

const formEditar = document.getElementById('formEditar')
if (formEditar) {
    formEditar.addEventListener('submit', async (e) => {
        e.preventDefault()

        const editarDados = new FormData(formEditar)

        let updateUrl = () => {
            return fetch('http://localhost/register-crud-master/Client/update', {
                method: "POST",
                body: editarDados
            })
        }
        try {
            $('.loader').css({ display: "block" })
            const update = await updateUrl()
            const resposta = await update.json()

            if (resposta.status === true) {
                $('.loader').css({ display: "none" })

                $('#empty-cliente-edit-1').html('')
                $('#empty-cliente-edit-2').html('')
                $('#empty-cliente-edit-3').html('')
                $('#empty-cliente-edit-4').html('')
                $('#empty-cliente-edit-6').html('')

                $('#complete-edit-Cliente').html('<div class="bg-success  rounded-3 mt-2 text-center"><p class="text-light p-2">Consulta de : ' + resposta.name + ' foi editada, hora da consulta:' + resposta.time + 'hrs,  dia: ' + resposta.date + ', com o doutor(a): ' + resposta.professional + '</p></div>')

            } else {
                if (resposta.msg === 1) {
                    $('#empty-cliente-edit-1').html('<div class="alert alert-danger border-top-0 border-danger" role="alert">O nome do cliente não foi informado</div>')

                } else if (resposta.msg === 2) {
                    $('#empty-cliente-edit-2').html('<div class="alert alert-danger border-top-0 border-danger" role="alert">A idade do cliente não foi informado</div>')

                } else if (resposta.msg === 3) {
                    $('#empty-cliente-edit-3').html('<div class="alert alert-danger border-top-0 border-danger" role="alert">O gênero do cliente não foi informado</div>')

                } else if (resposta.msg === 4) {
                    $('#empty-cliente-edit-4').html('<div class="alert alert-danger border-top-0 border-danger" role="alert">O Data da consulta não foi informada</div>')

                } else if (resposta.msg === 5) {
                    $('#empty-cliente-edit-4').html('<div class="alert alert-danger border-top-0 border-danger" role="alert">O horário da consulta não foi informado</div>')

                } else if (resposta.msg === 6) {
                    $('#empty-cliente-edit-6').html('<div class="alert alert-danger border-top-0 border-danger" role="alert">O professioanl não foi informado</div>')

                }
                $('.loader').css({ display: "none" })
            }

        } catch (error) {
            if (resposta.msg === 0) {
                $('#erroCard').html('<span class="bg-danger p-2 text-light rounded-2">Falha ao editar cliente</span>' + error)
            }
            $('#erroCard').html('<span class="bg-danger p-2 text-light rounded-2">Falha ao editar cliente</span>' + error)
            $('.loader').css({ display: "none" })
            console.log('Erro  ' + error)
        }

    })
}
