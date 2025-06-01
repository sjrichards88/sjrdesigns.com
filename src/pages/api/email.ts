import { Resend } from 'resend';

export async function POST({ request, locals }) {
  const { runtime } = locals;
  const { env } = runtime;

  const resend = new Resend(env.RESEND_API_KEY);
  const body = await request.json();
  const { name, email, message, budget, monthlyPayments } = body;

  const { data, error } = await resend.emails.send({
    from: 'SJR Designs <info@email.sjrdesigns.com>',
    to: 'sjrichards88@gmail.com',
    subject: 'sjrdesigns.com Contact Form Submission',
    html: `
      <h3>New Contact Form Submission</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Budget:</strong> ${budget}</p>
      <p><strong>Monthly Payments Preferred:</strong> ${monthlyPayments ? 'Yes' : 'No'}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  });

  return new Response(
    JSON.stringify({
      data,
      error
    })
  )
}