import Assistant from 'ai-driven';
import fs from 'fs/promises';

async function main() {
  const assistant = new Assistant();

  // Example of using the translation function
  const translatedText = await assistant.translateText('Bonjour le monde!', 'it');
  console.log('Translated text:', translatedText);

  // Example of checking for offensive language
  const offensiveLevel = await assistant.checkForOffensiveLanguage('You are stupid!');
  console.log('Offensive level:', offensiveLevel);

  // Example of checking for profanity
  const profanityLevel = await assistant.checkForProfanity('Damn it!');
  console.log('Profanity level:', profanityLevel);

  // Example of checking an image for violence
  const imageBuffer = await fs.readFile('path/to/your/image.jpg');
  const violenceLevel = await assistant.checkImageForViolence(imageBuffer);
  console.log('Violence level in image:', violenceLevel);

  // Example of checking an image for pornography
  const pornographyLevel = await assistant.checkImageForPornography(imageBuffer);
  console.log('Pornography level in image:', pornographyLevel);
}

main().catch(console.error);