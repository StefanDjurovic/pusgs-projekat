using System.Collections.Generic;
using System.Threading.Tasks;
using API.Models;
using API.Dtos;

namespace API.Data
{
    public interface ICallRepository
    {
        Task<bool> CreateNewCall(Call newCall);
    }
}