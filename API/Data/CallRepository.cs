using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Dtos;
using API.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;


namespace API.Data
{
    public class CallRepository : ICallRepository
    {
        private readonly DataContext context;
        public CallRepository(DataContext context)
        {
            this.context = context;
        }

        public async Task<bool> CreateNewCall(Call newCall)
        {
            if (newCall != null)
                this.context.Calls.Add(newCall);

            return await this.context.SaveChangesAsync() > 0;
        }
    }
}