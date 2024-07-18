![ai-driven](./assets/logo.png)

`ai-driven` is a non-dependency module that leverages both `Claude AI` and `OpenAI's GPT` to provide a comprehensive suite of natural language processing and computer vision functions. This dual integration allows users to harness the unique strengths of both AI platforms, offering a wider range of capabilities and the ability to choose the most suitable AI model for specific tasks. 

## Example

```typescript
import { Assistant } from 'ai-driven';

const assistant = new Assistant({ apiVendor: 'OpenAI', apiKey: 'your_api_key_here' });

const translatedText = await assistant.translateText('Hello, world!', 'it');

console.log(translatedText); // => Ciao, mondo!
```

You can find more usage examples [here](./example.ts)

- [Example](#example)
- [Capabilities](#capabilities)
- [Installation](#installation)
- [Setup](#setup)
  - [Option 1: Direct Initialization](#option-1-direct-initialization)
  - [Option 2: Using Environment Variables](#option-2-using-environment-variables)
- [Usage](#usage)
- [Vendors](#vendors)
  - [OpenAI Vendor](#openai-vendor)
    - [How much does it cost?](#how-much-does-it-cost)
    - [Rate Limits](#rate-limits)
    - [API Key](#api-key)
    - [List of Models](#list-of-models)
  - [Claude Vendor](#claude-vendor)
    - [How much does it cost?](#how-much-does-it-cost-1)
    - [Rate Limits](#rate-limits-1)
    - [API Key](#api-key-1)
    - [List of Models](#list-of-models-1)
- [Description](#description)
- [API Methods](#api-methods)
  - [Free-form ask](#free-form-ask)
    - [Description:](#description-1)
    - [Free-form ask example](#free-form-ask-example)
      - [Result](#result)
    - [Signature](#signature)
    - [Parameters](#parameters)
    - [askOptionsType Interface](#askoptionstype-interface)
    - [Roles](#roles)
    - [Tasks](#tasks)
    - [Response formats](#response-formats)
    - [Tones](#tones)
    - [Writing Styles](#writing-styles)
    - [Emotions](#emotions)
- [Note](#note)
- [License](#license)
- [Created by](#created-by)

## Capabilities

`ai-driven` offers easy-to-use methods ([API Methods list](#api-methods)) for a wide range of tasks including:

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

- **Free-form ask** [[more](#free-form-ask)]
  - return only the answer (by default) or answer with AI comments
  - show answer in the specified language
  - act as a specific role [[list of roles](#roles)]
  - result in response format [[response formats](#response-formats)]
  - use a specific tone [[list of tones](#tones)]
  - apply a particular writing style [[list of writing styles](#writing-styles)]
  - convey a specific emotion [[list of emotions](#emotions)]

This versatile module simplifies complex AI tasks, making it easier for developers to integrate advanced AI capabilities into their applications.

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
  apiVendor: 'OpenAI', // 'OpenAI' or 'Claude'
  apiUrl: 'https://api.anthropic.com/v1/messages', // optional
  apiModel: 'claude-3-haiku-20240307' // optional
});
```

### Option 2: Using Environment Variables

1. Create a `.env` file in your project's root directory.
2. Add the following variables to the `.env` file:
2.1. For OpenAI:

```
OPENAI_API_KEY=your_OpenAI_api_key_here
OPENAI_API_URL=https://api.openai.com/v1/chat/completions
OPENAI_API_MODEL=gpt-3.5-turbo
```

2.2. For Claude:

```
CLAUDE_API_KEY=your_Claude_api_key_here
CLAUDE_API_URL=https://api.anthropic.com/v1/messages
CLAUDE_API_MODEL=claude-3-haiku-20240307
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

## Vendors

### OpenAI Vendor

#### How much does it cost?

The cost for using OpenAI's models varies depending on the model and usage. As of now, for the GPT-4o model, the pricing is as follows:
- `$0.005` per 1,000 tokens for input
- `$0.015` per 1,000 tokens for output

For more detailed and up-to-date pricing, please refer to the [OpenAI Pricing page](https://openai.com/pricing).

If you use the text examples from [example.ts](./example.ts), and you consume `739 tokens for input` and `384 tokens for output`, the cost would be approximately `$0,009`.

However, *the cost will increase significantly if you use image and audio processing models, as the pricing for these services depends on the size and complexity of the files you're working with—larger files incur higher costs*.

#### Rate Limits

For the most up-to-date information on rate limits, please refer to the [OpenAI Rate Limits page](https://platform.openai.com/docs/guides/rate-limits).

#### API Key

To use this library, you'll need an API key. You can obtain one from the OpenAI console:
[https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)

#### List of Models

- **GPT Models**:
  - `gpt-4`
  - `gpt-4-turbo`
  - `gpt-4-vision-preview`
  - `gpt-4o`
  - `gpt-4-32k`
  - `gpt-3.5-turbo`
  - `gpt-3.5-turbo-16k`
  - `gpt-3.5-turbo-instruct`

- **DALL-E Models**:
  - `dall-e-3`
  - `dall-e-2`

- **Whisper Models**:
  - `whisper`

- **Embedding Models**:
  - `text-embedding-3-large`
  - `text-embedding-3-small`
  - `text-embedding-ada-002`

- **Text-to-Speech Models**:
  - `tts-1`
  - `tts-1-hd`

More about models: [https://platform.openai.com/docs/models](https://platform.openai.com/docs/models)

### Claude Vendor

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

`ai-driven` leverages the power of Claude AI and OpenAI's GPT models to perform various tasks such as:

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

- **Optical Character Recognition (OCR)**: Extract text from images of documents or handwritten notes (not supported by OpenAI vendor) - `extractTextFromImage(imageBuffer: Buffer): Promise<string>`

- **Object Detection in Images**: Identify and locate objects within images - `detectObjectsInImage(imageBuffer: Buffer): Promise<Record<string, number[]>>`

- **Search Object in Images**: Locate specific objects within images based on user queries - `searchObjectInImage(imageBuffer: Buffer, objectQuery: string): Promise<number[] | null>`

- **Violence detection in images**: Identify and flag images containing violent content or scenes - `checkImageForViolence(imageBuffer: Buffer): Promise<number>`

- **Pornographic content detection in images**: Detect and filter out images containing explicit or pornographic content - `checkImageForPornography(imageBuffer: Buffer): Promise<number>`

- **Facial expression analysis in images**: Recognize and categorize facial expressions in images to determine emotions - `analyzeFacialExpression(imageBuffer: Buffer): Promise<Record<string, string>>`


- **Emotion Detection in Voice**: Identify specific emotions (e.g., joy, sadness, anger) in voice data (not supported by OpenAI vendor) - `detectEmotionInVoice(audioBuffer: Buffer): Promise<string>`

- **Speech-to-text conversion**: Transcribe spoken words from audio recordings into written text (not supported by OpenAI vendor) - `speechToText(audioBuffer: Buffer): Promise<string>`

## API Methods

The `ai-driven` module provides the following methods:

| Method | Description | Parameters | Return Promise Type |
|--------|-------------|------------|-------------|
| `ask` | Ask a question with customizable options [[more](#free-form-ask)] | `text: string, options?: askOptionsType` | `string` |
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
| `extractTextFromImage` | Extracts text from images of documents or handwritten notes (not supported by OpenAI vendor) | `imageBuffer: Buffer` | `string` |
| `detectObjectsInImage` | Identifies and locates objects within the given image | `imageBuffer: Buffer` | `Record<string, number[]>` |
| `searchObjectInImage` | Locates a specific object within the image based on the user query | `imageBuffer: Buffer, objectQuery: string` | `number[] \| null` |
| `checkImageForViolence` | Analyzes the given image for violent content and returns a score from 1 to 10 | `imageBuffer: Buffer` | `number` |
| `checkImageForPornography` | Analyzes the given image for pornographic content and returns a score from 1 to 10 | `imageBuffer: Buffer` | `number` |
| `analyzeFacialExpression` | Recognizes and categorizes facial expressions in the given image to determine emotions | `imageBuffer: Buffer` | `Record<string, string>` |
| `detectEmotionInVoice` | Identifies specific emotions in the given voice data (not supported by OpenAI vendor) | `audioBuffer: Buffer` | `string` |
| `speechToText` | Transcribes spoken words from the given audio recording into written text (not supported by OpenAI vendor) | `audioBuffer: Buffer` | `string` |

### Free-form ask

Method: `ask`

#### Description:

This method is used to ask a question with customizable options.

#### Free-form ask example

```typescript
import { Assistant } from 'ai-driven';

const assistant = new Assistant({ apiVendor: 'OpenAI', apiKey: 'your_api_key_here' });

const result = await assistant.ask(
  'bubble sort function',
  {
    format: 'TypeScript',
    answerOnly: false,
    language: 'en',
    role: 'Fitness Trainer',
    tone: 'Informative',
    style: 'Poetic',
    emotion: 'Love',
    context: 'Sort colors',
  }
);

console.log(result);
```

##### Result

Bubble Sort Function for Sorting Colors


Ah, the dance of colors, a captivating sight,

Where hues embrace, in a harmonious flight.

Let us embark on a journey, with grace and might,

To sort these vibrant shades, with all our might.


Fitness Trainer's Perspective:

Just as our bodies crave a well-ordered routine,

Our colors, too, deserve a rhythm, serene.

Through the Bubble Sort, we'll find the way,

To arrange these hues, in a beautiful display.


With each gentle swap, a transformation unfolds,

Allowing the spectrum to shine, its story untold.

From the lightest hue to the darkest hue,

We'll navigate this dance, with love anew.


So, let's dive in, and embrace the flow,

As we sort these colors, with a rhythmic glow.

For in this process, we'll find the art,

Of bringing order to the canvas of our heart.


```typescript
function bubbleSort(colors: string[]): string[] {
  const n = colors.length;
  for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
          if (colors[j] > colors[j + 1]) {
              // Swap colors[j] and colors[j+1]
              [colors[j], colors[j + 1]] = [colors[j + 1], colors[j]];
          }
      }
  }
  return colors;
}
```

#### Signature

```typescript
public async ask(question: string, options?: askOptionsType): Promise<string>
```

#### Parameters

- `question` (string): The question to ask.
- `options` (askOptionsType): Optional parameters to customize the question.

#### askOptionsType Interface

- `answerOnly` (boolean): Return only the answer. Default is `true`.
- `language` (string): Answer in the specified language.
- `context` (string): In the specified context.
- `role` (string): Act as a specific role.
- `task` (string): Create a specific task.
- `format` (string): Response format.
- `tone` (string): Tone of the response.
- `style` (string): Style of writing.
- `emotion` (string): Emotion to convey.

#### Roles

- Translator
- Programmer
- Data Scientist
- Analyst
- Researcher
- Teacher
- Tutor
- Historian
- Scientist
- Mathematician
- Statistician
- Financial Advisor
- Consultant
- Coach
- Mentor
- Content Writer
- Editor
- Proofreader
- Engineer
- Architect
- Designer
- Developer
- Marketer
- SEO Specialist
- Strategist
- Project Manager
- Product Manager
- Customer Support
- Technical Support
- Salesperson
- Psychologist
- Therapist
- Counselor
- Librarian
- Legal Advisor
- Medical Advisor
- Chemist
- Physicist
- Biologist
- Environmentalist
- Economist
- Entrepreneur
- Business Analyst
- Investor
- Accountant
- Auditor
- Chef
- Bartender
- Nutritionist
- Fitness Trainer
- Artist
- Musician
- Composer
- Poet
- Novelist
- Critic
- Reviewer

#### Tasks

- Essay
- Summary
- Report
- Research paper
- Presentation
- Speech
- Lesson plan
- Tutorial
- Documentation
- Code snippets
- Data analysis
- Business plan
- Marketing plan
- Article
- Blog post
- Product review
- User manual
- Test cases
- Screenplay
- Poem
- Short story
- Character profile
- Letter
- Resume
- Cover letter
- Recommendation letter
- Project proposal
- Interview questions
- Survey
- Quiz
- News article
- Social media content
- Email template
- FAQ
- Roadmap
- Checklist
- Recipe
- Meal plan
- Workout plan
- Book summary
- Annotated bibliography
- Financial forecast
- Grant proposal
- SWOT analysis
- Strategic plan
- Case study
- Itinerary
- Script for a podcast
- Storyboard
- Press release
- Content calendar
- Mind map
- Business case
- Product description
- User story
- API documentation
- Compliance report
- Risk assessment
- User journey map
- Technical specification
- Workflow diagram
- Competitive analysis
- Literature review
- Training module
- Onboarding plan
- Executive summary
- Customer persona
- Sales pitch
- White paper
- Case analysis
- Investment proposal
- Financial report
- Marketing campaign
- Content strategy
- Value proposition
- Partnership proposal
- Brand guideline
- Community guideline
- Action plan
- Conflict resolution plan
- Safety protocol
- Crisis management plan
- Disaster recovery plan
- Mission statement
- Vision statement
- Core values statement
- Diversity and inclusion plan
- Succession plan
- Employee handbook
- Operational plan
- Retention strategy
- Compensation plan
- Performance review
- Employee evaluation
- Professional development plan
- Retirement plan
- Sustainability plan
- Environmental impact assessment
- Corporate social responsibility report
- Governance framework
- Ethics policy
- Code of conduct
- Conflict of interest policy
- Whistleblower policy
- Privacy policy
- Data protection plan
- Information security policy
- Digital transformation strategy
- Technology roadmap
- IT disaster recovery plan
- Software requirements specification
- System architecture
- Database schema
- Data migration plan
- API integration plan
- Cloud adoption strategy
- DevOps strategy
- IT governance framework
- Enterprise architecture plan
- Business continuity plan
- IT service management plan
- Incident response plan
- Cybersecurity strategy
- Network architecture plan
- Infrastructure as code (IaC) template
- Deployment plan
- Monitoring and alerting strategy
- Software development lifecycle (SDLC) plan
- User acceptance testing (UAT) plan
- Change management plan
- Configuration management plan
- Release management plan
- Vendor management plan
- Procurement strategy
- Supply chain management plan
- Logistics plan
- Inventory management plan
- Quality control plan
- Lean manufacturing plan
- Six sigma plan
- Total quality management (TQM) plan
- Maintenance plan
- Asset management plan
- Facilities management plan
- Fleet management plan
- Energy management plan
- Waste management plan
- Water management plan
- Air quality management plan
- Noise management plan
- Land management plan
- Biodiversity management plan
- Ecosystem management plan
- Wildlife management plan
- Forestry management plan
- Fisheries management plan
- Tourism management plan
- Cultural heritage management plan
- Community development plan
- Public health plan
- Education plan
- Housing plan
- Transportation plan
- Urban planning plan
- Rural development plan
- Regional development plan
- National development plan
- International development plan

#### Response formats

- plain text
- JSON
- HTML
- XML
- CSV
- Markdown
- Table
- List
- CSV
- YAML
- LaTeX
- SQL
- JavaScript
- TypeScript
- Python
- PHP
- Java
- C#
- C++
- Ruby
- Go
- Swift
- Kotlin
- R
- Perl
- Shell (Bash)
- Code snippets
- Summary

#### Tones

- Friendly
- Professional
- Academic
- Casual
- Formal
- Enthusiastic
- Neutral
- Concise
- Detailed
- Humorous
- Empathetic
- Authoritative
- Informative
- Encouraging
- Diplomatic
- Respectful
- Analytical
- Conversational
- Instructional
- Matter-of-fact

#### Writing Styles

- Technical
- Scientific
- Poetic
- Narrative
- Comparative
- Analytical
- Descriptive
- Persuasive
- Expository
- Instructional
- Journalistic
- Historical
- Philosophical
- Legal
- Medical
- Business
- Educational
- Literary
- Conversational
- Socratic (question-based)
- Summary style
- Step-by-step guide
- Pros and cons analysis
- Hypothetical scenarios
- Case study approach
- Mother
- Father
- Uncle

#### Emotions

- Happiness
- Sadness
- Anger
- Fear
- Surprise
- Disgust
- Contempt
- Joy
- Trust
- Anticipation
- Anxiety
- Shame
- Guilt
- Embarrassment
- Excitement
- Envy
- Jealousy
- Pride
- Relief
- Satisfaction
- Frustration
- Despair
- Hope
- Nostalgia
- Loneliness
- Empathy
- Gratitude
- Regret
- Love
- Hatred
- Confusion
- Interest
- Boredom
- Contentment
- Grief
- Courage
- Shyness
- Enthusiasm
- Nervousness
- Admiration
- Disappointment
- Doubt
- Optimism
- Pessimism
- Relaxation
- Stress
- Determination
- Indifference
- Resentment
- Longing

## Note

This module requires a valid Claude API key to function. Ensure you have the necessary permissions and comply with Claude's terms of service when using this module.

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Created by

Dimitry Ivanov <2@ivanoff.org.ua> # curl -A cv ivanoff.org.ua
