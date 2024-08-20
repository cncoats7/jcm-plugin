import { JCM_DEFAULT_SETTINGS } from '../settings'; 
import OpenAIApi from "openai";

export const getAISummary = async (textToSummarize: string) => {
    const openai = new OpenAIApi({
        apiKey: JCM_DEFAULT_SETTINGS.azureOpenAIKey,
    });
    
    const prompt = JCM_DEFAULT_SETTINGS.atomPrompt + textToSummarize;

    const response = await openai.chat.completions.create({
        model: JCM_DEFAULT_SETTINGS.azureOpenAIDeployment, // Specify the deployment name
        messages: [{ role: 'user', content: prompt}],
        temperature: 0.9,
        max_tokens: 100, // Adjust max tokens as needed
    });

    return response.choices[0].message.content;
}