

import React from 'react'
import { useChatStore } from '../store/useChatStore';
import { useEffect } from 'react';
import { MessageInput } from './MessageInput';
import  ChatHeader  from './ChatHeader';
import MessageSkeleton from './Skeleton/MessageSkeleton';
import { useAuthStore } from '../store/useAuthStore';
import { formatMessageTime } from '../lib/utils';

export const ChatContainer = () => {
  const{messages,getMessages,isMessageLoading,selectedUser,subscribeToMessage,unsubscribeFromMessage}=useChatStore();
    const {authUser} = useAuthStore();
  useEffect(()=>{
    getMessages(selectedUser._id)

    subscribeToMessage();

    return()=>unsubscribeFromMessage();
  },[selectedUser._id,getMessages,subscribeToMessage,unsubscribeFromMessage])

  if(isMessageLoading) return (
    <div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader/>
      <MessageSkeleton/>
      <MessageInput/>
    </div>
  )

  return (
    <div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader/>

    <div className='flex-1 overflow-y-auto p-4 space-y-4'>
      {messages.map((message)=>{
        return(
        <div key={message._id}
        className={`chat ${message.senderId==authUser._id ? "chat-end" : "chat-start"}`}
        > 
        <div className='chat-image avatar'>
          <div className='size-10 rounded-full border'>
            <img src={message.senderId===authUser._id ? authUser.profilePic || "/avatar.png" : selectedUser.profilePic || "/avatar.png"} alt="profile Pic" />
          </div>
        </div>
          <div className='chat-header mb-1'>
            <time className='text-x5 opacity-50 ml-1'>
              {formatMessageTime(message.createdAt)}
            </time>
          </div>
          <div className='chat-bubble flex flex-col'>
          {message.image && (
            <img src={message.image} alt="Attachment" className='sm:max-w-[200px] rounded-md mb-2' />
          )}
          {message.text && <p>{message.text}</p>} 
          </div>
        </div>
      )})}
    </div>

      <MessageInput/>
    </div>
  );
};








// import React, { useEffect } from 'react';
// import { useChatStore } from '../store/useChatStore';
// import { MessageInput } from './MessageInput';
// import ChatHeader from './ChatHeader';
// import MessageSkeleton from './Skeleton/MessageSkeleton';

// export const ChatContainer = () => {
//   const {
//     messages,
//     getMessages,
//     isMessageLoading,
//     selectedUser,
//   } = useChatStore();

//   useEffect(() => {
//     if (selectedUser?._id) {
//       getMessages(selectedUser._id);
//     }
//   }, [selectedUser, getMessages]); // ✅ use selectedUser directly

//   if (!selectedUser) {
//     return <div className="flex-1 flex items-center justify-center">No chat selected</div>;
//   }

//   if (isMessageLoading) {
//     return (
//       <div className='flex-1 flex flex-col overflow-auto'>
//         <ChatHeader />
//         <MessageSkeleton />
//         <MessageInput />
//       </div>
//     );
//   }

//   return (
//     <div className='flex-1 flex flex-col overflow-auto'>
//       <ChatHeader />

//       <div className="flex-1 overflow-y-auto p-4 space-y-3">
//         {messages.length > 0 ? (
//           messages.map((msg) => (
//             <div key={msg._id} className="bg-base-300 p-2 rounded">
//               {msg.text}
//             </div>
//           ))
//         ) : (
//           <div className="text-zinc-400 text-center">No messages yet</div>
//         )}
//       </div>

//       <MessageInput />
//     </div>
//   );
// };
