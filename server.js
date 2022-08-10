const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement, getQuotesByAuthor } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

const quotesRouter = express.Router();

app.use('/api/quotes', quotesRouter);

// get all quotes or all quotes by person

quotesRouter.get('/', (req, res, next) => {
  const person = req.query.person;
  if(person !== undefined) {
      const personQuotes = getQuotesByAuthor(quotes, person);
      res.send({
          quotes: personQuotes
      })
  } else {
      res.send({
          quotes: quotes
      })
  }
});

// get random quote

quotesRouter.get('/random', (req, res, next) => {
    const randomQuote = getRandomElement(quotes);
    res.send({
        quote: randomQuote
    })
});

// add new quote

quotesRouter.post('/', (req, res, next) => {
    const quote = req.query.quote;
    const person = req.query.person;
    const newQuote = {
        quote: quote,
        person: person
    }
    if(quote !== undefined && person !== undefined) {
        quotes.push(newQuote);
        res.status(201).send({
            quote: newQuote
        });
    } else {
        res.status(400).send('Failed to add quote');
    }
})

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});