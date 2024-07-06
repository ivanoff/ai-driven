class a{apiKey;apiUrl;apiModel;constructor(s){const{apiKey:e,apiUrl:t,apiModel:n}=s||{};if(this.apiKey=e||process.env.CLAUDE_API_KEY||"",this.apiUrl=t||process.env.CLAUDE_API_URL||"https://api.anthropic.com/v1/messages",this.apiModel=n||process.env.CLAUDE_API_MODEL||"claude-3-haiku-20240307",!this.apiKey)throw new Error("CLAUDE_API_KEY is not defined. You can obtain one from the Anthropic console: https://console.anthropic.com/settings/keys")}async sendToClaude(s){const e=await fetch(this.apiUrl,{method:"POST",headers:{"Content-Type":"application/json","x-api-key":this.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:this.apiModel,max_tokens:1024,messages:[{role:"user",content:s}]})});if(!e.ok)throw new Error(`HTTP error! status: ${e.status}, response: \n${JSON.stringify(await e.json(),null,2)}`);return(await e.json()).content[0].text}async translateText(s,e,t){const n=e||"English",o=`Translate the following text ${!t?"":`(context: ${t})`} to \`${n}\` language: \n\n${s}`;return this.sendToClaude(o)}async checkForOffensiveLanguage(s){const e=`Rate (response only digit) the offensiveness of the following message on a scale from 1 to 10, where 1 is very peaceful and 10 is extremely aggressive: "${s}"`,t=await this.sendToClaude(e);return parseInt(t)}async checkForProfanity(s){const e=`Rate (response only digit) the level of profanity in the following message on a scale from 1 to 10, where 1 is very clean and 10 is extremely profane: "${s}"`,t=await this.sendToClaude(e);return parseInt(t)}async checkImageForViolence(s){const t=`Rate (response only digit) the level of violence in the following image on a scale from 1 to 10, where 1 is very peaceful and 10 is extremely violent: [IMAGE]${s.toString("base64")}[/IMAGE]`,n=await this.sendToClaude(t);return parseInt(n)||1}async checkImageForPornography(s){const t=`Rate (response only digit) the level of pornographic content in the following image on a scale from 1 to 10, where 1 is not pornographic at all and 10 is extremely pornographic: [IMAGE]${s.toString("base64")}[/IMAGE]`,n=await this.sendToClaude(t);return parseInt(n)||1}}export{a as Assistant};
