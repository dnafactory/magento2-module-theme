<?php

namespace DNAFactory\Theme\Block\Widget;

use Magento\Newsletter\Block\Subscribe;
use Magento\Widget\Block\BlockInterface;

class InlineNewsletter extends Subscribe implements BlockInterface
{
    private $_uniqueId;

    public function getUniqueId()
    {
        if ($this->_uniqueId) {
            return $this->_uniqueId;
        }

        $this->_uniqueId = uniqid();

        return $this->_uniqueId;
    }
}