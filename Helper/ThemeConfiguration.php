<?php

namespace DNAFactory\Theme\Helper;

use DNAFactory\Theme\Api\ThemeConfigurationInterface;
use Magento\Framework\App\ScopeInterface;

class ThemeConfiguration extends Configuration implements ThemeConfigurationInterface
{
    const XML_PATH_CART_CONFIG = "dnafactory_theme/cart/%s";

    public function getMaxCrosssellItemsInCartEnabled($storeScope = ScopeInterface::SCOPE_DEFAULT){
        return boolval($this->getConfig('cart_max_crosssell_items_enabled', self::XML_PATH_CART_CONFIG, $storeScope));
    }

    public function getMaxCrosssellItemsInCart($storeScope = ScopeInterface::SCOPE_DEFAULT){
        $value = $this->getConfig('cart_max_crosssell_items', self::XML_PATH_CART_CONFIG, $storeScope);
        return empty($value)
            ? 4
            : intval($value);
    }
}
