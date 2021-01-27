<?php

namespace DNAFactory\Theme\Api;

use Magento\Framework\App\ScopeInterface;

interface ConfigurationInterface
{
    /**
     * @param string $field
     * @param string $xml
     * @param string $storeScope
     * @return mixed
     */
    public function getConfig($field, $xml, $storeScope = ScopeInterface::SCOPE_DEFAULT);

}
