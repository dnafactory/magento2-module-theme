<?php

namespace DNAFactory\Theme\Api;

use Magento\Framework\App\ScopeInterface;

interface ThemeConfigurationInterface extends ConfigurationInterface
{
    /**
     * @param string $storeScope
     * @return bool
     */
    public function getMaxCrosssellItemsInCartEnabled($storeScope = ScopeInterface::SCOPE_DEFAULT);
    
    /**
     * @param $storeScope
     * @return int
     */
    public function getMaxCrosssellItemsInCart($storeScope = ScopeInterface::SCOPE_DEFAULT);
}
