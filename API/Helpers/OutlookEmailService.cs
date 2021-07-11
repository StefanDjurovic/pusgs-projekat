using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using MimeKit.Text;

namespace API.Helpers
{
    public class OutlookEmailService : IEmailService
    {
        private string emailAddr = "SmartEnergyMService@outlook.com";
        private string password = "password$PAS";

        private string confBody = "Your registration request has been approved!";
        private string discBody = "Your registration request has been denied!";

        public void SendConfirmationEmail(string to)
        {
            SendEmail(to, "good news!", confBody);
        }

        public void SendDisclaimer(string to)
        {
            SendEmail(to, "bad news!", discBody);
        }

        public void SendEmail(string to)
        {
            // create email message
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse(emailAddr));
            email.To.Add(MailboxAddress.Parse(to));
            email.Subject = "Test Email Subject";
            email.Body = new TextPart(TextFormat.Plain) { Text = "Example Plain Text Message Body" };

            // send email
            using var smtp = new SmtpClient();
            smtp.Connect("smtp-mail.outlook.com", 587, SecureSocketOptions.StartTls);
            smtp.Authenticate(emailAddr, password);
            smtp.Send(email);
            smtp.Disconnect(true);
        }

        public void SendEmail(string to, string subject, string body)
        {
            // create email message
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse(emailAddr));
            email.To.Add(MailboxAddress.Parse(to));
            email.Subject = subject;
            email.Body = new TextPart(TextFormat.Plain) { Text = body };

            // send email
            using var smtp = new SmtpClient();
            smtp.Connect("smtp-mail.outlook.com", 587, SecureSocketOptions.StartTls);
            smtp.Authenticate(emailAddr, password);
            smtp.Send(email);
            smtp.Disconnect(true);
        }

    }
}