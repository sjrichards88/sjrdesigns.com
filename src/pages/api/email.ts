// import { Resend } from 'resend';

export async function POST({ request }) {
  // const resend = new Resend(import.meta.env.RESEND_API_KEY);
  const body = await request.json();
  const { name, email, message } = body;

  // const { data, error } = await resend.emails.send({
  //   from: 'SJR Designs <info@email.sjrdesigns.com>',
  //   to: 'sjrichards88@gmail.com',
  //   subject: 'sjrdesigns.com Contact Form Submission',
  //   html: `
  //     <p>Name: ${name}</p>
  //     <p>Email: ${email}</p>
  //     <p>Message: ${message}</p>
  //   `,
  // });

  return new Response(
    JSON.stringify({
        name,
        email,
        message,
      // error
    })
  )
}