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
    const message = `Translate the following text ${c} to ${l}: "${text}"`;
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
}

export type AssistantType = {
  apiKey: string;
  apiUrl?: string;
  apiModel?: string;
};

export default Assistant;
