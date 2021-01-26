<?php


namespace DNAFactory\Theme\Observer;


use DNAFactory\Theme\Api\ThemeConfigurationInterface;

/**
 * Class CustomCrosssellHandleObserver
 * @package DNAFactory\Theme\Observer
 * @author Ciro Arcadio <ciro.arcadio@dnafactory.it>
 *
 * Provides a custom layout handle to apply custom Crosssel blocks on demand
 */
class CustomCrosssellHandleObserver implements \Magento\Framework\Event\ObserverInterface
{
    /**
     * @var ThemeConfigurationInterface
     */
    protected $_themeConfiguration;
    public function __construct(
        ThemeConfigurationInterface $themeConfiguration
    )
    {
        $this->_themeConfiguration = $themeConfiguration;
    }

    public function execute(\Magento\Framework\Event\Observer $observer)
    {
        if (!$this->_themeConfiguration->getMaxCrosssellItemsInCartEnabled()) {
            return;
        }

        $action = $observer->getFullActionName();

        if ($action === 'checkout_cart_index') {
            $observer->getLayout()
                ->getUpdate()
                ->addHandle('dnafactory_custom_crosssell');
        }
    }
}
