using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Dtos;
using API.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;


namespace API.Data
{
    public class DeviceRepository : IDeviceRepository
    {
        private readonly DataContext context;
        public DeviceRepository(DataContext context)
        {
            this.context = context;
        }

        public async Task<bool> DeviceExists(int id)
        {
            if (await this.context.Devices.AnyAsync(x => x.Id == id))
            {
                return true;
            }
            return false;
        }

        public async Task<bool> Add(Device device)
        {
            if (device != null)
            {
                await this.context.Devices.AddAsync(device);
                await this.context.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<bool> Remove(int id)
        {
            Device foundDevice = null;
            foundDevice = await this.context.Devices.FirstOrDefaultAsync(x => x.Id == id);
            if (foundDevice != null)
            {
                this.context.Devices.Remove(foundDevice);
                await this.context.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public Task<bool> Update(int id, Device device)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Device>> GetDevices(PaginationParameters paginationParameters, int id, DeviceFilterParameters deviceFilterParameters)
        {
            // var devices = this.context.Devices.Where(d => d.StreetName.Equals(deviceFilterParameters.StreetName) &&
            //                         d.AccountType.Equals(deviceFilterParameters.AccountType == "Residential" ? DeviceType.Residential : DeviceType.Commercial));
            List<Device> devices = await this.context.Devices.Where(x => x.UserId.Equals(id)).ToListAsync();

            if (!string.IsNullOrEmpty(deviceFilterParameters.StreetName) && deviceFilterParameters.StreetName != "undefined")
                devices = devices.Where(d => d.StreetName.Equals(deviceFilterParameters.StreetName)).ToList();

            if (!string.IsNullOrEmpty(deviceFilterParameters.AccountType) && deviceFilterParameters.AccountType != "undefined")
                devices = devices.Where(d => d.AccountType.Equals(deviceFilterParameters.AccountType == "Residential" ? DeviceType.Residential : DeviceType.Commercial)).ToList();

            return devices.OrderBy(x => x.Name).Skip((paginationParameters.PageNumber - 1) * paginationParameters.PageSize).Take(paginationParameters.PageSize).ToList();
        }

        public async Task<IEnumerable<Device>> GetAllDevices(int id, DeviceFilterParameters deviceFilterParameters)
        {
            // var devices = this.context.Devices.Where(d => d.StreetName.Equals(deviceFilterParameters.StreetName) &&
            //                     d.AccountType.Equals(deviceFilterParameters.AccountType == "Residential" ? DeviceType.Residential : DeviceType.Commercial));

            // return await devices.Where(x => x.Id.Equals(id)).ToListAsync();

            List<Device> devices = await this.context.Devices.Where(x => x.UserId.Equals(id)).ToListAsync();

            if (!string.IsNullOrEmpty(deviceFilterParameters.StreetName) && deviceFilterParameters.StreetName != "undefined")
                devices = devices.Where(d => d.StreetName.Equals(deviceFilterParameters.StreetName)).ToList();

            if (!string.IsNullOrEmpty(deviceFilterParameters.AccountType) && deviceFilterParameters.AccountType != "undefined")
                devices = devices.Where(d => d.AccountType.Equals(deviceFilterParameters.AccountType == "Residential" ? DeviceType.Residential : DeviceType.Commercial)).ToList();

            return devices;
        }

    }
}