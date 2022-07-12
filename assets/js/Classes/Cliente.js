
class Cliente{
    constructor() {
        this.name = ''
        this.age = 0
        this.date = ''
        this.professional = ''
        this.arrayClientes = []
        this.gender = ''
    }

    add() {
        this.getData()
        this.validate(cliente)
        this.register()
        $('#erroFormCad').css({
            display: "none"
        })
        this.lastRegister()
    }
    register() {
        $.ajax({
            url: 'http://localhost/cadastros/Admin/insertCliente',
            method: 'POST',
            data: {
                name: cliente.name,
                age: cliente.age,
                date: cliente.date,
                professional: cliente.professional
            },
            beforeSend: function () {
                $('.loader').css({
                    display: "block"
                })
            },
            complete: function () {
                $('.loader').css({
                    display: "none"
                }),
                    $('.complete').css({
                        display: "block",
                    }),
                    setTimeout(() => {
                        $('.complete').css({
                            display: "none"
                        })
                    }, 5000);
                $('#nomeCliente').val('')
                $('#idadeCliente').val('')
                $('#dataCliente').val('')
                $('#doCliente').val('Selecione o profissional')
            }
        })
        this.arrayClientes.push(cliente);
        this.id++;
    }
    getData() {
        let cliente = {}


        let radio = $("[name='gender']")
        for (let i = 0; i < radio.length; i++) {
            if (radio[i].checked) {
            let gender = radio[i].value
            }
        }

        this.name = $('#nomeCliente').val()
        this.age = $('#idadeCliente').val()
        this.date = $('#dataCliente').val()
        this.professional = $('#doCliente').val()

        cliente.name
        cliente.age
        cliente.date
        cliente.professional

        return cliente
    }
    validate(cliente) {
        if (cliente.name == '' || cliente.age == '' || cliente.date == '' || cliente.professional == '') {
            $('#erroFormCad').css({
                display: "block"
            })
            preventDefault()
        }
        return true
    }

    lastRegister() {
        let tbody = document.getElementById('tbody')
        tbody.innerText = ''
        for (let i = 0; i < this.arrayClientes.length; i++) {
            let tr = tbody.insertRow()


            let td_name = tr.insertCell()
            let td_age = tr.insertCell()
            let td_date = tr.insertCell()
            let td_professional = tr.insertCell()


            td_name.innerText = this.arrayClientes[i].name
            td_age.innerText = this.arrayClientes[i].age
            td_date.innerText = this.arrayClientes[i].date
            td_professional.innerText = this.arrayClientes[i].professional
        }
    }

}
var cliente = new Cliente()