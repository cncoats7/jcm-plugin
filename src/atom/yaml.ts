
import * as yaml from 'js-yaml'

export interface AtomYaml {
    type: string;
    topics: string[];
    references: string[];
    createFlashcard: boolean;
    createReverseFlashcard: boolean;
}

export interface ProtonYaml {
    type: string;
    createFlashcard: boolean;
    createReverseFlashcard: boolean;
}

export function getAtomYaml(fileContent: string): AtomYaml | null {
    const yamlData = getFileProperties(fileContent);
    if (yamlData) {
        return yamlData as AtomYaml;
    }
    else {
        return null;
    }
}

export function getProtonYaml(fileContent: string): ProtonYaml | null{
    const yamlData = getFileProperties(fileContent);
    if (yamlData) {
        return yamlData as AtomYaml;
    }
    else {
        return null;
    }
}

function getFileProperties(fileContent: string) {
    const yamlMatch = fileContent.match(/---\n([\s\S]*?)\n---/);

    const yamlContent = yamlMatch?.[1] ?? '';
    if (yamlContent === '') {
        throw new Error("YAML content not found in the provided file content.");
    }

    const yamlData = yaml.load(yamlContent);
    return yamlData;
}