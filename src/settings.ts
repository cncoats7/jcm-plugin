interface JcmSettings {
	mySetting: string;
	azureOpenAIKey: string;
	azureOpenAIDeployment: string;
	azureOpenAIInstance: string;
	azureOpenAIRegion: string;
	azureOpenAIEndpoint: string;
	azureOpenAIVersion: string;
    azureOpenAITemperature: number;
	defaultPrompt: string;
	
	vaultSettingsFilePath: string;
	vaultQuoteThresholdInDays: number;
	awsDynamoDBQuoteTable: string;
	awsDynamoDBQuoteTableKey: string;
	awsAccessKey: string;
	awsSecretKey: string;
	awsRegion: string;
	slideshowInterval: number;

	atomPrompt: string;
	atomPath: string;
	testAtomPath: string;
	maxAtomsToProcess: number;
	protonPath: string;
	testProtonPath: string
}

export const JCM_DEFAULT_SETTINGS: JcmSettings = {
	mySetting: 'default',
	azureOpenAIKey: '',
	azureOpenAIDeployment: 'gpt-4',
	azureOpenAIInstance: 'jcm-4',
	azureOpenAIRegion: 'eastus1',
	azureOpenAIVersion: '2023-03-15-preview',
	azureOpenAIEndpoint: 'https://jcm-4.openai.azure.com/',
	azureOpenAITemperature: 0.9,
    defaultPrompt: 'Your task is to assist in managing knowledge within the ' +
		'"Obsidian" system by summarizing Discord conversations on investing. ' +
		'Focusing on market trends, technical analysis, and insights, you are ' + 
		'to create a structured summary. This summary must include a title that ' +
		'captures the main insight of the discussion, a concise overview, bullet ' +
		'points of key insights with notes or definitions, names and contributions ' +
		'of participants, and a list of concepts for further learning. The style ' +
		'should be factual, and the tone professional yet accessible, aimed at ' +
		'semi-experienced traders. Think step by step to ensure clarity and comprehensiveness ' +
		'in capturing the essence of the conversations for learning and reference.\n\n' +
		'This structured prompt, designed with your specific requirements in mind, will ' +
		'guide the model through a detailed analysis and summarization process, ensuring ' +
		'the output is both informative and easy to navigate for your intended audience. ' +
		'The Discord conversations to be summarized are as follows:',
	atomPrompt: 'Your task is to assist in managing knowledge within my ' +
		'personal knowledge management system. I have a script that adds the ' +
		'#flashcard section at the bottom of my notes, which another process syncs ' +
		'to Anki for flashcards. Your task is to add a second section under the ' +
		'#flashcard section that has the exact same format but with the following ' +
		'differences: ' +
		'1. The tag should be #reverse-flashcard instead of #flashcard. ' +
		'2. The text between "Basic" and "Back:" should be replaced with the original ' +
		'text between "Back:" and "![image]". ' +
		'3. The text between "Back:" and "![image]" should be replaced with the original ' +
		'text between "Basic:" and "Back:". ' +
        '4. Append the new #reverse-flashcard section to the end of the note. ' +
        'IT IS VERY IMPORTANT THAT YOU RETURN THE ORIGINAL FULL NOTE with the new section appended. ' +
		'Do not copy the <!-- ID: --> tag from the original flashcard section. ' +
		'(In essence, you are to reverse the flashcard fields so I can approach them ' +
		'from the other direction.)\n\n' +
		'This structured prompt, designed with your specific requirements in mind, will ' +
		'guide the model through a detailed process to correctly create the reverse flashcard ' +
		'section, ensuring it is formatted consistently with the original flashcard section, ' +
		'making it ready for seamless integration and syncing with Anki.',
	vaultSettingsFilePath: '03 Periodic/97 Data/System/Main.md',
	vaultQuoteThresholdInDays: 14,
	awsDynamoDBQuoteTable: 'quotes',
	awsDynamoDBQuoteTableKey: 'quote_id',
	awsAccessKey: '',
	awsSecretKey: '',
	awsRegion: 'us-east-1',
	slideshowInterval: 500,
	atomPath: '/users/johnm/git-projects/personal/productivity/jcm/01 Brain/Atoms',
	testAtomPath: '/users/johnm/git-projects/personal/productivity/@obsidian/jcm-test/01 Brain/Atoms',
	maxAtomsToProcess: 20,
	protonPath: '/users/johnm/git-projects/personal/productivity/jcm/01 Brain/Protons',
	testProtonPath: '/users/johnm/git-projects/personal/productivity/@obsidian/jcm-test/01 Brain/Atoms',
}