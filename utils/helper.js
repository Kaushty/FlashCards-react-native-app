import { AsyncStorage } from 'react-native'
// Store the data in asyncStorage

export const STORAGE_KEY = 'UDACICARDS:Decks'

const startData = {
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
  }

// Define methods to access the data
export const _store_data = async () => {
    await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(startData),
    ).catch((error) => {
        console.error('Error while setting data to AsynStorage',error)
    })
}

// Method to fetch all the cards to map over
export const getDecks = async () => {
    try{
        const response = await AsyncStorage.getItem(STORAGE_KEY)        
        const data = JSON.parse(response)
        let newData = {}
        if(data === null){
            await _store_data()  
            newData = await getDecks()
            return newData
        }
        console.log(JSON.stringify(data))
        return data
    }catch(error){
        console.log('Error while fetching data from AsynStorage', error)
    }
}

// Function to clear AsyncStorage 
export const clearDecks = async () => {
    try{
        await AsyncStorage.removeItem(STORAGE_KEY)        
    }
    catch(error){
        console.log('Failed to clear AsyncStorage', error)
    }
}

// Method to return a particular deck
export const getDeck = async (deckId) => {
    try{
        const response = await AsyncStorage.getItem(STORAGE_KEY)        
        const data = JSON.parse(response)
        return data[deckId] ? data[deckId] : {}
    }catch(error){
        console.error('Error while fetching data from AsynStorage', error)
    }
}

// Method to save a deck to the collection
export const saveDeckTitle = async (deckTitle) => {
    try{
        const newDeck = {
            title: deckTitle,
            questions: []
        }
        await AsyncStorage.mergeItem(
            STORAGE_KEY,
            JSON.stringify({
                [deckTitle]: newDeck,
            })
        )
    }
    catch(error){
        console.error('Error while saving deck to AsynStorage', error)
    }
}

// Function to add a card to the deck
export const saveQuestion = async (deckId, card) => {
    try{
        await AsyncStorage.getItem(STORAGE_KEY).then((result) => {
            const data = JSON.parse(result)           
            const questions = data[deckId].questions.concat(card)
            AsyncStorage.mergeItem(STORAGE_KEY,
                JSON.stringify({
                    deckId: {
                        title: deckId,
                        questions
                    }
                }))
        })
    }
    catch(error){
        console.error('Error occured while saving question to AsyncStorage ', error)
    }
}

// Function to delete a deck