<?php


namespace DNAFactory\Theme\Plugin\Controller\Result;


use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Framework\App\Response\Http;
use Magento\Store\Model\ScopeInterface;

class CriticalCssSortPlugin
{
    private const XML_PATH_USE_CSS_CRITICAL_PATH = 'dev/css/use_css_critical_path';

    /**
     * @var ScopeConfigInterface
     */
    private $scopeConfig;

    /**
     * @param ScopeConfigInterface $scopeConfig
     */
    public function __construct(ScopeConfigInterface $scopeConfig)
    {
        $this->scopeConfig = $scopeConfig;
    }

    /**
     * Load CSS asynchronously if it is enabled in configuration.
     *
     * @param Http $subject
     * @return void
     */
    public function beforeSendResponse(Http $subject): void
    {
        $content = $subject->getContent();

        if (\is_string($content) && strpos($content, '</body') !== false ) {
            $cssMatches = [];
            if(!$this->scopeConfig->isSetFlag(
                self::XML_PATH_USE_CSS_CRITICAL_PATH,
                ScopeInterface::SCOPE_STORE
            )) {
                $criticalLink = '';
                $content = preg_replace_callback(
                    '@<link.+\/critical\.css.+/>@',
                    function($matches) use (&$criticalLink){
                        $criticalLink .= isset($matches[0])? $matches[0] : '';
                        return '';
                    },
                    $content
                );
                $content = preg_replace_callback('@<link.+\.css.+/>@',
                    function($matches) use ($criticalLink){
                        if(isset($matches[0])){
                            return "$criticalLink $matches[0]";
                        }
                    },
                    $content, 1);
            }

            $subject->setContent($content);
        }
    }
}
