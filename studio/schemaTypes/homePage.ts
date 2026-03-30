import {defineField, defineType} from 'sanity';

export const homePage = defineType({
  name: 'homePage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      readOnly: true,
      initialValue: 'Homepage',
    }),
    defineField({name: 'heroHeadline', type: 'string'}),
    defineField({name: 'heroTagline', type: 'string'}),
    defineField({name: 'heroCtaLabel', type: 'string'}),
    defineField({
      name: 'heroMuxPlaybackId',
      type: 'string',
      title: 'Hero Mux playback ID',
    }),
    defineField({name: 'brandStatement', type: 'text', rows: 5}),
    defineField({
      name: 'storyBeats',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'storyBeat',
          fields: [
            {name: 'headline', type: 'string', title: 'Headline'},
            {name: 'body', type: 'text', rows: 4},
            {
              name: 'textAlignment',
              type: 'string',
              options: {list: ['left', 'right', 'center']},
            },
            {
              name: 'overlay',
              type: 'number',
              title: 'Overlay opacity (0–1)',
              validation: (r: any) => r.min(0).max(1),
              initialValue: 0.5,
            },
            {name: 'image', type: 'image', options: {hotspot: true}},
            {
              name: 'muxPlaybackId',
              type: 'string',
              title: 'Mux playback ID (optional)',
            },
          ],
          preview: {
            select: {title: 'headline'},
            prepare({title}: {title?: string}) {
              return {title: title || 'Story beat'};
            },
          },
        },
      ],
    }),
    defineField({name: 'productTeaserImage', type: 'image'}),
    defineField({name: 'productTeaserTitle', type: 'string'}),
    defineField({name: 'productTeaserSubtitle', type: 'string'}),
  ],
  preview: {prepare: () => ({title: 'Homepage'})},
});
