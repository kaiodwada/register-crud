<?php
require_once 'vendor/autoload.php';

use App\core\Core;

$core = new Core();
echo $core->start($_GET);