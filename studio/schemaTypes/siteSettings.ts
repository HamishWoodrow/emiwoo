import {defineField, defineType} from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      readOnly: true,
      initialValue: 'Site settings',
    }),
    defineField({name: 'contactEmail', type: 'string'}),
    defineField({name: 'pressEmail', type: 'string'}),
    defineField({name: 'helpCentreUrl', type: 'url'}),
    defineField({name: 'instagram', type: 'url'}),
    defineField({name: 'facebook', type: 'url'}),
    defineField({name: 'tiktok', type: 'url'}),
    defineField({name: 'pinterest', type: 'url'}),
    defineField({name: 'youtube', type: 'url'}),
  ],
  preview: {prepare: () => ({title: 'Site settings'})},
});
