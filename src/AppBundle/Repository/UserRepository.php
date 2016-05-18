<?php

namespace AppBundle\Repository;

use AppBundle\Entity\User;
use Doctrine\ORM\EntityRepository;

/**
 * User Entity Repository
 */
class UserRepository extends EntityRepository
{
    /**
     * Find One User by Unique OAuth ID
     * 
     * @param $oauthId
     * 
     * @return User
     */
    public function findByOAuthId($oauthId)
    {
        return $this->findOneBy([
            'oauthId' => $oauthId,
        ]); 
    }
}
