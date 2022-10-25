import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Tooltip from './../Tooltip'

export default {
  title: 'Serity UI/Tooltip',
  component: Tooltip,
  argTypes: {
    bg: { control: 'color' },
  },
} as ComponentMeta<typeof Tooltip>

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Tooltip> = (args) => (
  <Tooltip {...args}>
    <button style={{ background: '#007BFF', color: 'white', borderRadius: '10px', border: 'none', padding: '10px' }}>
      Hover me
    </button>
  </Tooltip>
)

export const Basic = Template.bind({})
Basic.args = {
  label: 'Try customizing me!',
}

export const WithString = Template.bind({})
WithString.storyName = 'With String'
WithString.args = {
  label: 'Try customizing me!',
}

export const MultiCommand = Template.bind({})
MultiCommand.storyName = 'Multi Command'
MultiCommand.args = {
  label: 'Toggle sidebar',
  command: 'Ctrl + B',
}

export const SingleCommand = Template.bind({})
SingleCommand.storyName = 'Single Command'
SingleCommand.args = {
  label: 'Move up',
  command: 'K',
}
