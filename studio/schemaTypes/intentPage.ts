import {defineField, defineType} from 'sanity';

export const intentPage = defineType({
  name: 'intentPage',
  title: 'Intent page',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string', initialValue: 'Intent', readOnly: true}),
    defineField({name: 'openingTitle', type: 'string'}),
    defineField({name: 'openingImage', type: 'image', options: {hotspot: true}}),
    defineField({name: 'openingMuxPlaybackId', type: 'string'}),
    defineField({
      name: 'sections',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'intentSection',
          fields: [
            {name: 'pullQuote', type: 'string'},
            {name: 'body', type: 'text', rows: 6},
            {name: 'image', type: 'image'},
          ],
        },
      ],
    }),
  ],
  preview: {prepare: () => ({title: 'Intent'})},
});
