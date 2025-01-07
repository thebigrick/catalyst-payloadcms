import type { Field } from 'payload';

const BoxBlock: Field = {
  type: 'collapsible',
  admin: {
    initCollapsed: true,
  },
  label: 'Wrapper Box',
  fields: [
    {
      type: 'group',
      name: 'box',
      label: '',
      interfaceName: 'BoxBlock',
      fields: [
        {
          type: 'group',
          name: 'margin',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'top',
                  label: 'Top (px)',
                  type: 'number',
                  admin: {
                    width: '25%',
                  },
                },
                {
                  name: 'right',
                  label: 'Right (px)',
                  type: 'number',
                  admin: {
                    width: '25%',
                  },
                },
                {
                  name: 'bottom',
                  label: 'Bottom (px)',
                  type: 'number',
                  admin: {
                    width: '25%',
                  },
                },
                {
                  name: 'left',
                  label: 'Left (px)',
                  type: 'number',
                  admin: {
                    width: '25%',
                  },
                },
              ],
            },
          ],
        },
        {
          type: 'group',
          name: 'padding',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'top',
                  label: 'Top (px)',
                  type: 'number',
                  admin: {
                    width: '25%',
                  },
                },
                {
                  name: 'right',
                  label: 'Right (px)',
                  type: 'number',
                  admin: {
                    width: '25%',
                  },
                },
                {
                  name: 'bottom',
                  label: 'Bottom (px)',
                  type: 'number',
                  admin: {
                    width: '25%',
                  },
                },
                {
                  name: 'left',
                  label: 'Left (px)',
                  type: 'number',
                  admin: {
                    width: '25%',
                  },
                },
              ],
            },
          ],
        },
        {
          type: 'text',
          name: 'class',
          label: 'Custom Class',
        },
        {
          type: 'text',
          name: 'style',
          label: 'Custom CSS',
        },
      ],
    },
  ],
};

export default BoxBlock;
