import React, { FC, CSSProperties, useState, createContext } from 'react'
import cs from 'classnames'
import { MenuItemProps } from './menuItem'

type MenuMode = 'horizontal' | 'vertical'

export interface MenuProps {
    // 默认 active 的菜单项的索引值
    defaultIndex?: string;
    className?: string;
    // 菜单的类型
    mode?: MenuMode;
    style?: CSSProperties;
    // 点击菜单项 触发的回调函数
    onSelect?: (selectedIndex: string) => void;
    // 设置子菜单的默认打开方式，只有在纵向模式下生效
    defaultOpenSubMenus?: string[];
}

interface IMenuContext {
    index?: string;
    onSelect?: (selectedIndex: string) => void;
    mode?: MenuMode;
    defaultOpenSubMenus?: string[];
}

export const MenuContext = createContext<IMenuContext>({index: '0'})


export const Menu: FC<MenuProps> = (props) => {
    const { className, mode, style,children, defaultIndex, onSelect, defaultOpenSubMenus } = props
    // 设置 current active
    const [ currentActive, setActive ] = useState(defaultIndex)
    // class 值
    const classes = cs('linkin-menu', className, {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode === 'horizontal'
    })
    const handleClick = (index: string) => {
        setActive(index)
        if(onSelect){
            onSelect(index)
        }
    }
    // 向下传的 context
    const passedContext: IMenuContext = {
        index: currentActive ? currentActive : '0',
        onSelect: handleClick,
        mode,
        defaultOpenSubMenus,
    }
    // 判断child的节点的类型 不是MenuItem的报错
    const renderChildren = () => {
        return React.Children.map(children, (child, index) => {
            // 断言 as
            const childElement = child as React.FunctionComponentElement<MenuItemProps>
            const { displayName } = childElement.type
            if(displayName === 'MenuItem' || displayName === 'SubMenu'){
                return React.cloneElement(childElement, {
                    index: index.toString()
                })
            } else {
                console.error('Waring: Menu has a child which is not a MenuItem component')
            }
        })
    }
    return <ul className={classes} style={style} data-testid='test-menu'>
        <MenuContext.Provider value={passedContext}>
            {renderChildren()}
        </MenuContext.Provider>
    </ul>
}

// 菜单默认的属性
Menu.defaultProps = {
    defaultIndex: '0',
    mode: 'horizontal',
    defaultOpenSubMenus: []
}

export default Menu