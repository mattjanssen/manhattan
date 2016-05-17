<?php

namespace AppBundle\Controller\Api;

use AppBundle\Document\Page;
use Doctrine\Common\Persistence\ObjectManager;
use Doctrine\Common\Persistence\ObjectRepository;
use JMS\DiExtraBundle\Annotation\Inject;
use MattJanssen\ApiResponseBundle\Exception\ApiFormException;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Form\Form;
use Symfony\Component\HttpFoundation\Request;

/**
 * Page API Controller
 */
class PageController extends Controller
{
    /**
     * @Inject("app.repository.page")
     *
     * @var ObjectRepository
     */
    private $pageRepository;

    /**
     * @Inject("doctrine_mongodb.odm.default_document_manager")
     *
     * @var ObjectManager
     */
    private $documentManager;

    /**
     * Get All Pages
     *
     * @Method("GET")
     * @Route("/api/page")
     *
     * @return Page[]
     */
    public function queryAction()
    {
        $pages = $this->pageRepository->findAll();

        return $pages;
    }

    /**
     * Get a Page
     *
     * @Method("GET")
     * @Route("/api/page/{id}")
     *
     * @param Page $page
     *
     * @return Page
     */
    public function getAction(Page $page)
    {
        return $page;
    }

    /**
     * Create Page
     *
     * @Method("POST")
     * @Route("/api/page")
     *
     * @param Request $request
     *
     * @return Page
     *
     * @throws ApiFormException
     */
    public function createAction(Request $request)
    {
        $page = new Page();
        $form = $this->createEditForm($page);

        $data = json_decode($request->getContent(), true);

        $form->submit($data);

        if (!$form->isValid()) {
            throw new ApiFormException($form);
        }

        $this->documentManager->persist($page);
        $this->documentManager->flush();

        return $page;
    }

    /**
     * Update Page
     *
     * @Method("PUT")
     * @Route("/api/page/{id}")
     *
     * @param Request $request
     * @param Page $page
     *
     * @return Page
     *
     * @throws ApiFormException
     */
    public function updateAction(Request $request, Page $page)
    {
        $form = $this->createEditForm($page);

        $data = json_decode($request->getContent(), true);

        $form->submit($data);

        if (!$form->isValid()) {
            throw new ApiFormException($form);
        }

        $this->documentManager->persist($page);
        $this->documentManager->flush();

        return $page;
    }

    /**
     * Delete Page
     *
     * @Method("DELETE")
     * @Route("/api/page/{id}")
     *
     * @param Page $page
     */
    public function deleteAction(Page $page)
    {
        $this->documentManager->remove($page);
        $this->documentManager->flush();
    }

    /**
     * Generate Form
     *
     * @param Page $page
     * @return Form
     */
    private function createEditForm(Page $page)
    {
        $form = $this->createFormBuilder($page, [
            'allow_extra_fields' => true,
        ])
            ->add('name')
            ->getForm();

        return $form;
    }
}
