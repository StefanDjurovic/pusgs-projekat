using System.Collections.Generic;
using System.Threading.Tasks;
using API.Models;
using API.Dtos;
using Microsoft.AspNetCore.Http;
using System.IO;

namespace API.Data
{
    public interface IUploadRepository
    {
        Task<bool> StoreProfileImage(HttpRequest request, int userId);
        Task<bool> StoreMultimediaAttachment(HttpRequest request, int workRequestId);
        Task<FileStream> GetProfileImage(int userId);
        Task<FileStream> DownloadAttachment(int workRequestId, int attachmnetId);
        Task<IEnumerable<string>> GetMultimediaAttachments(int workRequestId);
        Task<bool> DeleteAttachment(int workRequestId, int attachmentId);
    }
}