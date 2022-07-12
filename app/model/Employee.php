<?php

namespace App\model;

use Lib\Server\Connection;
use App\model\Person;

class Employee extends Person
{
    private $id;
    private $salary;
    private $occupation;

    public function insert()
    {
        $conn = Connection::connDb();
        $sql = 'INSERT INTO funcionarios(`name`, `salary`, `age`, `gender`, `occupation`)
        VALUES (:n,:s,:a,:g,:o)';
        $stmt =  $conn->prepare($sql);
        $stmt->bindValue(':n',  $this->name);
        $stmt->bindValue(':s',  $this->salary);
        $stmt->bindValue(':a',  $this->age);
        $stmt->bindValue(':g',  $this->gender);
        $stmt->bindValue(':o',  $this->occupation);
        $result = $stmt->execute();
        if ($result == 0) {
            return false;
        }else{
            return $result;
        }
    }
    public function select()
    {
        $conn = Connection::connDb();
        $sql = 'SELECT `id`, `name`,`salary`,`age`, `gender`, `occupation` FROM funcionarios ORDER BY id ASC';
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(\PDO::FETCH_OBJ);
         return $result;
    }
    public function selectIdFunc($id)
    {
        $conn = Connection::connDb();
        $sql = 'SELECT `id`, `name` , `salary`, `age`, `gender`, `occupation` FROM funcionarios WHERE id ='. $id;
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetch(\PDO::FETCH_ASSOC);
        return $result;
    }
    public function edit()
    {
        $conn = Connection::connDb();
        $sql = 'UPDATE funcionarios SET `name` = :n, `salary` = :s, `age` = :a, `gender` = :g, `occupation` = :o WHERE `id` = :id';
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(':id', $this->id);
        $stmt->bindValue(':n', $this->name);
        $stmt->bindValue(':s', $this->salary);
        $stmt->bindValue(':a', $this->age);
        $stmt->bindValue(':g', $this->gender);
        $stmt->bindValue(':o', $this->occupation);
        $stmt->execute();
    }

    public function delete($id)
    {
        $conn = Connection::connDb();
        $sql = 'DELETE FROM funcionarios WHERE id ='. $id;
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        
    }

    public function getSalary()
    {
        return $this->salary;
    }

    public function setSalary($salary)
    {
        $this->salary = $salary;

        return $this;
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
