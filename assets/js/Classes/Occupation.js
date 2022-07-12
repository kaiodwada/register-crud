class Occupation {
    constructor() {
        this.occupation = ''
        this.vacancies = ''
        this.description = ''
    }

    insert() {
        this.getData()
        this.add(occupation)
    }

    getData() {
        let occupation = {}

        this.occupation = $('#nomeCargo').val()
        this.vacancies = $('#vagasCargo').val()
        this.description = $('#desc').val()

        occupation.occupation
        occupation.vacancies
        occupation.description

        return occupation
    }

    async add() {
        await $.ajax({
            url: 'http://localhost/cadastros/Occupation/insert',
            method: 'POST',
            data: {
                occupation: occupation.occupation,
                vacancies: occupation.vacancies,
                description: occupation.description
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
                    }, 5000)
                    $('#nomeCargo').val('')
                    $('#vagasCargo').val('')
                    $('#desc').val('')
            }
        })
    }

}
var occupation = new Occupation