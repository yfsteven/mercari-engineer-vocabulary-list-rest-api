require('dotenv').config();
const express = require('express');
const Word = require('./models/word');
const cors = require('cors');

const app = express();

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.get('/', (request, response) => {
    Word.find({}).then(words => {
        response.json(words);
    }
    ).catch(error => {
        console.error('Error fetching words:', error);
        response.status(500).json({ error: 'Internal server error' });
    });
});


app.get('/api/words', (request, response) => {
    Word.find({}).then(words => {
        response.json(words);
    }
    ).catch(error => {
        console.error('Error fetching words:', error);
        response.status(500).json({ error: 'Internal server error' });
    });
});

app.get('/api/words/:id', (request, response, next) => {
    Word.findById(request.params.id)
        .then(word => {
            if (word) {
                response.json(word);
            } else {
                response.status(404).end();
            }
        })
        .catch(error => next(error));
});

app.post('/api/words', (request, response) => {
    const body = request.body;

    if (!body.日本語 || !body.English || !body.例文 || !body.example) {
        return response.status(400).json({ error: 'missing fields' });
    }

    const word = new Word({
        日本語: body.日本語,
        English: body.English,
        例文: body.例文,
        example: body.example,
    });

    word.save()
        .then(savedWord => {
            response.json(savedWord);
        })
        .catch(error => {
            console.error('Error saving word:', error);
            response.status(500).json({ error: 'Internal server error' });
        });
});

app.put('/api/words/:id', (request, response, next) => {
    const body = request.body;

    if (!body || !body.日本語 || !body.English || !body.例文 || !body.example) {
        return response.status(400).json({ error: 'missing fields' });
    }

    Word.findByIdAndUpdate(
        request.params.id,
        {
            日本語: body.日本語,
            English: body.English,
            例文: body.例文,
            example: body.example,
        },
        { new: true }
    )
        .then(updatedWord => {
            if (updatedWord) {
                response.json(updatedWord);
            } else {
                response.status(404).end();
            }
        })
        .catch(error => next(error));
});

app.delete('/api/words/:id', (request, response, next) => {
    Word.findByIdAndDelete(request.params.id)
        .then(result => {
            if (result) {
                response.status(204).end();
            } else {
                response.status(404).end();
            }
        })
        .catch(error => next(error));
});

//Find words by Japanese word
app.get('/api/words/japanese/:nihongo', (request, response, next) => {
    const nihongo = request.params.nihongo;
    Word.find({ 日本語: nihongo })
        .then(words => {
            response.json(words);
        })
        .catch(error => next(error));
});

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
}

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});