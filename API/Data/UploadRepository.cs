using System;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class UploadRepository : IUploadRepository
    {
        private readonly DataContext context;
        public UploadRepository(DataContext context)
        {
            this.context = context;
        }
        private static Random random = new Random();
        private static string RandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
            .Select(s => s[random.Next(s.Length)]).ToArray());
        }

        public async Task<bool> StoreProfileImage(HttpRequest request, int userId)
        {
            try
            {
                var file = request.Form.Files[0];
                var folderName = Path.Combine("Resources", "Images");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

                var foundUser = this.context.Users.Where(x => x.Id.Equals(userId)).FirstOrDefault();

                if (file.Length > 0 && foundUser != null)
                {
                    //var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim().ToString();
                    var fileName = RandomString(36) + ".jpg";
                    var fullPath = Path.Combine(pathToSave, fileName);

                    while (System.IO.File.Exists(fullPath))
                    {
                        fullPath = Path.Combine(pathToSave, RandomString(36));
                    }

                    var dbPath = Path.Combine(folderName, fileName);
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }

                    foundUser.ProfileImage = dbPath;

                }
            }
            catch (Exception ex)
            {
                System.Console.WriteLine(ex.ToString());
            }

            return await this.context.SaveChangesAsync() > 0;
        }

        public async Task<FileStream> GetProfileImage(int userId)
        {
            var foundUser = await this.context.Users.Where(x => x.Id.Equals(userId)).ToListAsync();

            if (foundUser != null)
            {
                var profileImagePath = foundUser.FirstOrDefault().ProfileImage;
                var profileImage = System.IO.File.OpenRead(profileImagePath);
                return profileImage;
            }
            return null;
        }


        public async Task<bool> StoreSwitchDocument(HttpRequest request, int switchPlanId)
        {
            bool returnPath = false;
            try
            {
                var file = request.Form.Files[0];
                var folderName = Path.Combine("Resources", "Documents");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

                if (file.Length > 0)
                {
                    //var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim().ToString();

                    string strExtention = file.FileName.Substring(file.FileName.LastIndexOf('.') + 1);
                    string fileName = "";
                    if (!string.IsNullOrEmpty(strExtention))
                        fileName = RandomString(36) + '.' + strExtention;
                    else
                        fileName = RandomString(36);

                    var fullPath = Path.Combine(pathToSave, fileName);

                    while (System.IO.File.Exists(fullPath))
                    {
                        fullPath = Path.Combine(pathToSave, RandomString(36));
                    }

                    var dbPath = Path.Combine(folderName, fileName);
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }

                    MultimediaAttachments attachment = new MultimediaAttachments();
                    attachment.SwitchPlanId = switchPlanId;
                    attachment.File = dbPath;

                    this.context.MultimediaAttachments.Add(attachment);
                    return await this.context.SaveChangesAsync() > 0;
                }
            }
            catch (Exception ex)
            {
                System.Console.WriteLine(ex.ToString());
            }

            return returnPath;
        }
    }
}