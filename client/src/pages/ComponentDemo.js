import React from 'react'
import { Grid, Segment } from 'semantic-ui-react';
import ErrorMessage from '../components/ErrorMessage';
import FadeLoaderDemo from '../components/FadeLoaderDemo';
import PropagateLoaderDemo from '../components/PropagateLoaderDemo';
import SemanticLoader from '../components/SemanticLoader'

const ComponentDemo = () => {
    return (
        <div>
            <SemanticLoader />
            <ErrorMessage header={'This is an Error Message'} error={'some err here'} />
            <h1>Some demo spinners</h1>
            <Segment >
                <a href="https://www.davidhu.io/react-spinners/">React Spinners</a>
                <Grid>
                    <Grid.Row>
                        <PropagateLoaderDemo />
                        <FadeLoaderDemo />
                    </Grid.Row>
                </Grid>
            </Segment>
        </div>
    )
}

export default ComponentDemo;