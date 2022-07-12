<?php

namespace App\controller;

use App\model\Occupation;
use App\model\Employee;

class EmployeeController
{

    public function funcionarios()
    {
        $employee = new Employee;
        $cargo = new Occupation;

        $loader = new \Twig\Loader\FilesystemLoader('app/view/');
        $twig = new \Twig\Environment($loader, [
            'cache' => false,
        ]);
        $twig->addExtension(new \Twig\Extra\Intl\IntlExtension);
        $template = $twig->load('funcionarios.html');
        $parametros = array();
        $parametros['funcionarios'] = $employee->select();
        $parametros['cargos'] = $cargo->select();

        return $template->render($parametros);
    }

    public function insert()
    {
        $employee = new Employee;

        $name = filter_input(INPUT_POST, 'nomeEmp', FILTER_SANITIZE_SPECIAL_CHARS);
        $salary = filter_input(INPUT_POST, 'salEmp', FILTER_SANITIZE_SPECIAL_CHARS);
        $age = filter_input(INPUT_POST, 'idade', FILTER_SANITIZE_NUMBER_INT);
        $gender = filter_input(INPUT_POST, 'editGenderEmp', FILTER_SANITIZE_SPECIAL_CHARS);
        $occupation = filter_input(INPUT_POST, 'cargoFunc', FILTER_SANITIZE_SPECIAL_CHARS);

        if (empty($name)) {
            $resposta = ['status' => false, 'msg' => 1];
        } elseif (empty($salary)) {
            $resposta = ['status' => false, 'msg' => 2];
        } elseif (empty($age)) {
            $resposta = ['status' => false, 'msg' => 3];
        } elseif (empty($gender)) {
            $resposta = ['status' => false, 'msg' => 4];
        } elseif (empty($occupation)) {
            $resposta = ['status' => false, 'msg' => 5];
        } else {
            $employee->setName($name);
            $employee->setSalary($salary);
            $employee->setAge($age);
            $employee->setGender($gender);
            $employee->setOccupation($occupation);
            $employee->insert();
            $resposta = ['status' => true, 'msg' => 10];
        }
        return json_encode($resposta);
    }


    public function read()
    {
        $list = new Employee;
        $id = filter_input(INPUT_GET, 'id', FILTER_SANITIZE_NUMBER_INT);
        if (empty($id)) {
            $retorna = ['status' => false];
        } else {
            $dados = $list->selectIdFunc($id);
            $retorna = ['status' => true, 'dados' => $dados];
        }
        return json_encode($retorna);
    }


    public function update()
    {
        $employee = new Employee;
        $id = filter_input(INPUT_POST, 'editIdEmp', FILTER_SANITIZE_NUMBER_INT);
        $name = filter_input(INPUT_POST, 'editNameEmp', FILTER_SANITIZE_SPECIAL_CHARS);
        $salary = filter_input(INPUT_POST, 'EditMoneyEmp', FILTER_SANITIZE_NUMBER_INT);
        $age = filter_input(INPUT_POST, 'editAgeEmp', FILTER_SANITIZE_SPECIAL_CHARS);
        $gender = filter_input(INPUT_POST, 'editGenderEmp', FILTER_SANITIZE_SPECIAL_CHARS);
        $occupation = filter_input(INPUT_POST, 'editOccEmp', FILTER_SANITIZE_SPECIAL_CHARS);

        if (empty($id)) {
            $retorna = ['status' => false, 'msg' => 1];
        } elseif (empty($name)) {
            $retorna = ['status' => false, 'msg' => 2];
        } elseif (empty($salary)) {
            $retorna = ['status' => false, 'msg' => 3];
        } elseif (empty($age)) {
            $retorna = ['status' => false, 'msg' => 4];
        } elseif (empty($gender)) {
            $retorna = ['status' => false, 'msg' => 5];
        } elseif (empty($occupation)) {
            $retorna = ['status' => false, 'msg' => 6];
        } else {
            $employee->setId($id);
            $employee->setName($name);
            $employee->setSalary($salary);
            $employee->setAge($age);
            $employee->setGender($gender);
            $employee->setOccupation($occupation);
            $employee->edit();
            $retorna = ['status' => true, 'msg' => 10, 'name' => $name];
        }

        return json_encode($retorna);
    }
    public function delete()
    {
        $employee = new Employee;
        $id = filter_input(INPUT_GET, 'id', FILTER_SANITIZE_NUMBER_INT);
        if (empty($id)) {
            $retorna = ['status' => false];
        }else{
            $employee->delete($id);
            $retorna = ['status' => true];
        }
        return json_encode($retorna);
    }
}
