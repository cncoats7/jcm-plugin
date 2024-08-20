import * as fs from 'fs';
//import * as yaml from 'js-yaml'
import * as myyaml from './yaml'
import { getAISummary } from '../cloud/azure';
import  { Atom } from './atom'
import { Flashcard } from './flashcard';
import test from 'node:test';


const protonPath = '/users/johnm/git-projects/personal/productivity/@obsidian/jcm-test/01 Brain/Protons'
const valuePath = '/users/johnm/git-projects/personal/productivity/@obsidian/jcm-test/02 Action/05 Values'
const testAtomPath = '/users/johnm/git-projects/personal/productivity/@obsidian/jcm-test/01 Brain/Atoms'
const singleTestAtomPath = '/users/johnm/git-projects/personal/productivity/@obsidian/jcm-test/01 Brain/Atoms/Boiling Frog Effect.md'
const maxAtomsToProcess = 20;



const addReverseFlashcardToAtom = (filePath: string) => {
    const fileName = filePath.split('/').pop() || '';
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const atom = new Atom({});
    atom.populateFromFile(fileName, fileContent);
    const reverseFlashcard = atom.generateReverseFlashcardSection();
    fs.appendFileSync(filePath, reverseFlashcard, 'utf8');
}

const testSingleAtom = (path: string) => {
    
    const fileName = path.split('/').pop() || '';
    //updateAtomFlashcard(testAtomPath);
    const atom = new Atom({});
    const fileContent = fs.readFileSync(path, 'utf8')
    atom.populateFromFile(fileName, fileContent);
    console.log(atom)
    const rawDefinition = atom.rawDefinition();
    console.log(rawDefinition);
    const reverseFlashcard = atom.generateReverseFlashcardSection();
    console.log(reverseFlashcard);
}


const writeReverseFlashcards = () => {
    let counter = 0;
    fs.readdir(testAtomPath, (err, files) => {
        if (err) {
            console.error(err);
            return;
        }
        
        files.forEach(file => {
            let atomFilePath = `${testAtomPath}/${file}`
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
                    fs.readFile(atomFilePath, 'utf8', (err, fileContent) => {
                        
                        if (err) {
                            console.error('Error reading the file:', err);
                            return;
                        }
                        const atom = new Atom({});
                        const fileName = atomFilePath.split('/').pop() || '';
                        console.log(fileName);
                        atom.populateFromFile(fileName, fileContent);
                        //console.log(atom)
                        const rawDefinition = atom.rawDefinition();
                        //console.log(rawDefinition);
                        if (atom.createReverseFlashcard && atom.reverseFlashcardInfo === '') {
                            if (counter < maxAtomsToProcess) {
                                const reverseFlashcard = atom.generateReverseFlashcardSection();
                                console.log(reverseFlashcard);
                                console.log(counter)
                                fs.appendFileSync(`${atomFilePath}`, `\n${reverseFlashcard}`, 'utf8');
                                counter += 1;
                            }
                            else {
                                console.log(`Max Atoms Processed.Skipping ${atomFilePath}`);
                            }
                        }
                        else {
                            console.log(`Skipping ${atomFilePath}`);
                        }
                    });
                }
                
            });
        }); 
        
    });
}

const updateAtoms = (atomPath: string) => {
    let counter = 0;
    fs.readdir(atomPath, (err, files) => {
        if (err) {
            console.error(err);
            return;
        }
        
        files.forEach(file => {
            let atomFilePath = `${atomPath}/${file}`
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
                    const fileContent = fs.readFileSync(atomFilePath, 'utf8');
                    
                    const atom = new Atom({});
                    const fileName = atomFilePath.split('/').pop() || '';
                    console.log('##############')
                    console.log(fileName);
                    atom.populateFromFile(fileName, fileContent);
                    atom.writeToFile(atomFilePath);
                    
                        //console.log(atom.generateAtomContent());
                }
            });
        });
    });
}

//const sectionTest = (atom: Atom) => {


//addReverseFlashcardToAtom(testAtomPath);
//testSingleAtom(singleTestAtomPath);
//writeReverseFlashcards();
updateAtoms(testAtomPath);