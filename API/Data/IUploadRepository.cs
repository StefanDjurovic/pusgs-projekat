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
        Task<FileStream> GetProfileImage(int userId);
    }
}