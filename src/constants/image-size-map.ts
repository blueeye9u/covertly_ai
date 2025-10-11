type SizeConfig = { className: string; aspectRatio: string };
type LayoutConfig = Record<number, SizeConfig>;

// Helper function to create size configurations
const createSizeConfig = (
    layout1: SizeConfig,
    layout2: SizeConfig,
    layout3: SizeConfig,
    layout4: SizeConfig
): LayoutConfig => ({
    1: layout1,
    2: layout2,
    3: layout3,
    4: layout4,
});

// Helper to create config with aspect ratio
const config = (className: string, aspectRatio: string): SizeConfig => ({
    className,
    aspectRatio,
});

// Helper for configs without aspect ratio (empty string)
const noAspect = (className: string): SizeConfig => config(className, "");

// Common reusable configurations
const autoWidthFullHeight = (aspectRatio: string) => config("h-full !w-auto", aspectRatio);
const autoWidth = (height: string, aspectRatio: string) => config(`!w-auto h-[${height}]`, aspectRatio);
const fullWidthWithMaxConstraints = (maxW: string, maxH: string) =>
    noAspect(`max-w-[${maxW}] max-h-[${maxH}] w-full`);
const fullSizeWithMaxConstraints = (maxW: string, maxH: string) =>
    noAspect(`max-w-[${maxW}] max-h-[${maxH}] h-full w-full`);

// Common configuration for square aspect ratios (1:1)
const squareConfig = createSizeConfig(
    autoWidth("80%", "1 / 1"),
    noAspect("max-w-[800px] max-h-[400px] w-full"),
    noAspect("max-w-[1200px] max-h-[400px]"),
    autoWidthFullHeight("1 / 1")
);

export const IMAGE_SIZE_MAP: Record<string, LayoutConfig> = {
    "1024x1024": squareConfig,
    "1792x1024": createSizeConfig(
        autoWidth("60%", "7 / 4"),
        fullWidthWithMaxConstraints("1050px", "300px"),
        fullWidthWithMaxConstraints("1050px", "200px"),
        autoWidthFullHeight("7 / 4")
    ),
    "1024x1792": createSizeConfig(
        autoWidth("80%", "4 / 7"),
        fullWidthWithMaxConstraints("600px", "70%"),
        fullWidthWithMaxConstraints("900px", "70%"),
        config("h-[90%] !w-auto", "4 / 7")
    ),
    "1:1": squareConfig,
    "2:3": createSizeConfig(
        autoWidth("80%", "2 / 3"),
        fullWidthWithMaxConstraints("600px", "80%"),
        noAspect("max-w-[768px] max-h-[80%]"),
        autoWidthFullHeight("2 / 3")
    ),
    "3:2": createSizeConfig(
        autoWidth("70%", "3 / 2"),
        fullSizeWithMaxConstraints("900px", "300px"),
        fullSizeWithMaxConstraints("1350px", "250px"),
        config("h-[75%] !w-auto", "3 / 2")
    ),
    "4:5": createSizeConfig(
        config("!max-w-[500px] h-[50%]", "4 / 5"),
        fullSizeWithMaxConstraints("840px", "300px"),
        fullSizeWithMaxConstraints("1290px", "250px"),
        config("h-[80%] !w-auto", "4 / 5")
    ),
    "5:4": createSizeConfig(
        config("max-w-[500px] max-h-[400px]", "5 / 4"),
        fullSizeWithMaxConstraints("840px", "400px"),
        fullSizeWithMaxConstraints("1290px", "400px"),
        config("h-[80%] !w-auto", "5 / 4")
    ),
    "16:9": createSizeConfig(
        config("max-w-[540px] h-[30%]", "16 / 9"),
        fullSizeWithMaxConstraints("840px", "200px"),
        fullSizeWithMaxConstraints("1350px", "200px"),
        config("max-w-[840px] max-h-[400px]", "16 / 9")
    ),
    "9:16": createSizeConfig(
        config("!w-auto", "9 / 16"),
        fullWidthWithMaxConstraints("600px", "90%"),
        noAspect("max-w-[768px] max-h-[80%]"),
        autoWidthFullHeight("9 / 16")
    ),
    "21:9": createSizeConfig(
        config("!w-[700px] max-h-[300px]", "21 / 9"),
        fullWidthWithMaxConstraints("1400px", "300px"),
        noAspect("max-w-[1400px] max-h-[300px]"),
        config("max-w-[1400px] max-h-[600px]", "21 / 9")
    ),
    "9:21": createSizeConfig(
        config("!w-[214px] max-h-[500px]", "9 / 21"),
        fullWidthWithMaxConstraints("428px", "500px"),
        noAspect("max-w-[648px] max-h-[500px]"),
        config("max-w-[428px] max-h-[500px]", "9 / 21")
    ),
};

export const DALLE_DIMENSIONS = ['1024x1024', '1792x1024', '1024x1792'];
export const STABLE_DIFFUSION_DIMENSIONS = ['1:1', '2:3', '3:2', '4:5', '5:4', '16:9', '9:16', '21:9', '9:21'];

export const getSizeConfig = (size: string, count: number) => {
    return IMAGE_SIZE_MAP[size]?.[count] ?? { className: "", aspectRatio: "" };
};
