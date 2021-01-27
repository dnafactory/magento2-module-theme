<?php

namespace DNAFactory\Theme\Helper;

use DNAFactory\Theme\Api\ConfigurationInterface;
use Magento\Framework\App\Helper\AbstractHelper;
use Magento\Framework\App\ScopeInterface;

class Configuration extends AbstractHelper implements ConfigurationInterface
{
    public function getConfig($field, $xml, $storeScope = ScopeInterface::SCOPE_DEFAULT)
    {
        return $this->scopeConfig->getValue(sprintf($xml, $field), $storeScope);
    }
}
