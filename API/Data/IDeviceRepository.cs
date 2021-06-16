using System.Collections.Generic;
using System.Threading.Tasks;
using API.Models;
using API.Dtos;

namespace API.Data
{
    public interface IDeviceRepository
    {
        Task<bool> Add(Device device);
        Task<bool> Remove(int id);
        Task<bool> Update(int id, Device device);
        Task<IEnumerable<Device>> GetAllDevices(int id, DeviceFilterParameters deviceFilterParameters);
        Task<IEnumerable<Device>> GetDevices(PaginationParameters paginationParameters, int id, DeviceFilterParameters deviceFilterParameters);
    }
}