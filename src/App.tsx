import React from 'react';
import Button from './components/Button/button'

function App() {
    return (
        <section>
            <Button>hello</Button>
            <Button btnType='primary' size='lg' autoFocus> hello </Button>
            <Button btnType='link' href='https://www.baidu.com' target="_blank">link</Button>
        </section>
    );
}

export default App;
