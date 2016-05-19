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
     * @param Element $elements
     */
    public function addElement($elements)
    {
        $this->elements[] = $elements;
    }

    /**
     * @param Element $elements
     */
    public function removeElement($elements)
    {
        $this->elements->removeElement($elements);
    }
}
