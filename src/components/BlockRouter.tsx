import Slider from "@thebigrick/catalyst-payloadcms/components/blocks/Slider/Slider";
import React from "react";

export interface BlockRouterProps {
    block: any;
}

const BlockRouter: React.FC<BlockRouterProps> = ({ block }) => {
    switch (block.blockType) {
        case 'slider':
            return <Slider block={block} />;
    }

    return null;
}

export default BlockRouter;
