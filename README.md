
# openai-json

This is a project to test OpenAI API and NodeJS openAI framework

### How to run this

1. Open the project folder in VSC
2. Use cli: **cd back-end**
3. Use cli: **npm i**
4. Use cli: **node server.js**
5. Start Live Server using **index.html** in front-end folder

### Idea

The concept of this project is to build a dynamic chatbot using the OpenAI API. The user will input a question, and the chatbot will generate and respond with an answer based on pre-existing data stored in a `data.json` file. If the chatbot provides the correct answer (i.e., an answer found in the `data.json` file), the user can simply submit the response. However, if the chatbot’s response is incorrect or insufficient, the user has the ability to modify the answer in a provided text area.

In cases where the chatbot cannot find a suitable answer (i.e., the question is not present in the `data.json` file), it will return a generic response from OpenAI, indicating that the question is new. The user can then input their own answer, which will be appended to the `data.json` file, updating the dataset with new question-answer pairs for future reference. This ensures continuous learning and improvement of the chatbot over time.

The process flow involves the following steps:

1.  **User Inputs Question**: The user asks a question through the interface.
2.  **Chatbot Provides Answer**: The chatbot attempts to provide an answer based on the existing `data.json` file.
3.  **User Verifies or Edits Answer**: If the answer is correct, the user submits it as-is. If not, the user can modify the answer.
4.  **New Question Handling**: If the question is new (i.e., not in the existing dataset), the chatbot will respond with a general prompt from OpenAI. The user can then provide their own answer.
5.  **Data Update**: Any new answers, whether modified or provided by the user for a new question, will be appended to the `data.json` file.

This approach allows the chatbot to grow and adapt based on user input, enriching the dataset and improving the chatbot’s responses over time. The backend system will ensure that all updates to the `data.json` file are properly stored and can be referenced in future interactions, creating a personalized and continuously improving chatbot experience.

### To Do
- Restructure **json.data** to get the lastest update or random select the answer for one question.
- Implement Edit button to edit the response instead of using the popup.
- Implement [t5-base-e2e-qg](https://huggingface.co/valhalla/t5-base-e2e-qg).
- Rework back-end using Python openAI framework 
