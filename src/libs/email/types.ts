interface SendEmailProps {
    fromName: string;
    toEmail: string;
    subject: string;
    text: string;
    html?: string;
};

export type { SendEmailProps };