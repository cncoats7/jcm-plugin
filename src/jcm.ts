import OpenAIApi from "openai";
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { ExecuteStatementCommand, ScanCommand, UpdateCommand, DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from 'uuid';
import { JCM_DEFAULT_SETTINGS } from './settings';
import { Atom } from './atom/atom';
import { Flashcard } from './atom/flashcard';
import { Proton } from './atom/proton';
import * as fs from 'fs';

const getDynamoDBClient = async() => {
    const client = new DynamoDBClient({
        region: JCM_DEFAULT_SETTINGS.awsRegion,
        credentials: {
            accessKeyId: JCM_DEFAULT_SETTINGS.awsAccessKey,
            secretAccessKey: JCM_DEFAULT_SETTINGS.awsSecretKey
        }
    });
    return client;
}

const getDynamoDBDocumentClient = async() => {
    const client = await getDynamoDBClient()
    const docClient = DynamoDBDocumentClient.from(client);
    
    return docClient;
}

const updateLastUsedDateForQuote = async (docClient: DynamoDBDocumentClient,quote_id: string, author: string, new_last_used_date: string) => {
    const updateCommand = new UpdateCommand({
        TableName: JCM_DEFAULT_SETTINGS.awsDynamoDBQuoteTable,
        Key: {
            quote_id: quote_id,
            author: author
        },
        UpdateExpression: 'SET #last_used_date = :currentDate',
        ExpressionAttributeNames: {
            '#last_used_date': 'last_used_date'
        },
        ExpressionAttributeValues: {
            ':currentDate': new_last_used_date,
        },
        ReturnValues: 'ALL_NEW'
    });

    const executeUpdateCommand = new ExecuteStatementCommand({
        Statement: 'UPDATE ' + JCM_DEFAULT_SETTINGS.awsDynamoDBQuoteTable + ' SET last_used_date=? WHERE quote_id=? AND author=?',
        Parameters: [new_last_used_date, quote_id, author],
    });

    const updateResult = await docClient.send(updateCommand);
	console.log("DynamoDBDocClient.send(UpdateCommand) Result:", updateResult);					
}

export const addQuote = async(quote: string, author: string) => {
    const client = await getDynamoDBDocumentClient();
    const created_at = Math.round(Date.now() / 1000);
		const tableName = 'quotes';
		const params = {
			TableName: tableName,
			Item: {
				quote_id: uuidv4(),
				created_at: created_at,
				quote: quote,
				author: author
			}
		};
		client.send(new PutCommand(params));
}
export const getRandomQuote = async () => {
    const tableName = JCM_DEFAULT_SETTINGS.awsDynamoDBQuoteTable
    const thresholdDate = new Date();
    thresholdDate.setDate(thresholdDate.getDate() - JCM_DEFAULT_SETTINGS.vaultQuoteThresholdInDays)
    const command = new ScanCommand({
        TableName: tableName,
    });
    try {
        const docClient = await getDynamoDBDocumentClient();
        const data = await docClient.send(command);
        console.log("Scan Result:", data);
        if (data.Items && data.Items.length > 0) {
            const quotes = data.Items.filter(
                quote => quote.last_used_date === undefined || new Date(quote.last_used_date) < thresholdDate
            );
            console.log("Filtered Quotes:", quotes);
            const randomIndex = Math.floor(Math.random() * quotes.length);
            const randomQuote = quotes[randomIndex];
            const new_last_used_date = new Date().toISOString();
            console.log('Updating quote_id: ' + randomQuote.quote_id + 'author: ' + randomQuote.author + ' with last_used_date: ' + new_last_used_date);
        }
    } 
    catch (err) {
        console.log("Error", err);
    }
}


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

export const addReverseFlashcards = async (environment: string) => {
    const filePath = (environment === 'test') ? JCM_DEFAULT_SETTINGS.testAtomPath : JCM_DEFAULT_SETTINGS.atomPath;    
    const fileName = filePath.split('/').pop() || '';
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const atom = new Atom({});
    atom.populateFromFile(fileName, fileContent);
    const reverseFlashcard = atom.generateReverseFlashcardSection();
    fs.appendFileSync(filePath, reverseFlashcard, 'utf8');
}

export const updateAtom = async (atomFilePath: string) => {
    const fileContent = fs.readFileSync(atomFilePath, 'utf8');    
    const atom = new Atom({});
    const fileName = atomFilePath.split('/').pop() || '';
    console.log('##############')
    console.log(fileName);
    atom.populateFromFile(fileName, fileContent);
    atom.writeToFile(atomFilePath);
}

export const updateAllAtoms = async (environment: string) => {
    const filePath = (environment === 'test') ? JCM_DEFAULT_SETTINGS.testAtomPath : JCM_DEFAULT_SETTINGS.atomPath;
    let counter = 0;
    fs.readdir(filePath, (err, files) => {
        if (err) {
            console.error(err);
            return;
        }
        
        files.forEach(file => {
            let atomFilePath = `${filePath}/${file}`
            //console.log(atomFilePath);
            fs.stat(atomFilePath, (err, stats) => {
                if (err) {
                    console.error('Error getting stats:', err);
                    return;
                }
                if (!stats.isFile()) {
                    return;
                }
                else {
                    updateAtom(atomFilePath);
                }
            });
        });
    });
}

export const updateProton = async (protonFilePath: string) => {
    const fileContent = fs.readFileSync(protonFilePath, 'utf8');    
    const proton = new Proton({});
    const fileName = protonFilePath.split('/').pop() || '';
    console.log('##############')
    console.log(fileName);
    proton.populateFromFile(fileName, fileContent);
    proton.writeToFile(protonFilePath);
}

export const updateAllProtons = async (environment: string) => {
    const filePath = (environment === 'test') ? JCM_DEFAULT_SETTINGS.testProtonPath : JCM_DEFAULT_SETTINGS.protonPath;
    let counter = 0;
    fs.readdir(filePath, (err, files) => {
        if (err) {
            console.error(err);
            return;
        }
        
        files.forEach(file => {
            let protonFilePath = `${filePath}/${file}`
            //console.log(atomFilePath);
            fs.stat(protonFilePath, (err, stats) => {
                if (err) {
                    console.error('Error getting stats:', err);
                    return;
                }
                if (!stats.isFile()) {
                    return;
                }
                else {
                    updateProton(protonFilePath);
                }
            });
        });
    });
}