<?php

namespace AppBundle\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;

/**
 * Page Document
 *
 * @ODM\Document(repositoryClass="AppBundle\Repository\PageRepository")
 */
class Page implements \JsonSerializable
{
    /**
     * Identifier
     *
     * @ODM\Id()
     *
     * @var string
     */
    private $id;

    /**
     * Page Name
     *
     * @ODM\String()
     *
     * @var string
     */
    private $name;

    /**
     * {@inheritdoc}
     */
    public function jsonSerialize()
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
        ];
    }

    /**
     * @return string
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param string $name
     */
    public function setName($name)
    {
        $this->name = $name;
    }
}
