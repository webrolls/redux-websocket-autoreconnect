/* eslint-env browser */
// @flow
import { WEBSOCKET_CONNECTING, WEBSOCKET_OPEN, WEBSOCKET_CLOSED, WEBSOCKET_MESSAGE } from './index';

// These actions are more concerned with connection state
// and are trigged async by the WebSocketMiddleware

export const connecting = (event: Event, websocket: ?WebSocket): Action => ({
  type: WEBSOCKET_CONNECTING,
  payload: {
    timestamp: new Date(),
    event,
    websocket
  }
});

export const open = (event: Event): Action => ({
  type: WEBSOCKET_OPEN,
  payload: {
    timestamp: new Date(),
    event
  }
});

export const closed = (event: Event): Action => ({
  type: WEBSOCKET_CLOSED,
  payload: {
    timestamp: new Date(),
    event
  }
});

export const message = (event: MessageEvent): Action => {
  // return {
  //   type: WEBSOCKET_MESSAGE,
  //   payload: {
  //     timestamp: new Date(),
  //     data: event.data,
  //     event
  //   }
  // }
  const data = JSON.parse(event.data);
  const responseType = getResponseType(data);
  console.log('Web Socket Response Type',responseType);
  return {
    type: responseType,
    payload: {
      timestamp: new Date(),
      data: responseType === WEBSOCKET_MESSAGE ? event.data : data ,
      event
    },
  }
};


const getResponseType = (data)=>{
  let responseType = WEBSOCKET_MESSAGE;
  const {command,action} = data;
  if(command === 'qna'){
    if(action === 'fetchQAndA'){
      responseType = 'WEBSOCKET_MESSAGE_QUESTION_FETCH';
    }if(action === 'create'){
      responseType = 'WEBSOCKET_MESSAGE_QUESTION_CREATE';
    }else if (action === 'reply'){
      responseType = 'WEBSOCKET_MESSAGE_QUESTION_REPLY';
    }else if (action === 'markAsAnswered'){
      responseType = 'WEBSOCKET_MESSAGE_QUESTION_MARK_AS_ANSWERED';
    }else if (action === 'search'){
      responseType = 'WEBSOCKET_MESSAGE_QUESTION_SEARCH';
    }else if (action === 'updatePriority'){
      responseType = 'WEBSOCKET_MESSAGE_QUESTION_UPDATE_PRIORITY';
    }else if (action === 'lockUnlock'){
      responseType = 'WEBSOCKET_MESSAGE_QUESTION_LOCK_UNLOCK';
    }
  }else if (command === 'folder') {
    if(action === 'fetch'){
      responseType = 'WEBSOCKET_MESSAGE_FOLDER_FETCH';
    }else if (action === 'add'){
      responseType = 'WEBSOCKET_MESSAGE_FOLDER_ADD';
    }else if (action === 'edit'){
      responseType = 'WEBSOCKET_MESSAGE_FOLDER_EDIT';
    }else if (action === 'delete'){
      responseType = 'WEBSOCKET_MESSAGE_FOLDER_DELETE';
    }else if (action === 'assignQuestion'){
      responseType = 'WEBSOCKET_MESSAGE_FOLDER_ASSIGNQUESTION';
    }
  } 
  return responseType;
}

export default {};
