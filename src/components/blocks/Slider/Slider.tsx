import React from "react";
import {BlockComponentProps} from "@thebigrick/catalyst-payloadcms/types";

const Slider: React.FC<BlockComponentProps> = ({ block }) => {
    return <div>{block.id}</div>;
}

export default Slider;
