using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Dtos;
using API.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Text;
using System.Reflection;

namespace API.Data
{
    public class DeviceRepository : IDeviceRepository
    {
        private readonly DataContext context;
        private readonly INotificationRepository notification;
        public DeviceRepository(DataContext context, INotificationRepository notification)
        {
            this.context = context;
            this.notification = notification;
        }

        public async Task<Device> GetDevice(int id)
        {
            var device = await this.context.Devices.FirstOrDefaultAsync(x => x.Id.Equals(id));
            return device;
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
                var foundDevice = this.context.Devices.Where(x => x.Id.Equals(device.Id)).FirstOrDefault();
                if (foundDevice != null)
                {
                    foundDevice.Name = device.Name;
                    foundDevice.Surname = device.Surname;
                    foundDevice.StreetName = device.StreetName;
                    foundDevice.StreetNumber = device.StreetNumber;
                    foundDevice.City = device.City;
                    foundDevice.Telephone = device.Telephone;
                    foundDevice.Priority = device.Priority;
                    foundDevice.AccountType = device.AccountType;
                }
                else
                    this.context.Devices.Add(device);

            }
            return await this.context.SaveChangesAsync() > 0;
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

        public async Task<IEnumerable<Device>> GetDevices(SortingParam consumerSorting, PaginationParameters paginationParameters, int id, DeviceFilterParameters deviceFilterParameters)
        {
            // var devices = this.context.Devices.Where(d => d.StreetName.Equals(deviceFilterParameters.StreetName) &&
            //                         d.AccountType.Equals(deviceFilterParameters.AccountType == "Residential" ? DeviceType.Residential : DeviceType.Commercial));
            List<Device> devices = await this.context.Devices.Where(x => x.UserId.Equals(id)).ToListAsync();

            if (!string.IsNullOrEmpty(deviceFilterParameters.StreetName) && deviceFilterParameters.StreetName != "undefined")
                devices = devices.Where(d => d.StreetName.Equals(deviceFilterParameters.StreetName)).ToList();

            if (!string.IsNullOrEmpty(deviceFilterParameters.AccountType) && deviceFilterParameters.AccountType != "undefined")
                devices = devices.Where(d => d.AccountType.Equals(deviceFilterParameters.AccountType == "Residential" ? DeviceType.Residential : DeviceType.Commercial)).ToList();

            if (!string.IsNullOrWhiteSpace(consumerSorting.SortBy))
            {
                if (consumerSorting.SortDirection == "ascending")
                {
                    switch (consumerSorting.SortBy)
                    {
                        case "Id":
                            devices = devices.OrderBy(x => x.Id).ToList();
                            break;
                        case "Name":
                            devices = devices.OrderBy(x => x.Name).ToList();
                            break;
                        case "Surname":
                            devices = devices.OrderBy(x => x.Surname).ToList();
                            break;
                        case "StreetNumber":
                            devices = devices.OrderBy(x => x.StreetNumber).ToList();
                            break;
                        case "Telephone":
                            devices = devices.OrderBy(x => x.Telephone).ToList();
                            break;
                        case "Priority":
                            devices = devices.OrderBy(x => x.Priority).ToList();
                            break;
                    }
                }
                else
                {
                    switch (consumerSorting.SortBy)
                    {
                        case "Id":
                            devices = devices.OrderByDescending(x => x.Id).ToList();
                            break;
                        case "Name":
                            devices = devices.OrderByDescending(x => x.Name).ToList();
                            break;
                        case "Surname":
                            devices = devices.OrderByDescending(x => x.Surname).ToList();
                            break;
                        case "StreetNumber":
                            devices = devices.OrderByDescending(x => x.StreetNumber).ToList();
                            break;
                        case "Telephone":
                            devices = devices.OrderByDescending(x => x.Telephone).ToList();
                            break;
                        case "Priority":
                            devices = devices.OrderByDescending(x => x.Priority).ToList();
                            break;
                    }
                }
            }

            return devices.Skip((paginationParameters.PageNumber - 1) * paginationParameters.PageSize).Take(paginationParameters.PageSize).ToList();
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