import React from 'react'
import { Message } from 'semantic-ui-react'

const ErrorMessage = ({header, error}) => {
    return (
        <Message negative>
            <Message.Header>{header}</Message.Header>
            <code>{JSON.stringify(error)}</code>
        </Message>
    )
}

export default ErrorMessage;