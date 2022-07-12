<?php

namespace App\model;

use Lib\Server\Connection;

class Occupation extends Person
{
    private $occupation;
    private $description;
    private $vacancies;
    private $id;

    public function insert()
    {
        $conn = Connection::connDb();
        $sql = 'INSERT INTO cargos(`occupation`, `description`, `vacancies_filled`) VALUES(:o, :d, :v)';
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(':o', $this->occupation);
        $stmt->bindValue(':d', $this->description);
        $stmt->bindValue(':v', $this->vacancies);
        $result = $stmt->execute();
        if ($result == 0) {
            return false;
        } else {
            return $result;
        }
    }
    public function select()
    {
        $conn = Connection::connDb();
        $sql = 'SELECT `id` , `occupation`, `description` , `vacancies_filled` FROM cargos';
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(\PDO::FETCH_OBJ);
        return $result;
    }
    public function selectId($id)
    {
        $conn = Connection::connDb();
        $sql = 'SELECT id , occupation, description, vacancies_filled FROM cargos WHERE id ='. $id;
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetch(\PDO::FETCH_ASSOC);
        return $result;
    }
    public function edit()
    {
    }
    public function delete($id)
    {
        $conn = Connection::connDb();
        $sql = 'DELETE FROM cargos WHERE id = '. $id;
        $stmt = $conn->prepare($sql);
        $stmt->execute();
    }

    public function getOccupation()
    {
        return $this->occupation;
    }

    public function setOccupation($occupation)
    {
        $this->occupation = $occupation;

        return $this;
    }

    public function getDescription()
    {
        return $this->description;
    }

    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    public function getVacancies()
    {
        return $this->vacancies;
    }

    public function setVacancies($vacancies)
    {
        $this->vacancies = $vacancies;

        return $this;
    }

    public function getId()
    {
        return $this->id;
    }

    public function setId($id)
    {
        $this->id = $id;

        return $this;
    }
}
