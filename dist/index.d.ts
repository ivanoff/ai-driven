declare class Assistant {
    private apiKey;
    private apiUrl;
    private apiModel;
    constructor(options?: AssistantType);
    private sendToClaude;
    translateText(text: string, lang?: string, context?: string): Promise<string>;
    checkForOffensiveLanguage(text: string): Promise<number>;
    checkForProfanity(text: string): Promise<number>;
    checkImageForViolence(imageBuffer: Buffer): Promise<number>;
    checkImageForPornography(imageBuffer: Buffer): Promise<number>;
}
export type AssistantType = {
    apiKey: string;
    apiUrl?: string;
    apiModel?: string;
};
export { Assistant };
