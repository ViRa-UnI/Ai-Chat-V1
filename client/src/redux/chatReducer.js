// client/src/redux/chatReducer.js

const initialState = {
  messages: [],
  isFetching: false,
  error: null
};

const CHAT_MESSAGE_RECEIVED = 'CHAT_MESSAGE_RECEIVED';
const CHAT_MESSAGE_SENDING = 'CHAT_MESSAGE_SENDING';
const CHAT_MESSAGE_ERROR = 'CHAT_MESSAGE_ERROR';

export const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHAT_MESSAGE_SENDING:
      return {
        ...state,
        isFetching: true
      };
    case CHAT_MESSAGE_RECEIVED:
      return {
        ...state,
        isFetching: false,
        messages: [...state.messages, action.payload]
      };
    case CHAT_MESSAGE_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    default:
      return state;
  }
};

// Action Creators
export const sendMessage = (message) => {
  return async (dispatch) => {
    dispatch({ type: CHAT_MESSAGE_SENDING });
    try {
      // Here you would typically make an API call to the backend to send the message
      // For example, using the api utility:
      // const response = await api.sendChatMessage(message);
      // dispatch({ type: CHAT_MESSAGE_RECEIVED, payload: response.data });

      // Since we're not actually integrating the API here, we'll simulate a response
      setTimeout(() => {
        dispatch({ type: CHAT_MESSAGE_RECEIVED, payload: { message, from: 'user' } });
      }, 500);
    } catch (error) {
      dispatch({ type: CHAT_MESSAGE_ERROR, payload: error.message });
    }
  };
};

// Selectors
export const selectChatMessages = (state) => state.chat.messages;
export const selectIsFetching = (state) => state.chat.isFetching;
export const selectChatError = (state) => state.chat.error;