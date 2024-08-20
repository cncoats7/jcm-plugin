export const JCM_DEFAULT_SETTINGS = {
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
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvc2V0dGluZ3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBNEJBLE1BQU0sQ0FBQyxNQUFNLG9CQUFvQixHQUFnQjtJQUNoRCxTQUFTLEVBQUUsU0FBUztJQUNwQixjQUFjLEVBQUUsRUFBRTtJQUNsQixxQkFBcUIsRUFBRSxPQUFPO0lBQzlCLG1CQUFtQixFQUFFLE9BQU87SUFDNUIsaUJBQWlCLEVBQUUsU0FBUztJQUM1QixrQkFBa0IsRUFBRSxvQkFBb0I7SUFDeEMsbUJBQW1CLEVBQUUsaUNBQWlDO0lBQ3RELHNCQUFzQixFQUFFLEdBQUc7SUFDeEIsYUFBYSxFQUFFLDBEQUEwRDtRQUMzRSx1RUFBdUU7UUFDdkUsdUVBQXVFO1FBQ3ZFLHlFQUF5RTtRQUN6RSwwRUFBMEU7UUFDMUUsNEVBQTRFO1FBQzVFLDBFQUEwRTtRQUMxRSx3RUFBd0U7UUFDeEUsdUZBQXVGO1FBQ3ZGLCtFQUErRTtRQUMvRSxpRkFBaUY7UUFDakYsa0ZBQWtGO1FBQ2xGLGtGQUFrRjtRQUNsRiw0REFBNEQ7SUFDN0QsVUFBVSxFQUFFLHlEQUF5RDtRQUNwRSxzRUFBc0U7UUFDdEUsNEVBQTRFO1FBQzVFLHlFQUF5RTtRQUN6RSwyRUFBMkU7UUFDM0UsZUFBZTtRQUNmLGlFQUFpRTtRQUNqRSwrRUFBK0U7UUFDL0UsdUNBQXVDO1FBQ3ZDLGtGQUFrRjtRQUNsRixxQ0FBcUM7UUFDL0IsdUVBQXVFO1FBQ3ZFLDZGQUE2RjtRQUNuRyx3RUFBd0U7UUFDeEUsOEVBQThFO1FBQzlFLGdDQUFnQztRQUNoQyxpRkFBaUY7UUFDakYsdUZBQXVGO1FBQ3ZGLHNGQUFzRjtRQUN0RixpRUFBaUU7SUFDbEUscUJBQXFCLEVBQUUsb0NBQW9DO0lBQzNELHlCQUF5QixFQUFFLEVBQUU7SUFDN0IscUJBQXFCLEVBQUUsUUFBUTtJQUMvQix3QkFBd0IsRUFBRSxVQUFVO0lBQ3BDLFlBQVksRUFBRSxFQUFFO0lBQ2hCLFlBQVksRUFBRSxFQUFFO0lBQ2hCLFNBQVMsRUFBRSxXQUFXO0lBQ3RCLGlCQUFpQixFQUFFLEdBQUc7SUFDdEIsUUFBUSxFQUFFLG9FQUFvRTtJQUM5RSxZQUFZLEVBQUUsbUZBQW1GO0lBQ2pHLGlCQUFpQixFQUFFLEVBQUU7SUFDckIsVUFBVSxFQUFFLHNFQUFzRTtJQUNsRixjQUFjLEVBQUUsbUZBQW1GO0NBQ25HLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbnRlcmZhY2UgSmNtU2V0dGluZ3Mge1xuXHRteVNldHRpbmc6IHN0cmluZztcblx0YXp1cmVPcGVuQUlLZXk6IHN0cmluZztcblx0YXp1cmVPcGVuQUlEZXBsb3ltZW50OiBzdHJpbmc7XG5cdGF6dXJlT3BlbkFJSW5zdGFuY2U6IHN0cmluZztcblx0YXp1cmVPcGVuQUlSZWdpb246IHN0cmluZztcblx0YXp1cmVPcGVuQUlFbmRwb2ludDogc3RyaW5nO1xuXHRhenVyZU9wZW5BSVZlcnNpb246IHN0cmluZztcbiAgICBhenVyZU9wZW5BSVRlbXBlcmF0dXJlOiBudW1iZXI7XG5cdGRlZmF1bHRQcm9tcHQ6IHN0cmluZztcblx0XG5cdHZhdWx0U2V0dGluZ3NGaWxlUGF0aDogc3RyaW5nO1xuXHR2YXVsdFF1b3RlVGhyZXNob2xkSW5EYXlzOiBudW1iZXI7XG5cdGF3c0R5bmFtb0RCUXVvdGVUYWJsZTogc3RyaW5nO1xuXHRhd3NEeW5hbW9EQlF1b3RlVGFibGVLZXk6IHN0cmluZztcblx0YXdzQWNjZXNzS2V5OiBzdHJpbmc7XG5cdGF3c1NlY3JldEtleTogc3RyaW5nO1xuXHRhd3NSZWdpb246IHN0cmluZztcblx0c2xpZGVzaG93SW50ZXJ2YWw6IG51bWJlcjtcblxuXHRhdG9tUHJvbXB0OiBzdHJpbmc7XG5cdGF0b21QYXRoOiBzdHJpbmc7XG5cdHRlc3RBdG9tUGF0aDogc3RyaW5nO1xuXHRtYXhBdG9tc1RvUHJvY2VzczogbnVtYmVyO1xuXHRwcm90b25QYXRoOiBzdHJpbmc7XG5cdHRlc3RQcm90b25QYXRoOiBzdHJpbmdcbn1cblxuZXhwb3J0IGNvbnN0IEpDTV9ERUZBVUxUX1NFVFRJTkdTOiBKY21TZXR0aW5ncyA9IHtcblx0bXlTZXR0aW5nOiAnZGVmYXVsdCcsXG5cdGF6dXJlT3BlbkFJS2V5OiAnJyxcblx0YXp1cmVPcGVuQUlEZXBsb3ltZW50OiAnZ3B0LTQnLFxuXHRhenVyZU9wZW5BSUluc3RhbmNlOiAnamNtLTQnLFxuXHRhenVyZU9wZW5BSVJlZ2lvbjogJ2Vhc3R1czEnLFxuXHRhenVyZU9wZW5BSVZlcnNpb246ICcyMDIzLTAzLTE1LXByZXZpZXcnLFxuXHRhenVyZU9wZW5BSUVuZHBvaW50OiAnaHR0cHM6Ly9qY20tNC5vcGVuYWkuYXp1cmUuY29tLycsXG5cdGF6dXJlT3BlbkFJVGVtcGVyYXR1cmU6IDAuOSxcbiAgICBkZWZhdWx0UHJvbXB0OiAnWW91ciB0YXNrIGlzIHRvIGFzc2lzdCBpbiBtYW5hZ2luZyBrbm93bGVkZ2Ugd2l0aGluIHRoZSAnICtcblx0XHQnXCJPYnNpZGlhblwiIHN5c3RlbSBieSBzdW1tYXJpemluZyBEaXNjb3JkIGNvbnZlcnNhdGlvbnMgb24gaW52ZXN0aW5nLiAnICtcblx0XHQnRm9jdXNpbmcgb24gbWFya2V0IHRyZW5kcywgdGVjaG5pY2FsIGFuYWx5c2lzLCBhbmQgaW5zaWdodHMsIHlvdSBhcmUgJyArIFxuXHRcdCd0byBjcmVhdGUgYSBzdHJ1Y3R1cmVkIHN1bW1hcnkuIFRoaXMgc3VtbWFyeSBtdXN0IGluY2x1ZGUgYSB0aXRsZSB0aGF0ICcgK1xuXHRcdCdjYXB0dXJlcyB0aGUgbWFpbiBpbnNpZ2h0IG9mIHRoZSBkaXNjdXNzaW9uLCBhIGNvbmNpc2Ugb3ZlcnZpZXcsIGJ1bGxldCAnICtcblx0XHQncG9pbnRzIG9mIGtleSBpbnNpZ2h0cyB3aXRoIG5vdGVzIG9yIGRlZmluaXRpb25zLCBuYW1lcyBhbmQgY29udHJpYnV0aW9ucyAnICtcblx0XHQnb2YgcGFydGljaXBhbnRzLCBhbmQgYSBsaXN0IG9mIGNvbmNlcHRzIGZvciBmdXJ0aGVyIGxlYXJuaW5nLiBUaGUgc3R5bGUgJyArXG5cdFx0J3Nob3VsZCBiZSBmYWN0dWFsLCBhbmQgdGhlIHRvbmUgcHJvZmVzc2lvbmFsIHlldCBhY2Nlc3NpYmxlLCBhaW1lZCBhdCAnICtcblx0XHQnc2VtaS1leHBlcmllbmNlZCB0cmFkZXJzLiBUaGluayBzdGVwIGJ5IHN0ZXAgdG8gZW5zdXJlIGNsYXJpdHkgYW5kIGNvbXByZWhlbnNpdmVuZXNzICcgK1xuXHRcdCdpbiBjYXB0dXJpbmcgdGhlIGVzc2VuY2Ugb2YgdGhlIGNvbnZlcnNhdGlvbnMgZm9yIGxlYXJuaW5nIGFuZCByZWZlcmVuY2UuXFxuXFxuJyArXG5cdFx0J1RoaXMgc3RydWN0dXJlZCBwcm9tcHQsIGRlc2lnbmVkIHdpdGggeW91ciBzcGVjaWZpYyByZXF1aXJlbWVudHMgaW4gbWluZCwgd2lsbCAnICtcblx0XHQnZ3VpZGUgdGhlIG1vZGVsIHRocm91Z2ggYSBkZXRhaWxlZCBhbmFseXNpcyBhbmQgc3VtbWFyaXphdGlvbiBwcm9jZXNzLCBlbnN1cmluZyAnICtcblx0XHQndGhlIG91dHB1dCBpcyBib3RoIGluZm9ybWF0aXZlIGFuZCBlYXN5IHRvIG5hdmlnYXRlIGZvciB5b3VyIGludGVuZGVkIGF1ZGllbmNlLiAnICtcblx0XHQnVGhlIERpc2NvcmQgY29udmVyc2F0aW9ucyB0byBiZSBzdW1tYXJpemVkIGFyZSBhcyBmb2xsb3dzOicsXG5cdGF0b21Qcm9tcHQ6ICdZb3VyIHRhc2sgaXMgdG8gYXNzaXN0IGluIG1hbmFnaW5nIGtub3dsZWRnZSB3aXRoaW4gbXkgJyArXG5cdFx0J3BlcnNvbmFsIGtub3dsZWRnZSBtYW5hZ2VtZW50IHN5c3RlbS4gSSBoYXZlIGEgc2NyaXB0IHRoYXQgYWRkcyB0aGUgJyArXG5cdFx0JyNmbGFzaGNhcmQgc2VjdGlvbiBhdCB0aGUgYm90dG9tIG9mIG15IG5vdGVzLCB3aGljaCBhbm90aGVyIHByb2Nlc3Mgc3luY3MgJyArXG5cdFx0J3RvIEFua2kgZm9yIGZsYXNoY2FyZHMuIFlvdXIgdGFzayBpcyB0byBhZGQgYSBzZWNvbmQgc2VjdGlvbiB1bmRlciB0aGUgJyArXG5cdFx0JyNmbGFzaGNhcmQgc2VjdGlvbiB0aGF0IGhhcyB0aGUgZXhhY3Qgc2FtZSBmb3JtYXQgYnV0IHdpdGggdGhlIGZvbGxvd2luZyAnICtcblx0XHQnZGlmZmVyZW5jZXM6ICcgK1xuXHRcdCcxLiBUaGUgdGFnIHNob3VsZCBiZSAjcmV2ZXJzZS1mbGFzaGNhcmQgaW5zdGVhZCBvZiAjZmxhc2hjYXJkLiAnICtcblx0XHQnMi4gVGhlIHRleHQgYmV0d2VlbiBcIkJhc2ljXCIgYW5kIFwiQmFjazpcIiBzaG91bGQgYmUgcmVwbGFjZWQgd2l0aCB0aGUgb3JpZ2luYWwgJyArXG5cdFx0J3RleHQgYmV0d2VlbiBcIkJhY2s6XCIgYW5kIFwiIVtpbWFnZV1cIi4gJyArXG5cdFx0JzMuIFRoZSB0ZXh0IGJldHdlZW4gXCJCYWNrOlwiIGFuZCBcIiFbaW1hZ2VdXCIgc2hvdWxkIGJlIHJlcGxhY2VkIHdpdGggdGhlIG9yaWdpbmFsICcgK1xuXHRcdCd0ZXh0IGJldHdlZW4gXCJCYXNpYzpcIiBhbmQgXCJCYWNrOlwiLiAnICtcbiAgICAgICAgJzQuIEFwcGVuZCB0aGUgbmV3ICNyZXZlcnNlLWZsYXNoY2FyZCBzZWN0aW9uIHRvIHRoZSBlbmQgb2YgdGhlIG5vdGUuICcgK1xuICAgICAgICAnSVQgSVMgVkVSWSBJTVBPUlRBTlQgVEhBVCBZT1UgUkVUVVJOIFRIRSBPUklHSU5BTCBGVUxMIE5PVEUgd2l0aCB0aGUgbmV3IHNlY3Rpb24gYXBwZW5kZWQuICcgK1xuXHRcdCdEbyBub3QgY29weSB0aGUgPCEtLSBJRDogLS0+IHRhZyBmcm9tIHRoZSBvcmlnaW5hbCBmbGFzaGNhcmQgc2VjdGlvbi4gJyArXG5cdFx0JyhJbiBlc3NlbmNlLCB5b3UgYXJlIHRvIHJldmVyc2UgdGhlIGZsYXNoY2FyZCBmaWVsZHMgc28gSSBjYW4gYXBwcm9hY2ggdGhlbSAnICtcblx0XHQnZnJvbSB0aGUgb3RoZXIgZGlyZWN0aW9uLilcXG5cXG4nICtcblx0XHQnVGhpcyBzdHJ1Y3R1cmVkIHByb21wdCwgZGVzaWduZWQgd2l0aCB5b3VyIHNwZWNpZmljIHJlcXVpcmVtZW50cyBpbiBtaW5kLCB3aWxsICcgK1xuXHRcdCdndWlkZSB0aGUgbW9kZWwgdGhyb3VnaCBhIGRldGFpbGVkIHByb2Nlc3MgdG8gY29ycmVjdGx5IGNyZWF0ZSB0aGUgcmV2ZXJzZSBmbGFzaGNhcmQgJyArXG5cdFx0J3NlY3Rpb24sIGVuc3VyaW5nIGl0IGlzIGZvcm1hdHRlZCBjb25zaXN0ZW50bHkgd2l0aCB0aGUgb3JpZ2luYWwgZmxhc2hjYXJkIHNlY3Rpb24sICcgK1xuXHRcdCdtYWtpbmcgaXQgcmVhZHkgZm9yIHNlYW1sZXNzIGludGVncmF0aW9uIGFuZCBzeW5jaW5nIHdpdGggQW5raS4nLFxuXHR2YXVsdFNldHRpbmdzRmlsZVBhdGg6ICcwMyBQZXJpb2RpYy85NyBEYXRhL1N5c3RlbS9NYWluLm1kJyxcblx0dmF1bHRRdW90ZVRocmVzaG9sZEluRGF5czogMTQsXG5cdGF3c0R5bmFtb0RCUXVvdGVUYWJsZTogJ3F1b3RlcycsXG5cdGF3c0R5bmFtb0RCUXVvdGVUYWJsZUtleTogJ3F1b3RlX2lkJyxcblx0YXdzQWNjZXNzS2V5OiAnJyxcblx0YXdzU2VjcmV0S2V5OiAnJyxcblx0YXdzUmVnaW9uOiAndXMtZWFzdC0xJyxcblx0c2xpZGVzaG93SW50ZXJ2YWw6IDUwMCxcblx0YXRvbVBhdGg6ICcvdXNlcnMvam9obm0vZ2l0LXByb2plY3RzL3BlcnNvbmFsL3Byb2R1Y3Rpdml0eS9qY20vMDEgQnJhaW4vQXRvbXMnLFxuXHR0ZXN0QXRvbVBhdGg6ICcvdXNlcnMvam9obm0vZ2l0LXByb2plY3RzL3BlcnNvbmFsL3Byb2R1Y3Rpdml0eS9Ab2JzaWRpYW4vamNtLXRlc3QvMDEgQnJhaW4vQXRvbXMnLFxuXHRtYXhBdG9tc1RvUHJvY2VzczogMjAsXG5cdHByb3RvblBhdGg6ICcvdXNlcnMvam9obm0vZ2l0LXByb2plY3RzL3BlcnNvbmFsL3Byb2R1Y3Rpdml0eS9qY20vMDEgQnJhaW4vUHJvdG9ucycsXG5cdHRlc3RQcm90b25QYXRoOiAnL3VzZXJzL2pvaG5tL2dpdC1wcm9qZWN0cy9wZXJzb25hbC9wcm9kdWN0aXZpdHkvQG9ic2lkaWFuL2pjbS10ZXN0LzAxIEJyYWluL0F0b21zJyxcbn0iXX0=