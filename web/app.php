<?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Debug\Debug;

// If you don't want to setup permissions the proper way, just uncomment the following PHP line
// read http://symfony.com/doc/current/book/installation.html#checking-symfony-application-configuration-and-setup
// for more information
umask(0000);

// Set APPLICATION_ENV to dev or test to enable debugging.
$env = getenv('APPLICATION_ENV') ? getenv('APPLICATION_ENV') : 'prod';
$debug = in_array($env, array('dev', 'test'));
/**
 * @var Composer\Autoload\ClassLoader $loader
 */
$loader = require __DIR__.'/../app/autoload.php';


if ($debug) {

    Debug::enable();

    $kernel = new AppKernel($env, true);
} else {
    include_once __DIR__.'/../app/bootstrap.php.cache';

    $kernel = new AppKernel($env, false);
}
$kernel->loadClassCache();
//$kernel = new AppCache($kernel);

// When using the HttpCache, you need to call the method in your front controller instead of relying on the configuration parameter
//Request::enableHttpMethodParameterOverride();
$request = Request::createFromGlobals();
$response = $kernel->handle($request);
$response->send();
$kernel->terminate($request, $response);
