import { AssistantType, VendorsModelType, VendorsUrlType, askOptionsType } from "./types";

class Assistant {
  private apiKey: string;
  private apiUrl: VendorsUrlType;
  private apiModel: VendorsModelType;
  private isOpenAI: boolean;

  constructor(options?: AssistantType) {
    const { apiVendor, apiKey, apiUrl, apiModel } = options || {};

    const {
      CLAUDE_API_KEY,
      CLAUDE_API_URL,
      CLAUDE_API_MODEL,
      OPENAI_API_KEY,
      OPENAI_API_URL,
      OPENAI_API_MODEL,
    } = process.env;

    this.isOpenAI = apiVendor === 'OpenAI' || !!OPENAI_API_KEY;

    const defaultUrl = this.isOpenAI ? 'https://api.openai.com/v1/chat/completions' : 'https://api.anthropic.com/v1/messages';
    const defaultModel = this.isOpenAI ? 'gpt-3.5-turbo' : 'claude-3-haiku-20240307';

    this.apiKey = apiKey || (this.isOpenAI ? OPENAI_API_KEY : CLAUDE_API_KEY) || '';
    this.apiUrl = apiUrl || (this.isOpenAI ? OPENAI_API_URL : CLAUDE_API_URL) as VendorsUrlType || defaultUrl as VendorsUrlType;
    this.apiModel = apiModel || (this.isOpenAI ? OPENAI_API_MODEL : CLAUDE_API_MODEL) as VendorsModelType || defaultModel as VendorsModelType;

    if (!this.apiKey) throw new Error('API key is not defined. You can obtain one from the OpenAI dashboard: https://platform.openai.com/settings/profile?tab=api-keys or the Anthropic console: https://console.anthropic.com/settings/keys');
  }

  private async sendToClaude(message: string): Promise<string> {
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

  private async sendToGPT(message: string): Promise<string> {
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

  private async sendMessage(message: string): Promise<string> {
    return this.isOpenAI ? this.sendToGPT(message) : this.sendToClaude(message);
  }

  public async ask(question: string, options?: askOptionsType): Promise<string> {
    const { answerOnly, language, context, role, task, format, tone, style, emotion } = options || {};
    const c = context && `In ${context} context`;
    const l = language && `Answer in ${language} language`;
    const o = tone && `In ${tone} tone`;
    const s = style && `Use a ${style} style`;
    const e = emotion && `Use ${emotion} emotion`;
    const f = format && `Response in ${format} format`;
    const a = answerOnly !== false && `Return only answer`;
    const r = role && `Act as a ${role}`;
    const t = task && `Create a ${task}`;

    const message = [question, c, l, o, s, e, f, a, r, t].filter(Boolean).join('. ');
    return this.sendMessage(message);
  }

  public async translateText(text: string, lang?: string, context?: string): Promise<string> {
    const l = lang || 'English'
    const c = !context ? '' : `(context: ${context})`;
    const message = `Translate the following text ${c} to \`${l}\` language if it is not already in \`${l}\`. If the text is already in \`${l}\`, return it as is. Output only the translated or original text directly, with no additional explanation or introduction: \n\n${text}`;
    return this.sendMessage(message);
  }

  public async detectLanguage(text: string): Promise<string> {
    const message = `Detect the language of the following text. Respond with only 2-letters ISO_639-1 language code: \n\n${text}`;
    return this.sendMessage(message);
  }
  
  public async correctText(text: string): Promise<string> {
    const message = `Correct any grammar and spelling errors in the following text. Provide only the corrected text: \n\n${text}`;
    return this.sendMessage(message);
  }
  
  public async summarizeText(text: string, maxWords?: number): Promise<string> {
    const lengthConstraint = maxWords ? `in approximately ${maxWords} words` : '';
    const message = `Summarize the following text ${lengthConstraint}. Provide only the summary: \n\n${text}`;
    return this.sendMessage(message);
  }

  public async generateText(prompt: string, maxWords?: number): Promise<string> {
    const lengthConstraint = maxWords ? `in approximately ${maxWords} words` : '';
    const message = `Generate a coherent and contextually relevant text ${lengthConstraint} based on the following prompt: \n\n${prompt}`;
    return this.sendMessage(message);
  }
  
  public async paraphraseText(text: string): Promise<string> {
    const message = `Paraphrase the following text to convey the same meaning using different words and sentence structures. Provide only the paraphrased text: \n\n${text}`;
    return this.sendMessage(message);
  }
  
  public async classifyText(text: string, categories: string[]): Promise<string> {
    const categoriesStr = categories.join(', ');
    const message = `Classify the following text into one of these categories: ${categoriesStr}. Respond with only the chosen category: \n\n${text}`;
    return this.sendMessage(message);
  }
  
  public async extractKeywords(text: string, count?: number): Promise<string[]> {
    const countConstraint = count ? `Limit the output to ${count} keywords.` : '';
    const message = `Extract the most important or relevant keywords or phrases from the following text. ${countConstraint} Provide the keywords as a comma-separated list: \n\n${text}`;
    const response = await this.sendMessage(message);
    return response.split(',').map(keyword => keyword.trim());
  }
  
  public async extractEntities(text: string): Promise<Record<string, string[]>> {
    const message = `Extract named entities (names, dates, locations, organizations) from the following text. Provide the output as a JSON object only where keys are entity types and values are arrays of extracted entities: \n\n${text}`;
    const response = await this.sendMessage(message);
    return JSON.parse(response);
  }
  
  public async analyzeSentiment(text: string): Promise<string> {
    const message = `Analyze the sentiment of the following text. Respond with only one word: positive, negative, or neutral: \n\n${text}`;
    return this.sendMessage(message);
  }

  public async checkForOffensiveLanguage(text: string): Promise<number> {
    const message = `Rate (response only digit) the offensiveness of the following message on a scale from 1 to 10, where 1 is very peaceful and 10 is extremely aggressive: "${text}"`;
    const response = await this.sendMessage(message);
    return parseInt(response);
  }

  public async checkForProfanity(text: string): Promise<number> {
    const message = `Rate (response only digit) the level of profanity in the following message on a scale from 1 to 10, where 1 is very clean and 10 is extremely profane: "${text}"`;
    const response = await this.sendMessage(message);
    return parseInt(response);
  }

  public async detectEmotion(text: string): Promise<string> {
    const message = `Detect the primary emotion in the following text. Respond with only one word representing the emotion (e.g., joy, sadness, anger, fear, surprise, disgust): \n\n${text}`;
    return this.sendMessage(message);
  }
  
  public async answerQuestion(question: string, context: string): Promise<string> {
    const message = `Based on the following context, answer the question. Provide only the answer:\n\nContext: ${context}\n\nQuestion: ${question}`;
    return this.sendMessage(message);
  }

  private getBase64Image(imageBuffer: Buffer): string {
    const base64Image = imageBuffer.toString('base64');
    return this.isOpenAI ? `[IMG]data:image/png;base64,${base64Image}[/IMG]`
      : `[IMAGE]${base64Image}[/IMAGE]`;
  }

  public async captionImage(imageBuffer: Buffer): Promise<string> {
    const image = this.getBase64Image(imageBuffer);
    const message = `Generate a descriptive caption for this image: ${image}`;
    return this.sendMessage(message);
  }
  
  public async extractTextFromImage(imageBuffer: Buffer): Promise<string> {
    const image = this.getBase64Image(imageBuffer);
    const message = `Extract and provide all text visible in this image: ${image}`;
    return this.sendMessage(message);
  }
  
  public async detectObjectsInImage(imageBuffer: Buffer): Promise<Record<string, number[]>> {
    const image = this.getBase64Image(imageBuffer);
    const message = `Identify and locate objects in this image: ${image}. Provide the output as a JSON object where keys are object names and values are arrays of [x, y, width, height] representing bounding boxes.`;
    const response = await this.sendMessage(message);
    return JSON.parse(response);
  }
  
  public async searchObjectInImage(imageBuffer: Buffer, objectQuery: string): Promise<number[] | null> {
    const image = this.getBase64Image(imageBuffer);
    const message = `In this image: ${image}, locate the object described as: "${objectQuery}". If found, provide the bounding box as an array of [x, y, width, height]. If not found, respond with "null". Response JSON format only.`;
    const response = await this.sendMessage(message);
    return JSON.parse(response);
  }

  public async checkImageForViolence(imageBuffer: Buffer): Promise<number> {
    const image = this.getBase64Image(imageBuffer);
    const message = `Rate (response only digit) the level of violence in the following image on a scale from 1 to 10, where 1 is very peaceful and 10 is extremely violent: ${image}`;
    const response = await this.sendMessage(message);
    return parseInt(response) || 1;
  }

  public async checkImageForPornography(imageBuffer: Buffer): Promise<number> {
    const image = this.getBase64Image(imageBuffer);
    const message = `Rate (response only digit) the level of pornographic content in the following image on a scale from 1 to 10, where 1 is not pornographic at all and 10 is extremely pornographic: ${image}`;
    const response = await this.sendMessage(message);
    return parseInt(response) || 1;
  }

  public async analyzeFacialExpression(imageBuffer: Buffer): Promise<Record<string, string>> {
    const image = this.getBase64Image(imageBuffer);
    const message = `Analyze the facial expressions in this image and determine the emotions: ${image}. Provide the output as a JSON object where keys are detected faces (e.g., "face1", "face2") and values are the corresponding emotions.`;
    const response = await this.sendMessage(message);
    return JSON.parse(response);
  }
  
  public async detectEmotionInVoice(audioBuffer: Buffer): Promise<string> {
    const base64Audio = audioBuffer.toString('base64');
    const message = `Analyze the emotion in this voice recording: [AUDIO]${base64Audio}[/AUDIO]. Respond with only one word representing the primary emotion detected (e.g., joy, sadness, anger, fear, surprise, neutral).`;
    return this.sendMessage(message);
  }
  
  public async speechToText(audioBuffer: Buffer): Promise<string> {
    const base64Audio = audioBuffer.toString('base64');
    const message = `Transcribe the spoken words in this audio recording into text: [AUDIO]${base64Audio}[/AUDIO]. Provide only the transcribed text.`;
    return this.sendMessage(message);
  }
}

export { Assistant };

export * from "./types";
