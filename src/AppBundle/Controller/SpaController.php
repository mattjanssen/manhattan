<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

/**
 * Single Page App Controller
 */
class SpaController extends Controller
{
    /**
     * Single Page App Entry Point
     *
     * @Method("GET")
     * @Route("/{catchAll}", requirements={"catchAll" = ".*"})
     * @Template()
     */
    public function spaAction()
    {
        // replace this example code with whatever you need
        return [];
    }
}
