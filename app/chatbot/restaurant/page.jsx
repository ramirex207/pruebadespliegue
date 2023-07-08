"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';

function Chat() {
    const [answerUser, setAnswerUser] = useState('');
    const [conversation, setConversation] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const storedConversation = localStorage.getItem('conversation');
        if (storedConversation) {
        setConversation(JSON.parse(storedConversation));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('conversation', JSON.stringify(conversation));
    }, [conversation]);

    async function handleOnSubmit(event) {
        event.preventDefault();
        setLoading(true);
        const res = await axios.post('/api/tutorial/chatbot', { answerUser });
        const response = res.data.result;
        const newMessage = { role: 'user', content: answerUser };
        const newResponse = { role: 'chat', content: response };
        setConversation([...conversation, newMessage, newResponse]);
        setAnswerUser('');
        setLoading(false);
    }

    function borrarConversacion() {
        localStorage.removeItem('conversation');
        setConversation([]);
    }

    return (
        <div className="max-w-md mx-auto bg-white shadow rounded-lg p-4">
        <div className="bg-teal-400 text-zinc-100 font-bold p-2 rounded-lg mb-4">
            <p className="text-lg">GPT BOT PARA RESTAURANT</p>
        </div>
        <div className="space-y-4">
            {conversation.map((message, index) => (
            <div key={index} className={message.role === 'user' ? 'text-left' : 'text-right'}>
                <p className="bg-zinc-200 px-4 py-2 rounded-lg">{message.content}</p>
            </div>
            ))}
        </div>
        <form onSubmit={handleOnSubmit} className="mt-4 flex">
            <input
            type="text"
            name="review"
            id="review"
            placeholder="Ingrese un mensaje"
            value={answerUser}
            onChange={(e) => setAnswerUser(e.target.value)}
            className="flex-grow rounded-l-lg px-4 py-2 outline-none"
            />
            <button
            type="submit"
            disabled={loading}
            className={`bg-teal-600 text-white px-4 py-2 rounded-r-lg ${
                loading ? 'cursor-not-allowed' : 'hover:bg-teal-300'
            }`}
            >
            {loading ? 'Enviando...' : 'Enviar'}
            </button>
        </form>
        <button
            onClick={borrarConversacion}
            className="mt-4 text-gray-500 hover:text-red-500"
        >
            Borrar Conversación
        </button>
        </div>
    );
}

export default Chat;
