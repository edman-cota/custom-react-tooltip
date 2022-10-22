import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Tooltip from './../Tooltip'

export default {
  title: 'Tooltip',
  component: Tooltip,
} as ComponentMeta<typeof Tooltip>

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Tooltip> = (args) => (
  <Tooltip {...args}>
    <button>Hover me</button>
  </Tooltip>
)

export const Hello = Template.bind({})
Hello.args = {
  label: 'Try customizing me!',
}
