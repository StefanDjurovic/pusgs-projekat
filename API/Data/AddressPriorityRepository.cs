using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Controllers;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class AddressPriorityRepository : IAddressPriorityRepository
    {
        private readonly DataContext context;

        public AddressPriorityRepository(DataContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<AddressPriority>> FetchAllPriorities()
        {
            return await this.context.AddressPriorities.ToListAsync();
        }
        public async Task<bool> UpdateAllPriorities(IEnumerable<AddressPriority> addressPriorities)
        {
            foreach (var addressPriority in addressPriorities)
            {
                var foundAddress = await this.context.AddressPriorities.FirstOrDefaultAsync(x => x.Id == addressPriority.Id);
                if (foundAddress != null)
                {
                    foundAddress.Priority = addressPriority.Priority;
                }
            }
            return await this.context.SaveChangesAsync() > 0;
        }
        public Task<bool> UpdatePriority(AddressPriority addressPriority)
        {
            throw new NotImplementedException();
        }
    }
}