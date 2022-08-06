<?php

namespace App\controller;

use App\model\Client;
use App\model\Employee;
use App\http\FormRequest;

class ClientController
{

    public function clientes()
    {
        $list_clients = new Client;
        $func = new Employee;
        $loader = new \Twig\Loader\FilesystemLoader('app/view/');
        $twig = new \Twig\Environment($loader, [
            'cache' => false,
        ]);
        $template = $twig->load('clientes.html');

        $parametros = array();
        $parametros['clientes'] = $list_clients->select();
        $parametros['funcionarios'] = $func->select();
        return $template->render($parametros);
    }

    public function insert()
    {
        $cliente = new Client;

        $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_SPECIAL_CHARS);
        $age = filter_input(INPUT_POST, 'age', FILTER_SANITIZE_NUMBER_INT);
        $gender = filter_input(INPUT_POST, 'gender', FILTER_SANITIZE_SPECIAL_CHARS);
        $date = filter_input(INPUT_POST, 'date', FILTER_SANITIZE_NUMBER_INT);
        $time = filter_input(INPUT_POST, 'time', FILTER_SANITIZE_SPECIAL_CHARS);
        $professional = filter_input(INPUT_POST, 'professional', FILTER_SANITIZE_SPECIAL_CHARS);

        if (empty($name)) {
            $retorna = ['status' => false, 'msg' => 1];
        } elseif (empty($age)) {
            $retorna = ['status' => false, 'msg' => 2];
        } elseif (empty($gender)) {
            $retorna = ['status' => false, 'msg' => 3];
        } elseif (empty($date)) {
            $retorna = ['status' => false, 'msg' => 4];
        } elseif (empty($time)) {
            $retorna = ['status' => false, 'msg' => 5];
        } elseif (empty($professional)) {
            $retorna = ['status' => false, 'msg' => 6];
        } else {
            $cliente->setName($name);
            $cliente->setAge($age);
            $cliente->setGender($gender);
            $cliente->setScheduling($date);
            $cliente->setTime($time);
            $cliente->setProfessional($professional);
            $cliente->insert();

            $retorna = ['status' => true, 'msg' => 10, 'name' => $name, 'time' => $time];
        }

        return json_encode($retorna);
    }

    public function read()
    {
        $list_clients = new Client;
        $id =  filter_input(INPUT_GET, 'id', FILTER_SANITIZE_NUMBER_INT);

        if (empty($id)) {
            $retorna = ['status' => false, 'msg' => 0];
        } else {
            $dados = $list_clients->selectId($id);
            $retorna = ['status' => true, 'msg' => 1, 'dados' => $dados];
        }
        return json_encode($retorna);
    }

    public function update()
    {
        $update = new Client;

        $id = filter_input(INPUT_POST, 'editId', FILTER_SANITIZE_NUMBER_INT);
        $name = filter_input(INPUT_POST, 'editNomeCliente', FILTER_SANITIZE_SPECIAL_CHARS);
        $age = filter_input(INPUT_POST, 'editIdadeCliente', FILTER_SANITIZE_NUMBER_INT);
        $gender = filter_input(INPUT_POST, 'editGender', FILTER_SANITIZE_SPECIAL_CHARS);
        $scheduling = filter_input(INPUT_POST, 'editDataCliente', FILTER_SANITIZE_SPECIAL_CHARS);
        $time = filter_input(INPUT_POST, 'editTime', FILTER_SANITIZE_SPECIAL_CHARS);
        $professional = filter_input(INPUT_POST, 'doutorCliente', FILTER_SANITIZE_SPECIAL_CHARS);

        if (empty($id)) {
            $retorna = ['status' => false, 'msg' => 0];
        } elseif (empty($name)) {
            $retorna = ['status' => false, 'msg' => 1];
        } elseif (empty($age)) {
            $retorna = ['status' => false, 'msg' => 2];
        } elseif (empty($gender)) {
            $retorna = ['status' => false, 'msg' => 3];
        } elseif (empty($scheduling)) {
            $retorna = ['status' => false, 'msg' => 4];
        } elseif (empty($time)) {
            $retorna = ['status' => false, 'msg' => 5];
        } elseif (empty($professional)) {
            $retorna = ['status' => false, 'msg' => 6];
        } else {
            $update->setId($id);
            $update->setName($name);
            $update->setAge($age);
            $update->setGender($gender);
            $update->setScheduling($scheduling);
            $update->setTime($time);
            $update->setProfessional($professional);
            $update->edit();

            $retorna = [
                'status' => true,
                'name' => $name,
                'date' => $scheduling,
                'professional' => $professional,
                'time' => $time,
                'msg' => 10
            ];
        }

        return json_encode($retorna);
    }

    public function delete()
    {
        $cliente = new Client;
        $id = filter_input(INPUT_GET, 'id', FILTER_SANITIZE_NUMBER_INT);

        if (empty($id)) {
            $retorna = ['status' => false, 'msg' => 0];
        } else {
            $cliente->delete($id);
            $retorna = ['status' => true];
        }
        return json_encode($retorna);
    }
}
