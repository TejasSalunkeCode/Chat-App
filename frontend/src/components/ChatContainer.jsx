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


import React from 'react'
import { useChatStore } from '../store/useChatStore';
import { useEffect } from 'react';
import { MessageInput } from './MessageInput';
import  ChatHeader  from './ChatHeader';
import MessageSkeleton from './Skeleton/MessageSkeleton';

export const ChatContainer = () => {
  const{messages,getMessages,isMessageLoading,selectedUser}=useChatStore();

  useEffect(()=>{
    getMessages(selectedUser._id)
  },[selectedUser._id,getMessages])

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
      <p>messages...</p>
      <MessageInput/>
    </div>
  );
};
