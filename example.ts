import { Assistant } from 'ai-driven';
import fs from 'fs/promises';

async function main() {
  const assistant = new Assistant();

  // Example of using the translation function
  const translatedText = await assistant.translateText('Bonjour le monde!', 'it');
  console.log('Translated text:', translatedText);

  // Language detection
  const detectedLanguage = await assistant.detectLanguage('Hola, ¿cómo estás?');
  console.log('Detected language:', detectedLanguage);

  // Grammar and spelling correction
  const correctedText = await assistant.correctText('Their are alot of misteakes in this sentance.');
  console.log('Corrected text:', correctedText);

  // Text summarization
  const longText = 'Constitutional AI is an approach developed by Anthropic for training AI systems, particularly language models like Claude, to be harmless and helpful without relying on extensive human feedback. The method, detailed in the paper "Constitutional AI: Harmlessness from AI Feedback" involves two phases: supervised learning and reinforcement learning.'; // Long text here
  const summary = await assistant.summarizeText(longText, 50);
  console.log('Summary:', summary);

  // Text generation
  const generatedText = await assistant.generateText('Write a short story about a robot learning to paint', 100);
  console.log('Generated text:', generatedText);

  // Text paraphrasing
  const paraphrasedText = await assistant.paraphraseText('The quick brown fox jumps over the lazy dog.');
  console.log('Paraphrased text:', paraphrasedText);

  // Text classification
  const categories = ['Technology', 'Sports', 'Politics', 'Entertainment'];
  const classifiedCategory = await assistant.classifyText('The new iPhone was announced yesterday', categories);
  console.log('Classified category:', classifiedCategory);

  // Keyword extraction
  const keywords = await assistant.extractKeywords('Artificial intelligence is transforming various industries including healthcare and finance.', 5);
  console.log('Extracted keywords:', keywords);

  // Named Entity Recognition
  const entities = await assistant.extractEntities('Apple Inc. was founded by Steve Jobs in Cupertino, California on April 1, 1976.');
  console.log('Extracted entities:', entities);

  // Sentiment Analysis
  const sentiment = await assistant.analyzeSentiment('I love this product, it\'s amazing!');
  console.log('Sentiment:', sentiment);

  // Example of checking for offensive language
  const offensiveLevel = await assistant.checkForOffensiveLanguage('You are stupid!');
  console.log('Offensive level:', offensiveLevel);

  // Example of checking for profanity
  const profanityLevel = await assistant.checkForProfanity('Damn it!');
  console.log('Profanity level:', profanityLevel);

  // Emotion Detection in Text
  const emotion = await assistant.detectEmotion('I can\'t believe I won the lottery! This is the best day ever!');
  console.log('Detected emotion:', emotion);

  // Question Answering
  const context = 'The capital of France is Paris. It is known for the Eiffel Tower.';
  const answer = await assistant.answerQuestion('What is the capital of France?', context);
  console.log('Answer:', answer);

  // Image Captioning
  const imageBuffer = await fs.readFile('path/to/your/image.jpg');
  const caption = await assistant.captionImage(imageBuffer);
  console.log('Image caption:', caption);

  // Optical Character Recognition (OCR)
  const extractedText = await assistant.extractTextFromImage(imageBuffer);
  console.log('Extracted text from image:', extractedText);

  // Object Detection in Images
  const detectedObjects = await assistant.detectObjectsInImage(imageBuffer);
  console.log('Detected objects:', detectedObjects);

  // Search Object in Images
  const objectLocation = await assistant.searchObjectInImage(imageBuffer, 'cat');
  console.log('Cat location:', objectLocation);

  // Example of checking an image for violence
  const violenceLevel = await assistant.checkImageForViolence(imageBuffer);
  console.log('Violence level in image:', violenceLevel);

  // Example of checking an image for pornography
  const pornographyLevel = await assistant.checkImageForPornography(imageBuffer);
  console.log('Pornography level in image:', pornographyLevel);

  // Facial Expression Analysis
  const facialExpressions = await assistant.analyzeFacialExpression(imageBuffer);
  console.log('Facial expressions:', facialExpressions);

  // Emotion Detection in Voice
  const audioBuffer = await fs.readFile('path/to/your/audio.wav');
  const voiceEmotion = await assistant.detectEmotionInVoice(audioBuffer);
  console.log('Emotion in voice:', voiceEmotion);

  // Speech-to-Text Conversion
  const transcribedText = await assistant.speechToText(audioBuffer);
  console.log('Transcribed text:', transcribedText);  
}

main().catch(console.error);