export type TemplateType =
    | "dark"
    | "love"
    | "sad"
    | "royal"
    | "minimal";

export type FontType =
    | "default"
    | "Playfair"
    | "handwritten";

export type BackgroundType =
    | "love"
    | "royal"
    | "dark"
    | "light";

export type SharePayload = {
    text: string;
    author: string;
    template: TemplateType;
    font: FontType;
    background: BackgroundType;
};