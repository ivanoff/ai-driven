"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Assistant = void 0;
class Assistant {
    constructor(options) {
        const { apiVendor, apiKey, apiUrl, apiModel } = options || {};
        const { CLAUDE_API_KEY, CLAUDE_API_URL, CLAUDE_API_MODEL, OPENAI_API_KEY, OPENAI_API_URL, OPENAI_API_MODEL, } = process.env;
        this.isOpenAI = apiVendor === 'OpenAI' || !!OPENAI_API_KEY;
        const defaultUrl = this.isOpenAI ? 'https://api.openai.com/v1/chat/completions' : 'https://api.anthropic.com/v1/messages';
        const defaultModel = this.isOpenAI ? 'gpt-3.5-turbo' : 'claude-3-haiku-20240307';
        this.apiKey = apiKey || (this.isOpenAI ? OPENAI_API_KEY : CLAUDE_API_KEY) || '';
        this.apiUrl = apiUrl || (this.isOpenAI ? OPENAI_API_URL : CLAUDE_API_URL) || defaultUrl;
        this.apiModel = apiModel || (this.isOpenAI ? OPENAI_API_MODEL : CLAUDE_API_MODEL) || defaultModel;
        if (!this.apiKey)
            throw new Error('API key is not defined. You can obtain one from the OpenAI dashboard: https://platform.openai.com/settings/profile?tab=api-keys or the Anthropic console: https://console.anthropic.com/settings/keys');
    }
    async sendToClaude(message) {
        const response = await fetch(this.apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': this.apiKey,
                'anthropic-version': '2023-06-01',
            },
            body: JSON.stringify({
                model: this.apiModel,
                max_tokens: 1024,
                messages: [{ role: 'user', content: message }],
            }),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}, response: \n${JSON.stringify(await response.json(), null, 2)}`);
        }
        const data = await response.json();
        return data.content[0].text;
    }
    async sendToGPT(message) {
        const response = await fetch(this.apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`,
            },
            body: JSON.stringify({
                model: this.apiModel,
                messages: [{ role: 'user', content: message }],
                temperature: 0.7,
            }),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}, response: \n${JSON.stringify(await response.json(), null, 2)}`);
        }
        const data = await response.json();
        return data.choices[0].message.content;
    }
    async sendMessage(message) {
        return this.isOpenAI ? this.sendToGPT(message) : this.sendToClaude(message);
    }
    async translateText(text, lang, context) {
        const l = lang || 'English';
        const c = !context ? '' : `(context: ${context})`;
        const message = `Translate the following text ${c} to \`${l}\` language: \n\n${text}`;
        return this.sendMessage(message);
    }
    async detectLanguage(text) {
        const message = `Detect the language of the following text. Respond with only 2-letters ISO_639-1 language code: \n\n${text}`;
        return this.sendMessage(message);
    }
    async correctText(text) {
        const message = `Correct any grammar and spelling errors in the following text. Provide only the corrected text: \n\n${text}`;
        return this.sendMessage(message);
    }
    async summarizeText(text, maxWords) {
        const lengthConstraint = maxWords ? `in approximately ${maxWords} words` : '';
        const message = `Summarize the following text ${lengthConstraint}. Provide only the summary: \n\n${text}`;
        return this.sendMessage(message);
    }
    async generateText(prompt, maxWords) {
        const lengthConstraint = maxWords ? `in approximately ${maxWords} words` : '';
        const message = `Generate a coherent and contextually relevant text ${lengthConstraint} based on the following prompt: \n\n${prompt}`;
        return this.sendMessage(message);
    }
    async paraphraseText(text) {
        const message = `Paraphrase the following text to convey the same meaning using different words and sentence structures. Provide only the paraphrased text: \n\n${text}`;
        return this.sendMessage(message);
    }
    async classifyText(text, categories) {
        const categoriesStr = categories.join(', ');
        const message = `Classify the following text into one of these categories: ${categoriesStr}. Respond with only the chosen category: \n\n${text}`;
        return this.sendMessage(message);
    }
    async extractKeywords(text, count) {
        const countConstraint = count ? `Limit the output to ${count} keywords.` : '';
        const message = `Extract the most important or relevant keywords or phrases from the following text. ${countConstraint} Provide the keywords as a comma-separated list: \n\n${text}`;
        const response = await this.sendMessage(message);
        return response.split(',').map(keyword => keyword.trim());
    }
    async extractEntities(text) {
        const message = `Extract named entities (names, dates, locations, organizations) from the following text. Provide the output as a JSON object only where keys are entity types and values are arrays of extracted entities: \n\n${text}`;
        const response = await this.sendMessage(message);
        return JSON.parse(response);
    }
    async analyzeSentiment(text) {
        const message = `Analyze the sentiment of the following text. Respond with only one word: positive, negative, or neutral: \n\n${text}`;
        return this.sendMessage(message);
    }
    async checkForOffensiveLanguage(text) {
        const message = `Rate (response only digit) the offensiveness of the following message on a scale from 1 to 10, where 1 is very peaceful and 10 is extremely aggressive: "${text}"`;
        const response = await this.sendMessage(message);
        return parseInt(response);
    }
    async checkForProfanity(text) {
        const message = `Rate (response only digit) the level of profanity in the following message on a scale from 1 to 10, where 1 is very clean and 10 is extremely profane: "${text}"`;
        const response = await this.sendMessage(message);
        return parseInt(response);
    }
    async detectEmotion(text) {
        const message = `Detect the primary emotion in the following text. Respond with only one word representing the emotion (e.g., joy, sadness, anger, fear, surprise, disgust): \n\n${text}`;
        return this.sendMessage(message);
    }
    async answerQuestion(question, context) {
        const message = `Based on the following context, answer the question. Provide only the answer:\n\nContext: ${context}\n\nQuestion: ${question}`;
        return this.sendMessage(message);
    }
    getBase64Image(imageBuffer) {
        const base64Image = imageBuffer.toString('base64');
        return this.isOpenAI ? `[IMG]data:image/png;base64,${base64Image}[/IMG]`
            : `[IMAGE]${base64Image}[/IMAGE]`;
    }
    async captionImage(imageBuffer) {
        const image = this.getBase64Image(imageBuffer);
        const message = `Generate a descriptive caption for this image: ${image}`;
        return this.sendMessage(message);
    }
    async extractTextFromImage(imageBuffer) {
        const image = this.getBase64Image(imageBuffer);
        const message = `Extract and provide all text visible in this image: ${image}`;
        return this.sendMessage(message);
    }
    async detectObjectsInImage(imageBuffer) {
        const image = this.getBase64Image(imageBuffer);
        const message = `Identify and locate objects in this image: ${image}. Provide the output as a JSON object where keys are object names and values are arrays of [x, y, width, height] representing bounding boxes.`;
        const response = await this.sendMessage(message);
        return JSON.parse(response);
    }
    async searchObjectInImage(imageBuffer, objectQuery) {
        const image = this.getBase64Image(imageBuffer);
        const message = `In this image: ${image}, locate the object described as: "${objectQuery}". If found, provide the bounding box as an array of [x, y, width, height]. If not found, respond with "null". Response JSON format only.`;
        const response = await this.sendMessage(message);
        return JSON.parse(response);
    }
    async checkImageForViolence(imageBuffer) {
        const image = this.getBase64Image(imageBuffer);
        const message = `Rate (response only digit) the level of violence in the following image on a scale from 1 to 10, where 1 is very peaceful and 10 is extremely violent: ${image}`;
        const response = await this.sendMessage(message);
        return parseInt(response) || 1;
    }
    async checkImageForPornography(imageBuffer) {
        const image = this.getBase64Image(imageBuffer);
        const message = `Rate (response only digit) the level of pornographic content in the following image on a scale from 1 to 10, where 1 is not pornographic at all and 10 is extremely pornographic: ${image}`;
        const response = await this.sendMessage(message);
        return parseInt(response) || 1;
    }
    async analyzeFacialExpression(imageBuffer) {
        const image = this.getBase64Image(imageBuffer);
        const message = `Analyze the facial expressions in this image and determine the emotions: ${image}. Provide the output as a JSON object where keys are detected faces (e.g., "face1", "face2") and values are the corresponding emotions.`;
        const response = await this.sendMessage(message);
        return JSON.parse(response);
    }
    async detectEmotionInVoice(audioBuffer) {
        const base64Audio = audioBuffer.toString('base64');
        const message = `Analyze the emotion in this voice recording: [AUDIO]${base64Audio}[/AUDIO]. Respond with only one word representing the primary emotion detected (e.g., joy, sadness, anger, fear, surprise, neutral).`;
        return this.sendMessage(message);
    }
    async speechToText(audioBuffer) {
        const base64Audio = audioBuffer.toString('base64');
        const message = `Transcribe the spoken words in this audio recording into text: [AUDIO]${base64Audio}[/AUDIO]. Provide only the transcribed text.`;
        return this.sendMessage(message);
    }
}
exports.Assistant = Assistant;
//# sourceMappingURL=index.js.map