
class CrudEmp {
    constructor() {
        this.name = ''
        this.age = 0
        this.salary = 0
        this.occupation = ''
        this.gender = ''
        this.id = 0

    }

    updateFunc() {
        this.getData()
        this.register(crudEmp)
        $('#erroFormCad').css({
            display: "none"
        })
    }
    async register(crudEmp) {
        await $.ajax({
            url: 'http://localhost/cadastros/Employee/editar',
            method: 'POST',
            data: {
                id: crudEmp.id,
                name: crudEmp.name,
                salary: crudEmp.salary,
                age: crudEmp.age,
                gender: crudEmp.gender,
                occupation: crudEmp.occupation
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

            }
        })


    }
    getData() {
        let crudEmp = {}

        this.id = $('#editId').val()
        this.name = $('#editNameEmp').val()
        this.salary = $('#EditMoneyEmp').val()
        this.gender = $('#editGenderEmp').val()
        this.age = $('#editAgeEmp').val()
        this.occupation = $('#editOccEmp').val()
        
        crudEmp.id
        crudEmp.name
        crudEmp.salary
        crudEmp.age
        crudEmp.gender
        crudEmp.occupation

        return crudEmp
    }
}
var crudEmp = new CrudEmp()
