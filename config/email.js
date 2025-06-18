const emailConfig = {
  // Custom Domain SMTP configuration
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: true, // SSL is required for port 465
  requireTLS: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  // Try different authentication methods
  authMethod: 'LOGIN',
  sender: 'Infinity Tanks <kznsales@infinitytanks.co.za>',
  templates: {
    question: {
      subject: 'New Question from Infinity Tanks Website',
      text: (data) => `
        New question received:
        
        Name: ${data.name}
        Question: ${data.question}
        
        Received from: ${data.ip}
        Time: ${new Date().toLocaleString()}
      `
    },
    contact: {
      subject: 'New Contact Form Submission - Infinity Tanks',
      text: (data) => `
        New contact form submission:
        
        Name: ${data.name}
        Email: ${data.email}
        Message: ${data.message}
        
        Received from: ${data.ip}
        Time: ${new Date().toLocaleString()}
      `
    },
    quote: {
      subject: 'New Quote Request - Infinity Tanks',
      text: (data) => `
        New quote request received:
        
        Name: ${data.name}
        Email: ${data.email}
        Phone: ${data.phone}
        Requirements: ${data.requirements}
        
        Received from: ${data.ip}
        Time: ${new Date().toLocaleString()}
      `
    },
    confirmation: {
      question: {
        subject: 'Thank you for your question - Infinity Tanks',
        text: (data) => `
          Thank you ${data.name} for your question!
          
          We have received your message and will get back to you as soon as possible.
          
          Best regards,
          Infinity Tanks Team
        `
      },
      contact: {
        subject: 'Thank you for contacting Infinity Tanks',
        text: (data) => `
          Thank you ${data.name} for contacting us!
          
          We have received your message and will get back to you as soon as possible.
          
          Best regards,
          Infinity Tanks Team
        `
      },
      quote: {
        subject: 'Thank you for your quote request - Infinity Tanks',
        text: (data) => `
          Thank you ${data.name} for your quote request!
          
          We have received your details and will contact you shortly to discuss your requirements.
          
          Best regards,
          Infinity Tanks Team
        `
      }
    }
  }
};

module.exports = emailConfig;
