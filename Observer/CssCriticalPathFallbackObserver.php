<?php

namespace DNAFactory\Theme\Observer;

use \Magento\Framework\App\Config\ScopeConfigInterface;
use \Magento\Store\Model\ScopeInterface;
use Psr\Log\LoggerInterface;

/**
 * Class CssCriticalPathFallbackObserver
 * @package DNAFactory\Theme\Observer
 * @author Ciro Arcadio <ciro.arcadio@dnafactory.it>
 *
 * Provides a layout custom handle to define css critical path fallbacks
 */
class CssCriticalPathFallbackObserver implements \Magento\Framework\Event\ObserverInterface
{
    private const XML_PATH_USE_CSS_CRITICAL_PATH = 'dev/css/use_css_critical_path';

    /**
     * @var ScopeConfigInterface
     */
    protected $scopeConfig;
    /**
     * @var LoggerInterface
     */
    protected $logger;

    /**
     * CssCriticalPathFallbackObserver constructor.
     * @param ScopeConfigInterface $scopeConfig
     * @param LoggerInterface $logger
     */
    public function __construct(
        ScopeConfigInterface $scopeConfig,
        LoggerInterface $logger
    )
    {
        $this->scopeConfig = $scopeConfig;
        $this->logger = $logger;
    }

    /**
     * @param \Magento\Framework\Event\Observer $observer
     */
    public function execute(\Magento\Framework\Event\Observer $observer)
    {
        try {
            if (!$this->scopeConfig->isSetFlag(
                self::XML_PATH_USE_CSS_CRITICAL_PATH,
                ScopeInterface::SCOPE_STORE
            )) {
                // If css critical path is disabled, adds an handle to provide some fallback
                $observer->getEvent()->getLayout()->getUpdate()->addHandle('css_critical_path_fallback');
            }
        }catch (\Exception $exception){
            $this->logger->error("DNAFactory_Theme: ".$exception->getMessage());
        }
    }
}
