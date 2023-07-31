import getConversationById from '@/app/actions/getConversationById';
import getMessages from '@/app/actions/getMessages';
import EmptyState from '@/app/components/EmptyState';
import Header from './components/Header';
import Body from './components/Body';
import Form from './components/Form';

interface IPrams {
    conversationId: string;
}

const ConversationId = async ({ params }: { params: IPrams }) => {
    const consversation = await getConversationById(params.conversationId);
    const messages = await getMessages(params.conversationId);
    if (!consversation) {
        return (
            <div className="lg:pl-80 h-full">
                <div className="h-full flex flex-col">
                    <EmptyState />
                </div>
            </div>
        );
    }

    return (
        <div className="lg:pl-80 h-full">
            <div className="h-full flex flex-col">
                <Header conversation={consversation} />
                <Body initialMessages={messages} />
                <Form />
            </div>
        </div>
    );
};

export default ConversationId;
