    export function addmesages(message){
        let messages = [  
            {'role':'system', 'content':'You are friendly chatbot.'},
            {'role':'user', 'content':'Hi, my name is Isa'},
            {'role':'assistant', 'content': "Hi Isa! It's nice to meet you. \
            Is there anything I can help you with today?"},
            {'role':'user', 'content':'Yes, you can remind me, What is my name?'}  
        ]
        messages.push({'role':'assistant', 'content':prompt})
        console.log(messages)
        return messages
    }
