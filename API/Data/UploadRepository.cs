using System;
using System.Collections.Generic;
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
        private readonly IWorkRequestRepository workReqRepo;
        public UploadRepository(DataContext context, IWorkRequestRepository workReqRepo)
        {
            this.workReqRepo = workReqRepo;
            this.context = context;
        }
        private static Random random = new Random();
        private static string RandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
            .Select(s => s[random.Next(s.Length)]).ToArray()) + ".jpg";
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
                    var fileName = RandomString(36);
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

        public async Task<FileStream> DownloadAttachment(int workRequestId, int attachmnetId)
        {
            var workReq = await this.workReqRepo.GetRequest(workRequestId);
            if (workReq == null) 
            {
                return null;
            }

            var attach = workReq.Attachments.FirstOrDefault(attach => attach.Id == attachmnetId);
            if (attach == null) 
            {
                return null;
            }
            
            return System.IO.File.OpenRead(attach.Path); 
        }

        public async Task<bool> StoreMultimediaAttachment(HttpRequest request, int workRequestId)
        {
            try
            {
                var file = request.Form.Files[0];

                var folderName = Path.Combine("Resources", "Images");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                System.Console.WriteLine("yes we are here!!!");

                // var workRequest = await this.context.WorkRequests.FirstOrDefaultAsync(wr => wr.Id == workRequestId);
                var workRequest = await this.workReqRepo.GetRequest(workRequestId);
                if (workRequest == null)
                {
                    System.Console.WriteLine($"no way!, workReqId: {workRequestId}");
                    return false;
                }

                System.Console.WriteLine($"file length: {file.Length}, name: {file.Name}, fileName: {file.FileName}");
                if (file.Length > 0 && workRequest != null)
                {
                    //var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim().ToString();
                    var fileName = RandomString(36);
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

                    // foundUser.ProfileImage = dbPath;
                    workRequest.Attachments.Add(new Attachment(dbPath, file.FileName));

                }
            }
            catch (Exception ex)
            {
                System.Console.WriteLine(ex.ToString());
            }

            return await this.context.SaveChangesAsync() > 0;
        }

        // public async Task<IEnumerable<FileStream>> GetMultimediaAttachments(int workRequestId)
        // {
        //     var workRequest = await this.context.WorkRequests.FirstOrDefaultAsync(wr => wr.Id == workRequestId);
        //     if (workRequest == null) 
        //     {
        //         return null;
        //     }

        //     return workRequest.Attachments.Select(attach => System.IO.File.OpenRead(attach.Path));
        // }

        public async Task<IEnumerable<String>> GetMultimediaAttachments(int workRequestId)
        {
            var workRequest = await this.context.WorkRequests.FirstOrDefaultAsync(wr => wr.Id == workRequestId);
            if (workRequest == null)
            {
                return null;
            }

            return workRequest.Attachments.Select(attach => attach.Path);
        }

        public async Task<bool> DeleteAttachment(int workRequestId, int attachmentId)
        {
            var workReq = await this.workReqRepo.GetRequest(workRequestId);
            if (workReq == null)
            {
                return false;
            }

            workReq.Attachments = workReq.Attachments.Where(attach => attach.Id != attachmentId).ToList();

            return (await this.context.SaveChangesAsync()) > 0;
        }
    }
}