using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class UnitRepository : IUnitRepository
    {
        private readonly DataContext context;
        public UnitRepository(DataContext context)
        {
            this.context = context;
        }

        public async Task<bool> AddUnitMember(Unit unit, User user)
        {
            unit.Members.Add(user);

            return (await this.context.SaveChangesAsync() > 0);
        }

        public async Task<bool> CreateUnit(Unit unit)
        {
            await this.context.Units.AddAsync(unit);

            return (await this.context.SaveChangesAsync() > 0);
        }

        public async Task DeleteUnit(int unitId)
        {
            Unit unit = this.context.Units.FirstOrDefault(unit => unit.Id == unitId);
            if (unit != default) {
                this.context.Units.Remove(unit);
            }

            await this.context.SaveChangesAsync();
        }

        public async Task<Unit> GetUnit(int unitId)
        {
            return await this.context.Units.Include(unit => unit.Members).FirstOrDefaultAsync(unit => unit.Id == unitId);
        }

        public async Task<IEnumerable<Unit>> GetUnits()
        {
            return await this.context.Units.Include(unit => unit.Members).ToListAsync();
        }

        public async Task<bool> UpdateUMs(int unitId, List<int> newUMs)
        {
            var unit = await this.GetUnit(unitId);
            if (unit == null)
            {
                return false;
            }
            unit.Members.Clear();
            newUMs.ForEach(id => unit.Members.Add(this.context.Users.FirstOrDefault(user => user.Id == id)));

            return (await this.context.SaveChangesAsync()) > 0;
        }

        public async Task<bool> UpdateUnitName(int unitId, string name)
        {
            var unit = await this.GetUnit(unitId);
            if (unit == null) 
            {
                return false;
            }

            unit.Name = name;

            return (await this.context.SaveChangesAsync()) > 0;
        }
    }
}