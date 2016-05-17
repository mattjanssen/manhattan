<?php

namespace AppBundle\Document;

use Doctrine\ORM\Mapping as ORM;


/**
 * User Entity
 *
 * @ORM\Entity(repositoryClass="AppBundle\Repository\UserRepository")
 */
class User implements \JsonSerializable
{
    /**
     * Identifier
     *
     * @ORM\Id()
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     *
     * @var string
     */
    private $id;

    /**
     * Contact Title
     *
     * @ORM\Column()
     *
     * @var string
     */
    private $title;

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
