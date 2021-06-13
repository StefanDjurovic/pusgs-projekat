using System.Collections.Generic;
using System.Threading.Tasks;
using API.Models;

namespace API.Data
{
    public interface IAddressPriorityRepository
    {
        Task<bool> UpdatePriority(AddressPriority addressPriority);
        Task<bool> UpdateAllPriorities(IEnumerable<AddressPriority> addressPriorities);
        Task<IEnumerable<AddressPriority>> FetchAllPriorities();
    }
}