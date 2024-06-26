class Assistant {
  private apiKey: string;
  private apiUrl: string;

  constructor() {
    this.apiKey = process.env.CLAUDE_API_KEY || '';
    this.apiUrl = process.env.CLAUDE_API_URL || '';
  }

  private async sendToClaude(message: string): Promise<string> {
    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: 'claude-3-opus-20240229',
        messages: [{ role: 'user', content: message }],
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }

  public async translateText(text: string): Promise<string> {
    const message = `Translate the following text to English: "${text}"`;
    return this.sendToClaude(message);
  }

  public async checkForOffensiveLanguage(text: string): Promise<number> {
    const message = `Rate the level of offensiveness in the following text on a scale from 1 to 10: "${text}"`;
    const response = await this.sendToClaude(message);
    return parseInt(response) || 1;
  }

  public async checkForProfanity(text: string): Promise<number> {
    const message = `Rate the level of profanity in the following text on a scale from 1 to 10: "${text}"`;
    const response = await this.sendToClaude(message);
    return parseInt(response) || 1;
  }

  public async checkImageForViolence(imageBuffer: Buffer): Promise<number> {
    const base64Image = imageBuffer.toString('base64');
    const message = `Rate the level of violence in this image on a scale from 1 to 10: [IMAGE]${base64Image}[/IMAGE]`;
    const response = await this.sendToClaude(message);
    return parseInt(response) || 1;
  }

  public async checkImageForPornography(imageBuffer: Buffer): Promise<number> {
    const base64Image = imageBuffer.toString('base64');
    const message = `Rate the level of pornographic content in this image on a scale from 1 to 10: [IMAGE]${base64Image}[/IMAGE]`;
    const response = await this.sendToClaude(message);
    return parseInt(response) || 1;
  }
}

export default Assistant;
