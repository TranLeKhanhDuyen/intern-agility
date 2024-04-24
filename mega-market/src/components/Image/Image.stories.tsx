import type { Meta, StoryObj } from '@storybook/react'
import { Image } from '@components'
import groceries from '@assets/images/products/groceries.svg'
import phone from '@assets/images/products/image-5.svg'
export default {
  title: 'Components/Image',
  component: Image,
  tags: ['autodocs'],
  argTypes: {
    additionalClass: { description: 'Add class to the image' },
    alt: { description: 'Add alt to the image' }
  }
} as Meta

type Story = StoryObj<typeof Image>

export const Square: Story = {
  args: {
    imageUrl: groceries,
    alt: 'Groceries',
    variant: 'square'
  }
}

export const Circle: Story = {
  args: {
    imageUrl: phone,
    variant: 'circle',
    alt: 'Phone'
  }
}