namespace API.Models
{
    public class Attachment
    {
        public int Id { get; set; }
        public string Path { get; set; }
        public string FileName { get; set; }
        public Attachment()
        {
            
        }

        public Attachment(string path, string fileName)
        {
            this.Path = path;
            this.FileName = fileName;
        }
    }
}