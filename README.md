
# openai-json

This is a project to test OpenAI API and NodeJS openAI framework

### How to run this
1. Open the project folder in VSC
2. Use cli: **cd back-end**
3. Use cli: **npm i**
4. Use cli: **node server.js**
5. Start Live Server using **index.html** in front-end folder


### Idea
The concept of this project is to use the OpenAI API to create a chatbot. User will input question, chatbot will response the answer. If the answer is correct, just submit the answer. Otherwise user can modify the answer and then submit. The undefined responses mean those questions are new and user could input their own answer to provide more data. The new update will be append to the question list in **data.json**

### To Do
- Restructure **json.data** to get the lastest update or random select the answer for one question.
- Implement Edit button to edit the response instead of using the popup.
- Implement [t5-base-e2e-qg](https://huggingface.co/valhalla/t5-base-e2e-qg).
- Rework back-end using Python openAI framework 