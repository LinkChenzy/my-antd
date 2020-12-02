import React from 'react'
import Button,{ ButtonProps } from './button'
import { render,fireEvent } from '@testing-library/react'

const defaultProps = {
    onClick: jest.fn()
  }
  
  const testProps: ButtonProps = {
    btnType: 'primary',
    size: 'lg',
    className: 'klass'
  }
  
  const disabledProps: ButtonProps = {
    disabled: true,
    onClick: jest.fn(),
  }

describe('test button component', () => {
    // 默认的button测试用例
    it('default button', () => {
        const wrapper = render(<Button> Test </Button>)
        const element = wrapper.getByText('Test') as HTMLButtonElement
        expect(element).toBeInTheDocument()
        expect(element.tagName).toEqual('BUTTON')
        expect(element).toHaveClass('btn btn-default')
        expect(element.disabled).toBeFalsy()
        fireEvent.click(element)
        // expect(defaultProps.onClick).toHaveBeenCalled()
    })
    // 拥有不同属性的button size or btnType
    it('should render the correct component based on different props', () => {
        const wrapper = render(<Button {...testProps}>Nice</Button>)
        const element = wrapper.getByText('Nice')
        expect(element).toBeInTheDocument()
        expect(element).toHaveClass('btn-primary btn-lg klass')
    })
    // link的button测试用例
    it('should render a link when btnType equals link and href is provided', () => {
        const wrapper = render(<Button btnType='link' href="http://dummyurl">Link</Button>)
        const element = wrapper.getByText('Link')
        expect(element).toBeInTheDocument()
        expect(element.tagName).toEqual('A')
        expect(element).toHaveClass('btn btn-link')
    })
    // disabled button 测试用例
    it('should render disabled button when disabled set to true', () => {
        const wrapper = render(<Button {...disabledProps}>Nice</Button>)
        const element = wrapper.getByText('Nice') as HTMLButtonElement
        expect(element).toBeInTheDocument()
        expect(element.disabled).toBeTruthy()
        fireEvent.click(element)
        // expect(disabledProps.onClick).not.toHaveBeenCalled()
    })
})