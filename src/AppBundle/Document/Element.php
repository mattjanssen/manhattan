<?php

namespace AppBundle\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;

/**
 * Embeddable Element Document
 *
 * @ODM\EmbeddedDocument()
 */
class Element implements \JsonSerializable
{
    /**
     * Page Name
     *
     * @ODM\String()
     *
     * @var string
     */
    private $type;

    /**
     * {@inheritdoc}
     */
    public function jsonSerialize()
    {
        return [
            'type' => $this->type,
        ];
    }

    /**
     * @return string
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * @param string $type
     */
    public function setType($type)
    {
        $this->type = $type;
    }
    
    
}
