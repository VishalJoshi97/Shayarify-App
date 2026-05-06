import * as Font from "expo-font";
import { BackgroundType, FontType } from "../types/share";

export const loadFonts = async () => {
    await Font.loadAsync({
        Playfair: require("../../assets/fonts/PlayfairDisplay-Regular.ttf"),
        Dancing: require("../../assets/fonts/DancingScript-Regular.ttf"),
    });
    console.log("Loaded Fonts");
};

export const getFont = (font: FontType) => {
    switch (font) {
        case "default":
            return "Playfair";
        case "handwritten":
            return "Dancing";
        default:
            return undefined;
    }
};

export const getBackground = (bg: BackgroundType):[string,string] => {
    switch (bg) {
        case "love":
            return ["#ff758c", "#ff7eb3"];
        case "royal":
            return ["#141e30", "#243b55"];
        case "dark":
            return ["#000", "#111"];
        case "light":
            return ["#fff", "#eee"];
        default:
            return ["#000", "#000"];
    }
};