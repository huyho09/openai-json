const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const axios = require('axios');

const app = express();
app.use(cors()); // Alow CORS for all resource
app.use(bodyParser.json());

const apiKey = process.env.OPENAI_API_KEY;  

let data = require('./data.json'); // read json


app.post('/chat', async (req, res) => {
    const userQuestion = req.body.question;
    
    const found = data.questions.find(q => q.question.toLowerCase() === userQuestion.toLowerCase());

    if (found) {
        res.json({ answer: found.answer });
    } else {
        // Generate answer using OpenAI
        try {
            const response = await axios.post(
                'https://api.openai.com/v1/engines/text-davinci-003/completions',
                {
                    prompt: userQuestion,
                    max_tokens: 100,
                },
                {
                    headers: {
                        'Authorization': `Bearer ${apiKey}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            res.json({ answer: response.data.choices[0].text.trim() });
        } catch (error) {
            console.error('Error generating answer:', error);
            res.status(500).json({ error: 'Error generating answer' });
        }
    }
});

app.post('/verify', (req, res) => {
    const { question, answer, correct } = req.body;

    if (!correct) {
        data.questions.push({ question, answer });
        fs.writeFileSync('./data.json', JSON.stringify(data, null, 2));
    }

    res.sendStatus(200);
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
