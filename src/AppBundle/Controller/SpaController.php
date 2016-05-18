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
     * catchAll parameter used to catch all URLs.
     *
     * @Method("GET")
     * @Route("/{catchAll}", name="spa", requirements={"catchAll" = ".*"}, defaults={"catchAll" = ""})
     * @Template()
     */
    public function spaAction()
    {
        // replace this example code with whatever you need
        return [];
    }
}
