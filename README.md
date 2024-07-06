![ai-driven](./assets/logo.png)

`ai-driven` is a module that leverages `Claude AI` to provide a comprehensive suite of natural language processing and computer vision functions. It offers easy-to-use methods ([API Methods list](#api-methods)) for a wide range of tasks including:

- **Text Processing**:
  - Content moderation
  - Text translation
  - Language detection
  - Grammar and spelling correction
  - Text summarization
  - Text generation
  - Text paraphrasing
  - Text classification
  - Keyword extraction
  - Named Entity Recognition (NER)
  - Sentiment analysis
  - Emotion detection in text
  - Question answering

- **Image Analysis**:
  - Image captioning
  - Optical Character Recognition (OCR)
  - Object detection
  - Object search
  - Facial expression analysis
  - Violence detection
  - Pornography detection

- **Audio Processing**:
  - Emotion detection in voice
  - Speech-to-text conversion

This versatile module simplifies complex AI tasks, making it easier for developers to integrate advanced AI capabilities into their applications.

## Example

```typescript
import { Assistant } from 'ai-driven';

const assistant = new Assistant({ apiKey: 'your_api_key_here' });

const translatedText = await assistant.translateText('Hello, world!', 'it');

console.log(translatedText); // => Ciao, mondo!
```

You can find more usage examples [here](./example.ts)

#### How much does it cost?

Currently, the most affordable model costs `$0.25` per million tokens (MTok) for input and `$1.25` per MTok for output. More details [here](https://docs.anthropic.com/en/docs/about-claude/models)

If you only use the text examples from [example.ts](./example.ts), you'll consume `739 tokens for input` and `384 tokens for output`, resulting in a cost of approximately `$0.0007`.

However, *this cost will increase significantly if you use image and audio processing, as it depends entirely on the size of the files you're working with—larger files incur higher costs*.

#### Rate Limits

For the most up-to-date information on rate limits, please refer to the [Rate Limits page](https://console.anthropic.com/settings/limits)

#### API Key

To use this library, you'll need an API key. You can obtain one from the Anthropic console:
[https://console.anthropic.com/settings/keys](https://console.anthropic.com/settings/keys)

#### List of Models

- claude-3-5-sonnet-20240620	
- claude-3-opus-20240229	
- claude-3-sonnet-20240229	
- claude-3-haiku-20240307

More about models: [https://docs.anthropic.com/en/docs/about-claude/models#model-names](https://docs.anthropic.com/en/docs/about-claude/models#model-names)

## Description

`ai-driven` leverages the power of Claude AI to perform various tasks such as:

- **Text translation**: Convert text from one language to another while preserving meaning and context - `translateText(text: string, lang?: string, context?: string ): Promise<string>`

- **Language detection**: Automatically identify the language of a given text. Return 2-letters ISO_639-1 language code - `detectLanguage(text: string): Promise<string>`

- **Grammar and spelling correction**: Identify and correct grammatical errors and spelling mistakes in text - `correctText(text: string): Promise<string>`

- **Text Summarization**: Generate concise summaries of longer text documents - `summarizeText(text: string, maxWords?: number): Promise<string>`

- **Text Generation**: Create coherent and contextually relevant text based on given prompts - `generateText(prompt: string, maxWords?: number): Promise<string>`

- **Text paraphrasing**: Rewrite text to convey the same meaning using different words and sentence structures - `paraphraseText(text: string): Promise<string>`

- **Text classification**: Categorize text into predefined classes or topics - `classifyText(text: string, categories: string[]): Promise<string>`

- **Keyword extraction**: Identify and extract the most important or relevant words or phrases from a text - `extractKeywords(text: string, count?: number): Promise<string[]>`

- **Named Entity Recognition (NER)**: Extract entities like names, dates, locations, and organizations from text - `extractEntities(text: string): Promise<Record<string, string[]>>`

- **Sentiment Analysis**: Detect the sentiment (positive, negative, neutral) in text data - `analyzeSentiment(text: string): Promise<string>`

- **Offensive language detection**: Identify and flag inappropriate, offensive, or harmful language in text - `checkForOffensiveLanguage(text: string): Promise<number>`

- **Profanity checking**: Detect and filter out profane or vulgar words and expressions in text - `checkForProfanity(text: string): Promise<number>`

- **Emotion Detection**: Identify specific emotions (e.g., joy, sadness, anger) in text - `detectEmotion(text: string): Promise<string>`

- **Question Answering**: Provide accurate answers to questions based on a given context or dataset - `answerQuestion(question: string, context: string): Promise<string>`


- **Image Captioning**: Generate descriptive captions for images - `captionImage(imageBuffer: Buffer): Promise<string>`

- **Optical Character Recognition (OCR)**: Extract text from images of documents or handwritten notes - `extractTextFromImage(imageBuffer: Buffer): Promise<string>`

- **Object Detection in Images**: Identify and locate objects within images - `detectObjectsInImage(imageBuffer: Buffer): Promise<Record<string, number[]>>`

- **Search Object in Images**: Locate specific objects within images based on user queries - `searchObjectInImage(imageBuffer: Buffer, objectQuery: string): Promise<number[] | null>`

- **Violence detection in images**: Identify and flag images containing violent content or scenes - `checkImageForViolence(imageBuffer: Buffer): Promise<number>`

- **Pornographic content detection in images**: Detect and filter out images containing explicit or pornographic content - `checkImageForPornography(imageBuffer: Buffer): Promise<number>`

- **Facial expression analysis in images**: Recognize and categorize facial expressions in images to determine emotions - `analyzeFacialExpression(imageBuffer: Buffer): Promise<Record<string, string>>`


- **Emotion Detection in Voice**: Identify specific emotions (e.g., joy, sadness, anger) in voice data - `detectEmotionInVoice(audioBuffer: Buffer): Promise<string>`

- **Speech-to-text conversion**: Transcribe spoken words from audio recordings into written text - `speechToText(audioBuffer: Buffer): Promise<string>`

## Installation

To install the `ai-driven` module, run the following command:

```bash
npm i -S ai-driven
```

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
import { Assistant } from 'ai-driven';
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

| Method | Description | Parameters | Return Promise Type |
|--------|-------------|------------|-------------|
| `translateText` | Translates the given text to selected language (English by default) | `text: string, lang?: string, context?: string` | `string` |
| `detectLanguage` | Detects the language of the provided text | `text: string` | `string` |
| `correctText` | Corrects grammar and spelling errors in the given text | `text: string` | `string` |
| `summarizeText` | Generates a summary of the provided text, optionally limiting the summary length | `text: string, maxWords?: number` | `string` |
| `generateText` | Creates coherent and contextually relevant text based on the given prompt | `prompt: string, maxWords?: number` | `string` |
| `paraphraseText` | Rewrites the given text to convey the same meaning using different words and sentence structures | `text: string` | `string` |
| `classifyText` | Categorizes the given text into one of the predefined classes or topics | `text: string, categories: string[]` | `string` |
| `extractKeywords` | Identifies and extracts the most important or relevant words or phrases from the text | `text: string, count?: number` | `string[]` |
| `extractEntities` | Extracts named entities (names, dates, locations, organizations) from the text | `text: string` | `Record<string, string[]>` |
| `analyzeSentiment` | Detects the sentiment (positive, negative, neutral) in the given text | `text: string` | `string` |
| `checkForOffensiveLanguage` | Checks the given text for offensive language and returns a score from 1 to 10 | `text: string` | `number` |
| `checkForProfanity` | Checks the given text for profanity and returns a score from 1 to 10 | `text: string` | `number` |
| `detectEmotion` | Identifies specific emotions (e.g., joy, sadness, anger) in the given text | `text: string` | `string` |
| `answerQuestion` | Provides an accurate answer to the question based on the given context | `question: string, context: string` | `string` |
| `captionImage` | Generates a descriptive caption for the given image | `imageBuffer: Buffer` | `string` |
| `extractTextFromImage` | Extracts text from images of documents or handwritten notes | `imageBuffer: Buffer` | `string` |
| `detectObjectsInImage` | Identifies and locates objects within the given image | `imageBuffer: Buffer` | `Record<string, number[]>` |
| `searchObjectInImage` | Locates a specific object within the image based on the user query | `imageBuffer: Buffer, objectQuery: string` | `number[] \| null` |
| `checkImageForViolence` | Analyzes the given image for violent content and returns a score from 1 to 10 | `imageBuffer: Buffer` | `number` |
| `checkImageForPornography` | Analyzes the given image for pornographic content and returns a score from 1 to 10 | `imageBuffer: Buffer` | `number` |
| `analyzeFacialExpression` | Recognizes and categorizes facial expressions in the given image to determine emotions | `imageBuffer: Buffer` | `Record<string, string>` |
| `detectEmotionInVoice` | Identifies specific emotions in the given voice data | `audioBuffer: Buffer` | `string` |
| `speechToText` | Transcribes spoken words from the given audio recording into written text | `audioBuffer: Buffer` | `string` |

## Note

This module requires a valid Claude API key to function. Ensure you have the necessary permissions and comply with Claude's terms of service when using this module.

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Created by

Dimitry Ivanov <2@ivanoff.org.ua> # curl -A cv ivanoff.org.ua
