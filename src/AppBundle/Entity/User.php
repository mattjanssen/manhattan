<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\Role\Role;
use Symfony\Component\Security\Core\User\UserInterface;


/**
 * User Entity
 *
 * @ORM\Entity(repositoryClass="AppBundle\Repository\UserRepository")
 */
class User implements \JsonSerializable, UserInterface
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
     * Unique ID from OAuth Provider
     *
     * Should be prefixed with service-specific prefix to avoid collisions between providers.
     *
     * @ORM\Column(unique=true, nullable=true)
     *
     * @var string
     */
    private $oauthId;

    /**
     * Unique Secret API Key
     *
     * @ORM\Column(unique=true)
     *
     * @var string
     */
    private $apiKey;

    /**
     * {@inheritdoc}
     */
    public function jsonSerialize()
    {
        return [
            'id' => $this->id,
            'oauthId' => $this->oauthId,
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
    public function getOauthId()
    {
        return $this->oauthId;
    }

    /**
     * @param string $oauthId
     *
     * @return $this
     */
    public function setOauthId($oauthId)
    {
        $this->oauthId = $oauthId;

        return $this;
    }

    /**
     * @return string
     */
    public function getApiKey()
    {
        return $this->apiKey;
    }

    /**
     * @param string $apiKey
     *
     * @return $this
     */
    public function setApiKey($apiKey)
    {
        $this->apiKey = $apiKey;

        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function getRoles()
    {
        return [];
    }

    /**
     * {@inheritdoc}
     */
    public function getPassword()
    {
        return '';
    }

    /**
     * {@inheritdoc}
     */
    public function getSalt()
    {
        return '';
    }

    /**
     * {@inheritdoc}
     */
    public function getUsername()
    {
        return '';
    }

    /**
     * {@inheritdoc}
     */
    public function eraseCredentials()
    {
    }
}
