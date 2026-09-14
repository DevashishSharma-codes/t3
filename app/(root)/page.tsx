import React from 'react';
import { currentUser } from '../modules/authentication/actions';
import ChatMsgView from '../modules/chat/components/chat-view/ChatMsgView';

const Page = async () => {
  // Fetch the authenticated user on the server
  const user = await currentUser();

  // Render the interactive client ChatMsgView with AI Model Selector
  return <ChatMsgView initialUser={user} />;
};

export default Page;