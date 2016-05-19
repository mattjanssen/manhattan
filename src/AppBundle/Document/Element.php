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
    const TYPE_TITLE = 'title';
    const TYPE_TEXT = 'text';
    const TYPE_IMAGE = 'image';
    const TYPE_NAV = 'nav';

    /**
     * Element Type
     *
     * See Element::TYPE_* enums.
     *
     * @ODM\String()
     *
     * @var string
     */
    private $type;

    /**
     * Element Text
     *
     * @ODM\String()
     *
     * @var string
     */
    private $text;

    /**
     * {@inheritdoc}
     */
    public function jsonSerialize()
    {
        return [
            'type' => $this->type,
            'text' => $this->text,
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
     *
     * @return $this
     */
    public function setType($type)
    {
        $this->type = $type;

        return $this;
    }

    /**
     * @return string
     */
    public function getText()
    {
        return $this->text;
    }

    /**
     * @param string $text
     *
     * @return $this
     */
    public function setText($text)
    {
        $this->text = $text;

        return $this;
    }
}
