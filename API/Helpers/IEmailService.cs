namespace API.Helpers
{
    public interface IEmailService
    {
         void SendEmail(string to);

         void SendConfirmationEmail(string to);
         void SendDisclaimer(string to);
    }
}