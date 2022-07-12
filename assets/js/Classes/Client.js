
class Cliente {
    constructor() {
        this.name = ''
        this.age = 0
        this.date = ''
        this.professional = ''
        this.arrayClientes = []
        this.gender = ''
        this.time = 0
    }

    add() {
        this.getData()
      
        this.register()
        $('#msg').html('<div id="msg" class="bg-success text-light p-2 rounded-3"> Agendamento marcado para ' + cliente.name + '</div>')
        $('#erroFormCad').css({
            display: "none"
        })
    }
    async register() {
        await $.ajax({
            url: 'http://localhost/cadastros/Client/insert',
            method: 'POST',
            data: {
                name: cliente.name,
                age: cliente.age,
                gender: cliente.gender,
                time: cliente.time,
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
                $('#time').val('')
            }
        })
    }
    getData() {
        let cliente = {}

        this.name = $('#nomeCliente').val()
        this.age = $('#idadeCliente').val()
        this.gender = $("input:checked").val()
        this.date = $('#dataCliente').val()
        this.time = $('#time').val()
        this.professional = $('#doCliente').val()
        
        cliente.name
        cliente.age
        cliente.gender
        cliente.date
        cliente.professional
        cliente.time
        
        return cliente
    }
  
}
var cliente = new Cliente()