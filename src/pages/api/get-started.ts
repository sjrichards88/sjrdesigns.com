import { Resend } from 'resend';

export async function POST({ request, locals }) {
  const { runtime } = locals;
  const { env } = runtime;

  const resend = new Resend(env.RESEND_API_KEY);
  const body = await request.json();
  const { 
    plan, 
    name, 
    email, 
    website, 
    hasWebsite, 
    goals, 
    timeline, 
    budget, 
    message 
  } = body;

  const { data, error } = await resend.emails.send({
    from: 'SJR Designs <info@email.sjrdesigns.com>',
    to: 'sjrichards88@gmail.com',
    subject: `sjrdesigns.com - New Get Started Request - ${plan}`,
    html: `
      <h2>New Get Started Request</h2>
      
      <h3>Plan Selected</h3>
      <p><strong>${plan}</strong></p>
      
      <h3>Contact Information</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      
      <h3>Website Information</h3>
      <p><strong>Has Existing Website:</strong> ${hasWebsite}</p>
      ${website ? `<p><strong>Website URL:</strong> <a href="${website}">${website}</a></p>` : ''}
      
      <h3>Project Details</h3>
      <p><strong>Goals:</strong></p>
      <ul>
        ${goals.map(goal => `<li>${goal}</li>`).join('')}
      </ul>
      <p><strong>Timeline:</strong> ${timeline}</p>
      ${budget ? `<p><strong>Budget Range:</strong> ${budget}</p>` : ''}
      
      ${message ? `
        <h3>Additional Information</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
      ` : ''}
    `,
  });

  return new Response(
    JSON.stringify({
      data,
      error
    })
  )
}