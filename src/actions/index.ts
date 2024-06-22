import { defineAction, z } from "astro:actions";
import { Resend } from 'resend';

export const server = {
  contact: defineAction({
    input: z.object({
      name: z.string(),
      email: z.string().email(),
      message: z.string(),
    }),
    handler: async ({ name, email, message }) => {
      const resend = new Resend(import.meta.env.RESEND_API_KEY);
      
      const { data, error } = await resend.emails.send({
        from: 'SJR Designs <info@email.sjrdesigns.com>',
        to: 'sjrichards88@gmail.com',
        subject: 'sjrdesigns.com Contact Form Submission',
        html: `
          <p>Name: ${name}</p>
          <p>Email: ${email}</p>
          <p>Message: ${message}</p>
        `,
      });

      return { data, error };
    },
  }),
};