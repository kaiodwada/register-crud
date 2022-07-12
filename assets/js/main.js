
$(document).ready(function () {
    $('#Table').DataTable({
        "pagingType": "simple_numbers",
        "lengthChange": false,
        "processing": true,
        "language": {
            "lengthMenu": "Exibindo _MENU_ registros por página",
            "zeroRecords": "Nada foi encontrado",
            "info": "Exibindo página _PAGE_ de _PAGES_",
            "infoEmpty": "Nenhum registro encontrado",
            "infoFiltered": "(filtrado de _MAX_  registros)",
            "search": "Procurar",
            "paginate": {
                "sNext": '<span class="pagination text-danger"> Next</span>',
                "sPrevious": '<span class="pagination text-danger"> Prev </span>'
            }
        },
    })

})


//formatter.format(2500)

$('#cadastrarCliente').on("click", function(){
    location.href = 'http://localhost/register-crud-master/Client/clientes'
})
$('#cadastrarFuncionario').on("click", function(){
    location.href = 'http://localhost/register-crud-master/Employee/funcionarios'
})
const editModal = new bootstrap.Modal($('#editClientModal'))



