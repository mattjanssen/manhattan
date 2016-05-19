<?php

namespace AppBundle\Document;

use Doctrine\Common\Collections\ArrayCollection;
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
     * @ODM\EmbedMany(targetDocument="Row")
     *
     * @var Row[]|ArrayCollection
     */
    private $rows;

    /**
     * Constructor
     */
    public function __construct() {
        $this->rows = new ArrayCollection();
    }

    /**
     * {@inheritdoc}
     */
    public function jsonSerialize()
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'rows' => $this->rows->toArray(),
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
     *
     * @return $this
     */
    public function setName($name)
    {
        $this->name = $name;
        
        return $this;
    }

    /**
     * @return Row[]
     */
    public function getRows()
    {
        return $this->rows;
    }

    /**
     * Set Rows
     *
     * Use setter instead of add/remove to preserve order upon form submission.
     *
     * @param $rows
     * 
     * @return $this
     */
    public function setRows($rows)
    {
        $this->rows = new ArrayCollection($rows);

        return $this;
    }
}
