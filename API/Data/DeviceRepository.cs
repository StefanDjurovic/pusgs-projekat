using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Models;
using Microsoft.EntityFrameworkCore;

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

        public async Task<IEnumerable<Device>> GetDevices()
        {
            return await this.context.Devices.ToListAsync();
        }
    }
}