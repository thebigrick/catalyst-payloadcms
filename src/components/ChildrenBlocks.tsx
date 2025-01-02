import React from "react";
import BlockRouter from "@thebigrick/catalyst-payloadcms/components/BlockRouter";

export interface ChildrenBlocksProps {
    blocks: any[]
}

const ChildrenBlocks: React.FC<ChildrenBlocksProps> = ({ blocks }) => {
    return blocks.map((block, index) => (<BlockRouter key={index} block={block} />));
}

export default ChildrenBlocks;
