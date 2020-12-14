import React from 'react';
import Button from './components/Button/button'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'
import { Input } from './components/Input/input'


function App() {
    return (
        <section>
            <Button>hello</Button>
            <Button btnType='primary' size='lg'> hello </Button>
            <Button btnType='link' href='https://www.baidu.com' target="_blank">link</Button>
            <Menu mode='vertical' onSelect={(i) => alert(i) } defaultOpenSubMenus={['3']}>
                <MenuItem>0</MenuItem>
                <MenuItem>1</MenuItem>
                <MenuItem>2</MenuItem>
                <SubMenu title='dropdown'>
                    <MenuItem>xiala</MenuItem>
                    <MenuItem>xiala</MenuItem>
                    <MenuItem>xiala</MenuItem>
                </SubMenu>
            </Menu>
            <Input />
        </section>
    );
}

export default App;
