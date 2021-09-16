import React from 'react'
import ErrorMessage from '../components/ErrorMessage';
import SemanticLoader from '../components/SemanticLoader'

const ComponentDemo = () => {
    return (
        <div>
            <SemanticLoader />
            <ErrorMessage header={'This is an Error Message'} error={'some err here'} />
            <h1>Some demo spinners</h1>
            <a href="https://www.davidhu.io/react-spinners/">React Spinners</a>
        </div>
    )
}

export default ComponentDemo;