declare class Assistant {
    private apiKey;
    private apiUrl;
    private apiModel;
    constructor(options?: AssistantType);
    private sendToClaude;
    translateText(text: string, lang?: string, context?: string): Promise<string>;
    detectLanguage(text: string): Promise<string>;
    correctText(text: string): Promise<string>;
    summarizeText(text: string, maxWords?: number): Promise<string>;
    generateText(prompt: string, maxWords?: number): Promise<string>;
    paraphraseText(text: string): Promise<string>;
    classifyText(text: string, categories: string[]): Promise<string>;
    extractKeywords(text: string, count?: number): Promise<string[]>;
    extractEntities(text: string): Promise<Record<string, string[]>>;
    analyzeSentiment(text: string): Promise<string>;
    checkForOffensiveLanguage(text: string): Promise<number>;
    checkForProfanity(text: string): Promise<number>;
    detectEmotion(text: string): Promise<string>;
    answerQuestion(question: string, context: string): Promise<string>;
    captionImage(imageBuffer: Buffer): Promise<string>;
    extractTextFromImage(imageBuffer: Buffer): Promise<string>;
    detectObjectsInImage(imageBuffer: Buffer): Promise<Record<string, number[]>>;
    searchObjectInImage(imageBuffer: Buffer, objectQuery: string): Promise<number[] | null>;
    checkImageForViolence(imageBuffer: Buffer): Promise<number>;
    checkImageForPornography(imageBuffer: Buffer): Promise<number>;
    analyzeFacialExpression(imageBuffer: Buffer): Promise<Record<string, string>>;
    detectEmotionInVoice(audioBuffer: Buffer): Promise<string>;
    speechToText(audioBuffer: Buffer): Promise<string>;
}
export type AssistantType = {
    apiKey: string;
    apiUrl?: string;
    apiModel?: string;
};
export { Assistant };
