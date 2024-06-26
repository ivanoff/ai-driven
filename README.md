# ai-driven

An AI-powered content analysis and moderation toolkit using Claude API.

## Description

`ai-driven` is a TypeScript module that provides easy-to-use functions for content moderation, text translation, and image analysis. It leverages the power of Claude AI to perform various tasks such as:

- Text translation
- Offensive language detection
- Profanity checking
- Violence detection in images
- Pornographic content detection in images

## Installation

To install the `ai-driven` module, run the following command:

```bash
npm install ai-driven
```

## Setup

1. Create a `.env` file in the root of your project.
2. Add your Claude API key and URL to the `.env` file:

```
CLAUDE_API_KEY=your_api_key_here
CLAUDE_API_URL=https://api.anthropic.com/v1/messages
```

## Usage

Here's a basic example of how to use the `ai-driven` module:

```typescript
import Assistant from 'ai-driven';
import fs from 'fs/promises';

async function main() {
  const assistant = new Assistant();

  // Translate text
  const translatedText = await assistant.translateText('Hello, world!');
  console.log('Translated text:', translatedText);

  // Check for offensive language
  const offensiveLevel = await assistant.checkForOffensiveLanguage('You are stupid!');
  console.log('Offensive level:', offensiveLevel);

  // Check for profanity
  const profanityLevel = await assistant.checkForProfanity('Damn it!');
  console.log('Profanity level:', profanityLevel);

  // Check an image for violence
  const imageBuffer = await fs.readFile('path/to/your/image.jpg');
  const violenceLevel = await assistant.checkImageForViolence(imageBuffer);
  console.log('Violence level in image:', violenceLevel);

  // Check an image for pornography
  const pornographyLevel = await assistant.checkImageForPornography(imageBuffer);
  console.log('Pornography level in image:', pornographyLevel);
}

main().catch(console.error);
```

## API Methods

The `ai-driven` module provides the following methods:

1. `translateText(text: string): Promise<string>`
   - Translates the given text to English.

2. `checkForOffensiveLanguage(text: string): Promise<number>`
   - Checks the given text for offensive language and returns a score from 1 to 10.

3. `checkForProfanity(text: string): Promise<number>`
   - Checks the given text for profanity and returns a score from 1 to 10.

4. `checkImageForViolence(imageBuffer: Buffer): Promise<number>`
   - Analyzes the given image for violent content and returns a score from 1 to 10.

5. `checkImageForPornography(imageBuffer: Buffer): Promise<number>`
   - Analyzes the given image for pornographic content and returns a score from 1 to 10.

## Note

This module requires a valid Claude API key to function. Ensure you have the necessary permissions and comply with Claude's terms of service when using this module.

## License

[MIT](https://choosealicense.com/licenses/mit/)
```

This README provides a comprehensive overview of your `ai-driven` module, including installation instructions, setup process, usage examples, and a list of available API methods. You may want to adjust the license information or add more detailed documentation as needed.