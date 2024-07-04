# ai-driven

`ai-driven` is a TypeScript module that provides easy-to-use functions for **content moderation**, **text translation**, and **image analysis**.

It leverages the power of Claude AI to perform various tasks such as:

- Text translation
- Offensive language detection
- Profanity checking
- Violence detection in images
- Pornographic content detection in images

## Example

### API Key

To use this library, you'll need an API key. You can obtain one from the Anthropic console:
[https://console.anthropic.com/settings/keys](https://console.anthropic.com/settings/keys)

### A Basic Example

```typescript
import Assistant from 'ai-driven';

const assistant = new Assistant({ apiKey: 'your_api_key_here' });

const translatedText = await assistant.translateText('Hello, world!', 'it');

console.log('Translated text:', translatedText); // => 
```

## Installation

To install the `ai-driven` module, run the following command:

```bash
npm i -S ai-driven
```

Here's an improved version of the setup instructions, written as a native English-speaking programmer would:

## Setup

You can configure the assistant in two ways:

### Option 1: Direct Initialization

Provide the configuration when creating the assistant:

```typescript
const assistant = new Assistant({
  apiKey: 'your_api_key_here',
  apiUrl: 'https://api.anthropic.com/v1/messages', // optional
  apiModel: 'claude-3-haiku-20240307' // optional
});
```

### Option 2: Using Environment Variables

1. Create a `.env` file in your project's root directory.
2. Add the following variables to the `.env` file:

```
CLAUDE_API_KEY=your_api_key_here
CLAUDE_API_URL=https://api.anthropic.com/v1/messages
CLAUDE_API_MODEL=claude-3-opus-20240229
```

The assistant will automatically use these environment variables if no configuration is provided during initialization.

## Usage

Here's a basic example of how to use the `ai-driven` module:

```typescript
import Assistant from 'ai-driven';
import fs from 'fs/promises';

async function main() {
  const assistant = new Assistant({ apiKey: 'your_api_key_here' });

  // Translate text
  const translatedText = await assistant.translateText('Hello, world!', 'it');
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

1. `translateText(text: string, lang?: string, context?: string ): Promise<string>`
   - Translates the given text to selected language (English by default).

2. `checkForOffensiveLanguage(text: string): Promise<number>`
   - Checks the given text for offensive language and returns a score from 1 to 10, where 1 is very peaceful and 10 is extremely aggressive.

3. `checkForProfanity(text: string): Promise<number>`
   - Checks the given text for profanity and returns a score from 1 to 10, where 1 is very clean and 10 is extremely profane.

4. `checkImageForViolence(imageBuffer: Buffer): Promise<number>`
   - Analyzes the given image for violent content and returns a score from 1 to 10, where 1 is very peaceful and 10 is extremely violent.

5. `checkImageForPornography(imageBuffer: Buffer): Promise<number>`
   - Analyzes the given image for pornographic content and returns a score from 1 to 10, where 1 is not pornographic at all and 10 is extremely pornographic.

## Note

This module requires a valid Claude API key to function. Ensure you have the necessary permissions and comply with Claude's terms of service when using this module.

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Created by

Dimitry Ivanov <2@ivanoff.org.ua> # curl -A cv ivanoff.org.ua
