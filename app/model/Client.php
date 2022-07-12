<?php

namespace App\model;

use Lib\Server\Connection;
use App\model\Person;

class Client extends Person
{
    private $scheduling;
    private $professional;
    private $id;
    private $time;
    
    public function insert()
    {
        $conn = Connection::connDb();
        $sql = 'INSERT INTO clientes (`name`,`age`,`gender`,`scheduling`, `time` ,`professional`) VALUES (:n, :a, :g, :s, :t, :p)';
        $stmt =  $conn->prepare($sql);
        $stmt->bindValue(':n',  $this->name);
        $stmt->bindValue(':a',  $this->age);
        $stmt->bindValue(':g',  $this->gender);
        $stmt->bindValue(':s',  $this->scheduling);
        $stmt->bindValue(':t', $this->time);
        $stmt->bindValue(':p',  $this->professional);
        $result = $stmt->execute();
        if ($result == 0) {
            return false;
        }
        return $result;
    }
    public function select()
    {
        $conn = Connection::connDb();
        $sql = 'SELECT  `id` , `name`, `age`, `gender`,`scheduling`, `time`, `professional` FROM clientes ORDER BY id ASC';
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(\PDO::FETCH_OBJ);
        return $result;
    }

    public function selectId($id)
    {
        $conn = Connection::connDb();
        $sql = 'SELECT  `id` , `name`, `age`, `gender`, `scheduling`, `time` , `professional` FROM clientes  WHERE id = ' . $id;
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetch(\PDO::FETCH_ASSOC);
        return $result;
    }

    public function edit()
    {
        $conn = Connection::connDb();
        $sql = 'UPDATE clientes SET `name`= :n, `gender` = :g, `age`= :a,`scheduling`= :s, `time` = :t, `professional`= :p WHERE `id` = :id';
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(':id', $this->id);
        $stmt->bindValue(':n', $this->name);
        $stmt->bindValue(':g', $this->gender);
        $stmt->bindValue(':a', $this->age);
        $stmt->bindValue(':s', $this->scheduling);
        $stmt->bindValue(':t', $this->time);
        $stmt->bindValue(':p', $this->professional);
        $stmt->execute();
    }

    public function delete($id)
    {
        $conn = Connection::connDb();
        $sql = 'DELETE FROM clientes WHERE id =' . $id;
        $stmt = $conn->prepare($sql);
        $stmt->execute();
    }

    public function getScheduling()
    {
        return $this->scheduling;
    }

    public function setScheduling($scheduling)
    {
        $this->scheduling = $scheduling;
        return $this;
    }

    public function getProfessional()
    {
        return $this->professional;
    }

    public function setProfessional($professional)
    {
        $this->professional = $professional;
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

    public function getTime()
    {
        return $this->time;
    }

    public function setTime($time)
    {
        $this->time = $time;

        return $this;
    }
}
