import { GreenTickIcon, RedCrossIcon } from "../svgs/svg";

const TICK = <GreenTickIcon/>;
const CROSS = <RedCrossIcon/>;

type IconFlags = [boolean, boolean, boolean, boolean];

function buildRow(features: string, flags: IconFlags) {
    const [f1, f2, f3, f4] = flags;
    return {
        features,
        icon1: f1 ? TICK : CROSS,
        icon2: f2 ? TICK : CROSS,
        icon3: f3 ? TICK : CROSS,
        icon4: f4 ? TICK : CROSS,
    };
}

export const CoreFeaturesData = [
    buildRow("Full Anonymity", [true, true, true, true]),
    buildRow("Unmoderated", [true, true, true, true]),
    buildRow("Access All LLM Models", [false, true, true, true]),
    buildRow("Multi Modality", [true, true, true, true]),
    buildRow("Image Generation", [true, true, true, true]),
    buildRow("Auto Prompt Enhancement", [false, true, true, true]),
    buildRow("PDF Reading Capability", [false, true, true, true]),
    buildRow("Real Time Data (via Google API)", [true, true, true, true]),
    buildRow("Live Support", [true, true, true, true]),
    buildRow("Top Up Options", [false, true, true, true]),
    buildRow("Premium Support", [false, false, true, true]),
    buildRow("Unlimited Words", [false, false, false, true]),
];