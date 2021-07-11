using System.Collections.Generic;
using System.Threading.Tasks;
using API.Models;

namespace API.Data
{
    public interface IUnitRepository
    {
         Task<bool> CreateUnit(Unit unit);
         Task<Unit> GetUnit(int unitId);
         Task<IEnumerable<Unit>> GetUnits();
         Task<bool> AddUnitMember(Unit unit, User user);
         Task DeleteUnit(int unitId); 
         Task<bool> UpdateUMs(int unitId, List<int> newUMs);
        Task<bool> UpdateUnitName(int unitId, string name);    
    }
}