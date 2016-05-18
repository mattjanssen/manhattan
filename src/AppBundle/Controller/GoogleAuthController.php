<?php

namespace AppBundle\Controller;

use AppBundle\Entity\User;
use AppBundle\Repository\UserRepository;
use Doctrine\Common\Persistence\ObjectManager;
use GuzzleHttp\Client;
use JMS\DiExtraBundle\Annotation\Inject;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

/**
 * Google OAuth Controller
 */
class GoogleAuthController extends Controller
{
    const UUID_BYTES = 32;

    const USER_OAUTH_PREFIX = 'google:';

    /**
     * @TODO: Extract into config and parameters.
     */
    const GOOGLE_AUTH_ENDPOINT = 'https://accounts.google.com/o/oauth2/v2/auth';
    const GOOGLE_TOKEN_ENDPOINT = 'https://www.googleapis.com/oauth2/v4/token';
    const GOOGLE_PEOPLE_ME_ENDPOINT = 'https://people.googleapis.com/v1/people/me';
    const CLIENT_ID = '717321476937-6ldjr7vk331mpfd3sbl0tnlcn0q9lil4.apps.googleusercontent.com';
    const CLIENT_SECRET = '1LWA1nXUVIMQKDWZmBfaUhzI';

    /**
     * @Inject("app.repository.user")
     *
     * @var UserRepository
     */
    private $userRepository;

    /**
     * @Inject("doctrine.orm.entity_manager")
     *
     * @var ObjectManager
     */
    private $entityManager;

    /**
     * Redirect to Google Login and Authorization
     *
     * @Method("GET")
     * @Route("/api/login/google")
     *
     * @return string
     */
    public function getCodeAction()
    {
        $queryData = [
            'scope' => 'profile',
            'client_id' => self::CLIENT_ID,
            'response_type' => 'code',
            'redirect_uri' => $this->generateTokenRedirectUrl(),
        ];

        $url = self::GOOGLE_AUTH_ENDPOINT . '?' . http_build_query($queryData);

        return $url;
    }

    /**
     * Get OAuth Auth Token from Code and Find or Create User Entity
     *
     * @Method("GET")
     * @Route("/google-token", name="google_auth_token")
     *
     * @param Request $request
     *
     * @return User
     */
    public function getTokenAction(Request $request)
    {
        $code = $request->query->get('code');
        $error = $request->query->get('error');

        if ($error) {
            // Upon error, boot back to the app, passing along an error code.
            return new RedirectResponse($this->generateUrl('spa') . '?login_error=' . $error);
        }

        $client = new Client();
        $options = [
            'form_params' => [
                  'code' => $code,
                  'client_id' => self::CLIENT_ID,
                  'client_secret' => self::CLIENT_SECRET,
                  'grant_type' => 'authorization_code',
                  'redirect_uri' => $this->generateTokenRedirectUrl(),
            ],
        ];
        $response = $client->request('POST', self::GOOGLE_TOKEN_ENDPOINT, $options);

        $tokenData = json_decode($response->getBody()->getContents(), true);
        $accessToken = $tokenData['access_token'];

        $client = new Client();
        $options = [
            'headers' => [
                'Authorization' => 'Bearer ' . $accessToken,
            ],
        ];
        $response = $client->request('GET', self::GOOGLE_PEOPLE_ME_ENDPOINT, $options);

        $profileData = json_decode($response->getBody()->getContents(), true);
        $profileId = $profileData['resourceName'];

        // Unique ID for this user tied to Google's resource name.
        $oauthId = self::USER_OAUTH_PREFIX . $profileId;
        $existingUser = $this->userRepository->findByOAuthId($oauthId);

        if ($existingUser) {
            // This user is already in the system.
            return $this->createSuccessRedirect($existingUser);
        }

        // New user. Create and persist a new user object tied to this Google resource ID.
        $newUser = (new User())
            ->setOauthId($oauthId)
            ->setApiKey($this->createApiKey());

        $this->entityManager->persist($newUser);
        $this->entityManager->flush();

        return $this->createSuccessRedirect($newUser);
    }

    /**
     * Generate the Redirect URL
     *
     * @return string
     */
    private function generateTokenRedirectUrl()
    {
        return $this->generateUrl('google_auth_token', [], UrlGeneratorInterface::ABSOLUTE_URL);
    }

    /**
     * Generate the Redirect URL
     *
     * @param User $user
     *
     * @return RedirectResponse
     */
    private function createSuccessRedirect(User $user)
    {
        $url = $this->generateUrl('spa') . '?key=' . $user->getApiKey();

        return new RedirectResponse($url);
    }

    /**
     * Generate a Random URL-safe API Key
     *
     * @return string
     */
    public function createApiKey()
    {
        return strtr(rtrim(base64_encode(random_bytes(self::UUID_BYTES)), '='), '+/', '-_');
    }
}
