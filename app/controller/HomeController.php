<?php

namespace App\controller;

use App\model\Client;
use App\model\Employee;


class HomeController
{

    public function index()
    {
        $push = new Client;
        $func = new Employee;

        $loader = new \Twig\Loader\FilesystemLoader('app/view/');
        $twig = new \Twig\Environment($loader, [
            'cache' => false,
        ]);
        $template = $twig->load('home.html');

        $parametros = array();
        $parametros['clientes'] = $push->select();
        $parametros['funcionarios'] = $func->select();
        return $template->render($parametros);
    }


}
