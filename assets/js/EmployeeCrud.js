
$('#cadastrar-funcionarios').on('click', () => {
    $('#complete').html('')
    $('#erroCadastro').html('')
    $('#empty-funcionario-1').html('')
    $('#empty-funcionario-2').html('')
    $('#empty-funcionario-3').html('')
    $('#empty-funcionario-4').html('')
    $('#empty-funcionario-5').html('')
})
$('.edit-btn-emp').on('click', () => {
    $('#complete').html('')
    $('#erroCadastro').html('')
    $('#empty-edit-2-funcionario').html('')
    $('#empty-edit-3-funcionario').html('')
    $('#empty-edit-4-funcionario').html('')
    $('#empty-edit-5-funcionario').html('')
    $('#empty-edit-6-funcionario').html('')
})


const formEmp = document.getElementById('formFuncionario')
if (formEmp) {
    formEmp.addEventListener('submit', async (e) => {
        e.preventDefault()
        const formData = new FormData(formEmp)
        let idade = myAge(new Date($('#idadeEmp').val()))
        formData.append('idade', idade)
        let employeeUrl = () => {
            return fetch('http://localhost/register-crud-master/Employee/insert', {
                method: "POST",
                body: formData
            })
        }
        try {
            $('.loader').css({ display: "block" })
            const cadastrar = await employeeUrl()
            const resposta = await cadastrar.json()

            if (resposta.status === true) {
                console.log(resposta)

                $('#empty-funcionario-1').html('')
                $('#empty-funcionario-2').html('')
                $('#empty-funcionario-3').html('')
                $('#empty-funcionario-4').html('')
                $('#empty-funcionario-5').html('')

                $('#nomeEmp').val('')
                $('#salEmp').val('')
                $('#idadeEmp').val('')
                $('#gender').val('')

                $('.loader').css({ display: "none" })
                $('#complete').html('<div class="bg-success  rounded-3 mt-2 text-center"><p class="text-light p-2">Sucesso ao cadastrar</p></div>')
            } else {
                if (resposta.msg === 1) {
                    $('#empty-funcionario-1').html('<div class="alert alert-danger border-top-0 border-danger" role="alert">O nome do funcionario não foi informado</div>')

                } else if (resposta.msg === 2) {
                    $('#empty-funcionario-2').html('<div class="alert alert-danger border-top-0 border-danger" role="alert">O salário do funcionario não foi informado</div>')

                } else if (resposta.msg === 3) {
                    $('#empty-funcionario-3').html('<div class="alert alert-danger border-top-0 border-danger" role="alert">A idade do funcionario não foi informada</div>')

                } else if (resposta.msg === 4) {
                    $('#empty-funcionario-4').html('<div class="alert alert-danger  border-danger" role="alert">O gênero do funcionario não foi informado</div>')

                } else if (resposta.msg === 5) {
                    $('#empty-funcionario-5').html('<div class="alert alert-danger border-top-0 border-danger" role="alert">O cargo do funcionario não  foi informado</div>')
                }
                $('.loader').css({ display: "none" })
            }
        } catch (error) {
            console.log('Erro  ' + error)
            $('.loader').css({ display: "none" })
            $('#erroCadastro').html('<div class="bg-danger rounded-3 mt-2 text-center"><p class="text-light p-2">Falha ao cadastrar</p></div>')
        }

    })
}

const dataFormEditEmp = document.getElementById('formEditEmp')

if (dataFormEditEmp) {
    dataFormEditEmp.addEventListener("submit", async (e) => {
        e.preventDefault()
        const dataEditForm = new FormData(dataFormEditEmp)

        const updateEmp = () => {
            return fetch('http://localhost/register-crud-master/Employee/update', {
                method: "POST",
                body: dataEditForm
            })
        }
        try {
            $('.loader').css({ display: "block" })

            const updateEmpData = await updateEmp()
            const resposta = await updateEmpData.json()



            if (resposta.status === true) {
                $('#erroCadastro').html('')
                $('#empty-edit-2-funcionario').html('')
                $('#empty-edit-3-funcionario').html('')
                $('#empty-edit-4-funcionario').html('')
                $('#empty-edit-5-funcionario').html('')
                $('#empty-edit-6-funcionario').html('')

                $('.loader').css({ display: "none" })
                $('#complete-edit-Emp').html('<div class="bg-success  rounded-3 mt-2 text-center"><p class="text-light p-2">Sucesso ao editar funcionario: ' + resposta.name + '</p></div>')
            } else {
                $('.loader').css({ display: "none" })
                if (resposta.msg === 1) {
                    $('#empty-edit-2-funcionario').html('<div class="alert alert-danger border-top-0 border-danger" role="alert">O id não existe</div>')

                } else if (resposta.msg === 2) {
                    $('#empty-edit-2-funcionario').html('<div class="alert alert-danger border-top-0 border-danger" role="alert">O nome do funcionario não foi informado</div>')

                } else if (resposta.msg === 3) {
                    $('#empty-edit-3-funcionario').html('<div class="alert alert-danger border-top-0 border-danger" role="alert">O salário do funcionario não foi informado</div>')

                } else if (resposta.msg === 4) {
                    $('#empty-edit-4-funcionario').html('<div class="alert alert-danger border-top-0 border-danger" role="alert">A idade do funcionario não foi informada</div>')

                } else if (resposta.msg === 5) {
                    $('#empty-edit-5-funcionario').html('<div class="alert alert-danger border-top-0 border-danger" role="alert">O gênero do funcionario não foi informado</div>')

                } else if (resposta.msg === 6) {
                    $('#empty-edit-6-funcionario').html('<div class="alert alert-danger border-top-0 border-danger" role="alert">O cargo do funcionario não foi informado</div>')

                }
            }
        } catch (error) {
            console.log(error)
            $('#erro-edit-FormCad').html('<div class="bg-danger rounded-3 mt-2 text-center"><p class="text-light p-2">Falha ao cadastrar tente novamente!</p></div>')
            $('.loader').css({ display: "none" })
        }
    })
}

function myAge(myDate) {
    const zero = new Date(0)
    const diff = new Date(Date.now() - myDate.getTime())
    return (diff.getUTCFullYear() - zero.getUTCFullYear())
}
 

async function editEmp(id) {
    const dados = await fetch('http://localhost/register-crud-master/Employee/read?id=' + id)
    const resposta = await dados.json()
    const EmpModal = new bootstrap.Modal($('#editEmpModal'))

    if (resposta.status === true) {
        EmpModal.show()
        $('#editId').val(resposta.dados.id)
        $('#editNameEmp').val(resposta.dados.name)
        $('#EditMoneyEmp').val(resposta.dados.salary)
        $('#editAgeEmp').val(resposta.dados.age)
        $('#editGenderEmp').val(resposta.dados.gender)
        $('#editOccEmp').val(resposta.dados.occupation)
    } else {
        console.log('Falha')
    }
}

async function viewEmp(id) {

    try {
        const dados = await fetch('http://localhost/register-crud-master/Employee/read?id=' + id)
        const resposta = await dados.json()
        const deleteEmpModal = new bootstrap.Modal($('#deleteEmp'))

        if (resposta.status === true) {
            deleteEmpModal.show()
            $('#nome').val(resposta.dados.name)
            $('#idade').val(resposta.dados.age)
            $('#genero').val(resposta.dados.gender)
            $('#salario').val(resposta.dados.salary)
            $('#cargo').val(resposta.dados.occupation)
            $('#empDelId').val(resposta.dados.id)
        }
    } catch (error) {
        console.log('Erro ' + error)
    }
    let btnDelEmp = $('#del-emp-modal')
    btnDelEmp.on('click', async () => {
        let deleteUrlEmp = () => {
            return fetch('http://localhost/register-crud-master/Employee/delete?id=' + id)
        }
        try {
            const deleteEmp = await deleteUrlEmp()
            const resposta = await deleteEmp.json()
            if (resposta.status === true) {
                $('#msg-delete-complete').html('<div class="bg-success  rounded-3 mt-2 text-center"><p class="text-light p-2">Funcionario: ' + $('#nome').val() + ' deletado</p></div>')
                console.log('certo')
            } else {
                console.log('errado')
            }
        } catch (error) {
            console.log('erro ' + error)
        }
    })
}
