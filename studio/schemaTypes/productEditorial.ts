import {defineField, defineType} from 'sanity';

export const productEditorial = defineType({
  name: 'productEditorial',
  title: 'Product editorial (PDP)',
  type: 'document',
  fields: [
    defineField({
      name: 'shopifyHandle',
      type: 'string',
      title: 'Shopify product handle',
      validation: (r) => r.required(),
    }),
    defineField({name: 'storyImage', type: 'image', options: {hotspot: true}}),
    defineField({name: 'storyHeadline', type: 'string'}),
    defineField({name: 'storyBody', type: 'array', of: [{type: 'block'}]}),
    defineField({
      name: 'materialDetails',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'stylingImages',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'stylingShot',
          fields: [
            {name: 'image', type: 'image', options: {hotspot: true}},
            {name: 'caption', type: 'string'},
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {title: 'shopifyHandle'},
    prepare({title}: {title?: string}) {
      return {title: title ? `PDP — ${title}` : 'Product editorial'};
    },
  },
});
