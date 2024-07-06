class Assistant {
  private apiKey: string;
  private apiUrl: string;
  private apiModel: string;

  constructor(options?: AssistantType) {
    const { apiKey, apiUrl, apiModel } = options || {};

    this.apiKey = apiKey || process.env.CLAUDE_API_KEY || '';
    this.apiUrl = apiUrl || process.env.CLAUDE_API_URL || 'https://api.anthropic.com/v1/messages';
    this.apiModel = apiModel || process.env.CLAUDE_API_MODEL || 'claude-3-haiku-20240307';

    if (!this.apiKey) throw new Error('CLAUDE_API_KEY is not defined. You can obtain one from the Anthropic console: https://console.anthropic.com/settings/keys');
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

  public async translateText(text: string, lang?: string, context?: string): Promise<string> {
    const l = lang || 'English'
    const c = !context ? '' : `(context: ${context})`;
    const message = `Translate the following text ${c} to \`${l}\` language: \n\n${text}`;
    return this.sendToClaude(message);
  }

  public async detectLanguage(text: string): Promise<string> {
    const message = `Detect the language of the following text. Respond with only 2-letters ISO_639-1 language code: \n\n${text}`;
    return this.sendToClaude(message);
  }
  
  public async correctText(text: string): Promise<string> {
    const message = `Correct any grammar and spelling errors in the following text. Provide only the corrected text: \n\n${text}`;
    return this.sendToClaude(message);
  }
  
  public async summarizeText(text: string, maxWords?: number): Promise<string> {
    const lengthConstraint = maxWords ? `in approximately ${maxWords} words` : '';
    const message = `Summarize the following text ${lengthConstraint}. Provide only the summary: \n\n${text}`;
    return this.sendToClaude(message);
  }

  public async generateText(prompt: string, maxWords?: number): Promise<string> {
    const lengthConstraint = maxWords ? `in approximately ${maxWords} words` : '';
    const message = `Generate a coherent and contextually relevant text ${lengthConstraint} based on the following prompt: \n\n${prompt}`;
    return this.sendToClaude(message);
  }
  
  public async paraphraseText(text: string): Promise<string> {
    const message = `Paraphrase the following text to convey the same meaning using different words and sentence structures. Provide only the paraphrased text: \n\n${text}`;
    return this.sendToClaude(message);
  }
  
  public async classifyText(text: string, categories: string[]): Promise<string> {
    const categoriesStr = categories.join(', ');
    const message = `Classify the following text into one of these categories: ${categoriesStr}. Respond with only the chosen category: \n\n${text}`;
    return this.sendToClaude(message);
  }
  
  public async extractKeywords(text: string, count?: number): Promise<string[]> {
    const countConstraint = count ? `Limit the output to ${count} keywords.` : '';
    const message = `Extract the most important or relevant keywords or phrases from the following text. ${countConstraint} Provide the keywords as a comma-separated list: \n\n${text}`;
    const response = await this.sendToClaude(message);
    return response.split(',').map(keyword => keyword.trim());
  }
  
  public async extractEntities(text: string): Promise<Record<string, string[]>> {
    const message = `Extract named entities (names, dates, locations, organizations) from the following text. Provide the output as a JSON object only where keys are entity types and values are arrays of extracted entities: \n\n${text}`;
    const response = await this.sendToClaude(message);
    return JSON.parse(response);
  }
  
  public async analyzeSentiment(text: string): Promise<string> {
    const message = `Analyze the sentiment of the following text. Respond with only one word: positive, negative, or neutral: \n\n${text}`;
    return this.sendToClaude(message);
  }

  public async checkForOffensiveLanguage(text: string): Promise<number> {
    const message = `Rate (response only digit) the offensiveness of the following message on a scale from 1 to 10, where 1 is very peaceful and 10 is extremely aggressive: "${text}"`;
    const response = await this.sendToClaude(message);
    return parseInt(response);
  }

  public async checkForProfanity(text: string): Promise<number> {
    const message = `Rate (response only digit) the level of profanity in the following message on a scale from 1 to 10, where 1 is very clean and 10 is extremely profane: "${text}"`;
    const response = await this.sendToClaude(message);
    return parseInt(response);
  }

  public async detectEmotion(text: string): Promise<string> {
    const message = `Detect the primary emotion in the following text. Respond with only one word representing the emotion (e.g., joy, sadness, anger, fear, surprise, disgust): \n\n${text}`;
    return this.sendToClaude(message);
  }
  
  public async answerQuestion(question: string, context: string): Promise<string> {
    const message = `Based on the following context, answer the question. Provide only the answer:\n\nContext: ${context}\n\nQuestion: ${question}`;
    return this.sendToClaude(message);
  }

  public async captionImage(imageBuffer: Buffer): Promise<string> {
    const base64Image = imageBuffer.toString('base64');
    const message = `Generate a descriptive caption for this image: [IMAGE]${base64Image}[/IMAGE]`;
    return this.sendToClaude(message);
  }
  
  public async extractTextFromImage(imageBuffer: Buffer): Promise<string> {
    const base64Image = imageBuffer.toString('base64');
    const message = `Extract and provide all text visible in this image: [IMAGE]${base64Image}[/IMAGE]`;
    return this.sendToClaude(message);
  }
  
  public async detectObjectsInImage(imageBuffer: Buffer): Promise<Record<string, number[]>> {
    const base64Image = imageBuffer.toString('base64');
    const message = `Identify and locate objects in this image: [IMAGE]${base64Image}[/IMAGE]. Provide the output as a JSON object where keys are object names and values are arrays of [x, y, width, height] representing bounding boxes.`;
    const response = await this.sendToClaude(message);
    return JSON.parse(response);
  }
  
  public async searchObjectInImage(imageBuffer: Buffer, objectQuery: string): Promise<number[] | null> {
    const base64Image = imageBuffer.toString('base64');
    const message = `In this image: [IMAGE]${base64Image}[/IMAGE], locate the object described as: "${objectQuery}". If found, provide the bounding box as an array of [x, y, width, height]. If not found, respond with "null".`;
    const response = await this.sendToClaude(message);
    return JSON.parse(response);
  }

  public async checkImageForViolence(imageBuffer: Buffer): Promise<number> {
    const base64Image = imageBuffer.toString('base64');
    const message = `Rate (response only digit) the level of violence in the following image on a scale from 1 to 10, where 1 is very peaceful and 10 is extremely violent: [IMAGE]${base64Image}[/IMAGE]`;
    const response = await this.sendToClaude(message);
    return parseInt(response) || 1;
  }

  public async checkImageForPornography(imageBuffer: Buffer): Promise<number> {
    const base64Image = imageBuffer.toString('base64');
    const message = `Rate (response only digit) the level of pornographic content in the following image on a scale from 1 to 10, where 1 is not pornographic at all and 10 is extremely pornographic: [IMAGE]${base64Image}[/IMAGE]`;
    const response = await this.sendToClaude(message);
    return parseInt(response) || 1;
  }

  public async analyzeFacialExpression(imageBuffer: Buffer): Promise<Record<string, string>> {
    const base64Image = imageBuffer.toString('base64');
    const message = `Analyze the facial expressions in this image and determine the emotions: [IMAGE]${base64Image}[/IMAGE]. Provide the output as a JSON object where keys are detected faces (e.g., "face1", "face2") and values are the corresponding emotions.`;
    const response = await this.sendToClaude(message);
    return JSON.parse(response);
  }
  
  public async detectEmotionInVoice(audioBuffer: Buffer): Promise<string> {
    const base64Audio = audioBuffer.toString('base64');
    const message = `Analyze the emotion in this voice recording: [AUDIO]${base64Audio}[/AUDIO]. Respond with only one word representing the primary emotion detected (e.g., joy, sadness, anger, fear, surprise, neutral).`;
    return this.sendToClaude(message);
  }
  
  public async speechToText(audioBuffer: Buffer): Promise<string> {
    const base64Audio = audioBuffer.toString('base64');
    const message = `Transcribe the spoken words in this audio recording into text: [AUDIO]${base64Audio}[/AUDIO]. Provide only the transcribed text.`;
    return this.sendToClaude(message);
  }
}

export type AssistantType = {
  apiKey: string;
  apiUrl?: string;
  apiModel?: string;
};

export { Assistant };
