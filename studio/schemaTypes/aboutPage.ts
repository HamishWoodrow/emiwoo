import {defineField, defineType} from 'sanity';

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About page',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string', readOnly: true, initialValue: 'About'}),
    defineField({name: 'founderName', type: 'string'}),
    defineField({name: 'founderImage', type: 'image', options: {hotspot: true}}),
    defineField({name: 'brandStory', type: 'array', of: [{type: 'block'}]}),
    defineField({
      name: 'values',
      type: 'array',
      of: [{type: 'string'}],
      title: 'Brand values (one per line)',
    }),
  ],
  preview: {prepare: () => ({title: 'About'})},
});
