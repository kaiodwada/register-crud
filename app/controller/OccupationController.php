<?php

namespace App\controller;

use App\model\Occupation;

class OccupationController
{

    public function insert()
    {
        $cargo = new Occupation;

        $occupation = filter_input(INPUT_POST, 'nomeCargo', FILTER_SANITIZE_SPECIAL_CHARS);
        $vacancies = filter_input(INPUT_POST, 'vagasCargo', FILTER_SANITIZE_SPECIAL_CHARS);
        $description = filter_input(INPUT_POST, 'desc', FILTER_SANITIZE_SPECIAL_CHARS);

        if (empty($occupation)) {
            $resposta = ['status' => false, 'msg' => 1];
        } elseif (empty($vacancies)) {
            $resposta = ['status' => false, 'msg' => 2];
        } elseif (empty($description)) {
            $resposta = ['status' => false, 'msg' => 3];
        } else {
            $cargo->setOccupation($occupation);
            $cargo->setVacancies($vacancies);
            $cargo->setDescription($description);
            $cargo->insert();
            $resposta = ['status' => true, 'msg' => 10];
        }
        return json_encode($resposta);
    }

    public function read()
    {
        $cargo = new Occupation;
        $id = filter_input(INPUT_GET, 'id', FILTER_SANITIZE_NUMBER_INT);
        if (empty($id)) {
            $retorna = ['status' => false];
        } else {
            $data = $cargo->selectId($id);
            $retorna = ['status' => true, 'data' => $data];
        }
        return json_encode($retorna);
    }

    public function update()
    {
        $cargo = new Occupation;

        $nameCargo = filter_input(INPUT_POST, 'nomeCargo', FILTER_SANITIZE_SPECIAL_CHARS);
        $nVagas = filter_input(INPUT_POST, 'vagasCargo', FILTER_SANITIZE_NUMBER_INT);
        $desc = filter_input(INPUT_POST, 'desc', FILTER_SANITIZE_SPECIAL_CHARS);

        if (empty($nameCargo)) {
            $retorna = ['status' => false, 'msg' => 1];
        } elseif (empty($nVagas)) {
            $retorna = ['status' => false, 'msg' => 2];
        } elseif (empty($desc)) {
            $retorna = ['status' => false, 'msg' => 3];
        } else {
            $cargo->setOccupation($nameCargo);
            $cargo->setVacancies($nVagas);
            $cargo->setDescription($desc);
            $cargo->edit();
            $retorna = ['status' => true, 'msg' => 10];
        }
        return json_encode($retorna);
    }

    public function delete()
    {
        $cargo = new Occupation;
        $id = filter_input(INPUT_GET, 'id', FILTER_SANITIZE_NUMBER_INT);
        if(empty($id)){
            $retorna = ['status' => false];
        }else{
            $cargo->delete($id);
            $retorna = ['status' => true, 'msg' => 10];
        }
        return json_encode($retorna);
    }
}
