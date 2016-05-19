<?php

namespace AppBundle\Document;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;

/**
 * Embeddable Row Document
 *
 * @ODM\EmbeddedDocument()
 */
class Row implements \JsonSerializable
{
    /**
     * @ODM\EmbedMany(targetDocument="Element")
     *
     * @var Element[]|ArrayCollection
     */
    private $elements;

    /**
     * {@inheritdoc}
     */
    public function jsonSerialize()
    {
        return [
            'elements' => $this->elements->toArray(),
        ];
    }

    /**
     * @return Element[]
     */
    public function getElements()
    {
        return $this->elements;
    }

    /**
     * Set Elements
     * 
     * Use setter instead of add/remove to preserve order upon form submission.
     * 
     * @param $elements
     *
     * @return $this
     */
    public function setElements($elements)
    {
        $this->elements = new ArrayCollection($elements);

        return $this;
    }
}
