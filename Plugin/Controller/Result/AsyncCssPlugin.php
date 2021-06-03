<?php
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
declare(strict_types=1);

namespace DNAFactory\Theme\Plugin\Controller\Result;

use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Store\Model\ScopeInterface;
use Magento\Framework\App\Response\Http;

/**
 * Plugin for asynchronous CSS loading.
 */
class AsyncCssPlugin
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
            if($this->scopeConfig->isSetFlag(
                self::XML_PATH_USE_CSS_CRITICAL_PATH,
                ScopeInterface::SCOPE_STORE
            )) {
                // add link rel preload to style sheets
                $content = preg_replace_callback(
                    '@<link\b.*?rel=("|\')stylesheet\1.*?/>@',
                    function ($matches) use (&$cssMatches) {
                        $cssMatches[] = $matches[0];
                        preg_match('@href=("|\')(.*?)\1@', $matches[0], $hrefAttribute);
                        $href = $hrefAttribute[2];
                        if (preg_match('@media=("|\')(.*?)\1@', $matches[0], $mediaAttribute)) {
                            $media = $mediaAttribute[2];
                        }
                        $media = $media ?? 'all';
                        // this quick fix prevents some google page speed warnings
                        $loadCssAsync = sprintf(
                            '<link rel="preload" as="style" media="%s" .
                         onload="this.onload=null;this.rel=\'stylesheet\'"' .
                            'href="%s"><noscript><link rel="stylesheet" media="%s" href="%s"></noscript>',
                            $media,
                            $href,
                            $media,
                            $href
                        );

                        return $loadCssAsync;
                    },
                    $content
                );
            }else{
                $criticalLink = '';
                $content = preg_replace_callback(
                    '@<link.+\/critical\.css.+/>@',
                    function($matches) use (&$criticalLink){
                        $criticalLink = isset($matches[0])? $matches[0] : '';
                        return '';
                    },
                    $content
                );
                $content = preg_replace_callback('@<link.+\/styles-m\.css.+/>@',
                    function($matches) use ($criticalLink){
                        if(isset($matches[0])){
                            return "$criticalLink $matches[0]";
                        }
                    },
                    $content);
            }

            if (!empty($cssMatches)) {
                // we're putting all custom content in the head instead of pushing it into the body
                $content = str_replace('<head>', "<head>\n".implode("\n", $cssMatches), $content);
            }
            $subject->setContent($content);
        }
    }
}
