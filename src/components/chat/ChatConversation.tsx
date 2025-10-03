import React from "react";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import MessageBubble from "./bubble/MessageBubble";
import InputToolbarCustom from "./input/InputToolbarCustom";
import Composer from "./input/Composer";
import SendActions from "./input/SendActions";

export default function ChatConversation() {
    const [messages, setMessages] = React.useState<IMessage[]>([
        {
            _id: 1,
            text: "Hey! Gradient bubble wFEWJFEWJHWUIHCWIUHBCEWHBBSDBKJBSDKJBJKVSBvdsbkjvbsdbkjvbakjdbvbkj cbaskncjkaorks ✨",
            createdAt: new Date(),
            user: { _id: 1, name: "Me", avatar: require("../../assets/images/people/person2.png") },
        },
        {
            _id: 2,
            text: "Nice! Show me more 😎",
            createdAt: new Date(),
            user: { _id: 2, name: "Other", avatar: require("../../assets/images/people/person1.png") },
        },
    ]);

    const onSend = (newMessages: IMessage[] = []) => {
        setMessages((prev) => GiftedChat.append(prev, newMessages));
    };

    return (
        <GiftedChat
            messages={messages}
            user={{ _id: 1 }}
            renderBubble={(props) => <MessageBubble {...props} />}
            renderAvatar={null}
            renderInputToolbar={(props) => <InputToolbarCustom {...props} />}
            renderComposer={(props) => <Composer {...props} />}
            renderSend={(props) => <SendActions {...props} />}
            onSend={onSend}
        />
    );
}

