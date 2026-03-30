import {defineField, defineType} from 'sanity';

export const newsroomEntry = defineType({
  name: 'newsroomEntry',
  title: 'Newsroom entry',
  type: 'document',
  fields: [
    defineField({name: 'outlet', type: 'string'}),
    defineField({name: 'headline', type: 'string'}),
    defineField({name: 'publishedAt', type: 'datetime'}),
    defineField({name: 'externalLink', type: 'url'}),
    defineField({name: 'logo', type: 'image'}),
  ],
  preview: {
    select: {headline: 'headline', outlet: 'outlet'},
    prepare({headline, outlet}: {headline?: string; outlet?: string}) {
      return {title: headline ?? 'Press', subtitle: outlet};
    },
  },
});
