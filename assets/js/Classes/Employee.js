
class Employee {
    constructor() {
        this.name = ''
        this.age = 0
        this.gender = ''
        this.salary = 0
        this.occupation = ''
        this.arrayEmployee = []

    }

    add() {
        this.getData()
        this.validate(employee)
        this.register()
        $('#erroFormCad').css({
            display: "none"
        })
    }
    async register() {
        await $.ajax({
            url: 'http://localhost/cadastros/Employee/insert',
            method: 'POST',
            data: {
                name: employee.name,
                age: employee.age,
                salary: employee.salary,
                gender: employee.gender,
                occupation: employee.occupation
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

                $('#nomeEmp').val('')
                $('#salEmp').val('')
                $('#idadeEmp').val('')
            }
        })
        this.arrayEmployee.push(employee)

    }
    getData() {
        let employee = {}

        this.name = $('#nomeEmp').val()
        this.salary = $('#salEmp').val()
        this.age = myAge(new Date($('#idadeEmp').val()))
        this.gender = $("input:checked").val()
        this.occupation = $('#cargoFunc').val()

        employee.name
        employee.age
        employee.salary
        employee.gender
        employee.occupation

        return employee
    }
    validate(employee) {
        if (employee.name == '' || employee.age == '' || employee.salary == '' || employee.gender == '' || employee.occupation == '') {
            $('#erroFormCad').css({
                display: "block"
            })
            return false
        }
        return true
    }

}
var employee = new Employee()

