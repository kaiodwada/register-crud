<?php

namespace App\core;

use App\controller\HomeController;
use App\controller\ClientController;
use App\controller\EmployeeController;
use App\controller\OccupationController;

class Core
{

    private $url;
    private $controller;
    private $method = 'index';
    private $params = array();

    public function start($request)
    {
        if ($request['url']) {

            $this->url = explode('/', $request['url']);
            $this->controller = ucfirst($this->url[0] . 'Controller');
            array_shift($this->url);

            if (isset($this->url[0]) && $this->url != '') {
                $this->method = $this->url[0];
                array_shift($this->url);

                if (isset($this->url[0]) && $this->url != '') {
                    $this->params = $this->url;
                }
            }
        }

        if ($request['url'] == '') {
            $page = ['HomeController'];
            $controller = new HomeController;
            if (!isset($this->controller) || in_array($this->controller, $page)) {
                $this->controller =  $controller;
                $this->method = 'index';
            }
        } elseif ($request['url'] == 'Client/clientes') {
            $page = ['ClientController'];
            $controller = new ClientController;
            if (!isset($this->controller) || in_array($this->controller, $page)) {
                $this->controller =  $controller;
                $this->method = 'clientes';
            }
        } elseif ($request['url'] == 'Employee/insert') {
            $page = ['EmployeeController'];
            $controller = new EmployeeController;
            if (!isset($this->controller) || in_array($this->controller, $page)) {
                $this->controller =  $controller;
                $this->method = 'insert';
            }
        } elseif ($request['url'] == 'Employee/funcionarios') {
            $page = ['EmployeeController'];
            $controller = new EmployeeController;
            if (!isset($this->controller) || in_array($this->controller, $page)) {
                $this->controller =  $controller;
                $this->method = 'funcionarios';
            }
        } elseif ($request['url'] == 'Client/insert') {
            $page = ['ClientController'];
            $controller = new ClientController;
            if (!isset($this->controller) || in_array($this->controller, $page)) {
                $this->controller =  $controller;
                $this->method = 'insert';
            }
        } elseif ($request['url'] == 'Client/update') {
            $page = ['ClientController'];
            $controller = new ClientController;
            if (!isset($this->controller) || in_array($this->controller, $page)) {
                $this->controller =  $controller;
                $this->method = 'update';
            }
        } elseif ($request['url'] == 'Client/read') {
            $page = ['ClientController'];
            $controller = new ClientController;
            if (!isset($this->controller) || in_array($this->controller, $page)) {
                $this->controller =  $controller;
                $this->method = 'read';
            }
        } elseif ($request['url'] == 'Employee/read') {
            $page = ['EmployeeController'];
            $controller = new EmployeeController;
            if (!isset($this->controller) || in_array($this->controller, $page)) {
                $this->controller =  $controller;
                $this->method = 'read';
            }
        } elseif ($request['url'] == 'Client/delete') {
            $page = ['ClientController'];
            $controller = new ClientController;
            if (!isset($this->controller) || in_array($this->controller, $page)) {
                $this->controller =  $controller;
                $this->method = 'delete';
            }
        } elseif ($request['url'] == 'Employee/delete') {
            $page = ['EmployeeController'];
            $controller = new EmployeeController;
            if (!isset($this->controller) || in_array($this->controller, $page)) {
                $this->controller =  $controller;
                $this->method = 'delete';
            }
        } elseif ($request['url'] == 'Employee/update') {
            $page = ['EmployeeController'];
            $controller = new EmployeeController;
            if (!isset($this->controller) || in_array($this->controller, $page)) {
                $this->controller =  $controller;
                $this->method = 'update';
            }
        } elseif ($request['url'] == 'Occupation/insert') {
            $page = ['OccupationController'];
            $controller = new OccupationController;
            if (!isset($this->controller) || in_array($this->controller, $page)) {
                $this->controller =  $controller;
                $this->method = 'insert';
            }
        } elseif ($request['url'] == 'Occupation/read') {
            $page = ['OccupationController'];
            $controller = new OccupationController;
            if (!isset($this->controller) || in_array($this->controller, $page)) {
                $this->controller =  $controller;
                $this->method = 'read';
            }
        } elseif ($request['url'] == 'Occupation/update') {
            $page = ['OccupationController'];
            $controller = new OccupationController;
            if (!isset($this->controller) || in_array($this->controller, $page)) {
                $this->controller =  $controller;
                $this->method = 'update';
            }
        } elseif ($request['url'] == 'Occupation/delete') {
            $page = ['OccupationController'];
            $controller = new OccupationController;
            if (!isset($this->controller) || in_array($this->controller, $page)) {
                $this->controller =  $controller;
                $this->method = 'delete';
            }
        } else {
            $page = ['HomeController'];
            $controller = new HomeController;
            if (!isset($this->controller) || in_array($this->controller, $page)) {
                $this->controller =  $controller;
                $this->method = 'index';
            }
        }

        return call_user_func(array(new $this->controller, $this->method), $this->params);
    }
}
